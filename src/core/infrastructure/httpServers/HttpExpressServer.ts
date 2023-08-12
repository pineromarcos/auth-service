import { Server } from 'http';
import { Logger, LOGGER } from '@core/domain/Logger';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compress from 'compression';
import { inject, injectable } from 'inversify';
import { HttpServer } from '@core/domain/HttpServer';
import { BaseError } from '@core/domain/errors/BaseError';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';
import { LifeCycleManager, LIFE_CYCLE_MANAGER } from '@core/domain/LifeCycleManager';
import { NotFoundError } from '@core/domain/errors/NotFoundError';
import { GracefulShutdownManager } from '@moebius/http-graceful-shutdown';
import { ValidationError } from '@core/domain/errors/ValidationError';
import { Config } from '@src/Config';
import { HttpExpressRouter } from '@core/infrastructure/httpServers/HttpExpressRouter';

@injectable()
export class HttpExpressServer implements HttpServer {

  private logger: Logger;
  private config: Config;
  private app: Application;
  private server?: Server;
  private router: HttpExpressRouter;
  private lifeCycleManager: LifeCycleManager;

  public constructor (@inject(Config) config: Config, @inject(LOGGER) logger: Logger, @inject(HttpExpressRouter) router: HttpExpressRouter, @inject(LIFE_CYCLE_MANAGER) lifeCycleManager: LifeCycleManager) {
    this.logger = logger;
    this.config = config;
    this.router = router;
    this.lifeCycleManager = lifeCycleManager;
    this.app = express();
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(bodyParser.json({ limit: config.getBodySizeLimit() }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(compress());
  }

  public async registerRoutes (pattern: string): Promise<void> {
    const router = await this.router.getRoutes(pattern);
    this.app.use(router);

    this.app.use((req: Request): void => {
      throw new NotFoundError(`${req.method.toUpperCase()} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    });

    this.app.use(async (error: BaseError, req: Request, res: Response, next: NextFunction): Promise<void> => {
      await this.handleError(error, req, res, next);
    });
  }

  public async start (): Promise<void> {
    this.server = this.app.listen(this.config.getHttpPort(), () => {
      this.logger.info(`App running on internal port ${this.config.getHttpPort()}`);
    });

    const shutdownManager = new GracefulShutdownManager(this.server);

    process.on('SIGTERM', () => {
      this.logger.info('The service is about to shut down. Waiting connections to finish first.');

      shutdownManager.terminate(() => {
        this.lifeCycleManager.terminate();
      });
    });
  }

  public async stop (): Promise<void> {
    this.server?.close();
  }

  private async handleError (error: BaseError, req: Request, res: Response, _next: NextFunction): Promise<void> {
    this.logger.error(error);

    if (error instanceof ValidationError) {
      res.status(error.getStatusCode()).send(error.getErrors());

      return;
    }

    if (error instanceof BaseError) {
      res.status(error.getStatusCode()).send({ error: `${error.getMessage()}` });

      return;
    }

    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: 'Internal server error.' });
  }

}
