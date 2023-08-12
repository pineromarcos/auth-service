import { Router, RequestHandler, Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import glob from 'glob';
import path from 'path';
import { LOGGER, Logger } from '@core/domain/Logger';
import { HTTP_METHOD } from '@core/types/HttpMethods';
import { HttpExpressHandler } from '@core/infrastructure/httpServers/HttpExpressHandler';

@injectable()
export class HttpExpressRouter {

  private logger: Logger;
  private router: Router;

  public constructor (@inject(LOGGER) logger: Logger) {
    this.logger = logger;
    this.router = Router();
  }

  public async getRoutes (pattern: string): Promise<Router> {
    const routesPath = this.getRouteFiles(pattern);
    for (const routePath of routesPath) {
      await this.importRoute(routePath);
    }

    return this.router;
  }

  public async add (method: HTTP_METHOD, path: string, ...handlers: Array<HttpExpressHandler>): Promise<void> {
    const handlersNames: Array<string> = handlers.map((handler: HttpExpressHandler): string=> {
      return handler.getName();
    });

    this.logger.info(`Adding route: ${method.toUpperCase()} ${path} handlers ${handlersNames.toString()}`);

    const handlersRunner: Array<RequestHandler> = handlers.map((handler: HttpExpressHandler): RequestHandler => {
      return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const debugData = {
            handler: handler.getName(),
            method: req.method,
            path: req.path,
            body: req.body,
            query: req.query,
            params: req.params,
          };
          this.logger.debug(JSON.stringify(debugData));
          await handler.run(req, res, next);
        } catch (error) {
          next(error);
        }
      };
    });

    this.router[method](path, ...handlersRunner);
  }

  private getRouteFiles (pattern: string): Array<string> {
    const files = glob.sync(pattern);
    const relativePaths = [];

    for (const file of files) {
      relativePaths.push(path.relative(__dirname, file));
    }

    return relativePaths;
  }

  private async importRoute (routePath: string): Promise<void> {
    const { register } = await import(routePath);
    await register(this);
  }

}
