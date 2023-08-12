import 'reflect-metadata';
import path from 'path';
import { HTTP_SERVER, HttpServer } from '@core/domain/HttpServer';
import { LOGGER, Logger } from '@core/domain/Logger';
import { dependencyContainer } from '@src/inversify.config';

const httpServer = dependencyContainer.get<HttpServer>(HTTP_SERVER);
const logger = dependencyContainer.get<Logger>(LOGGER);

process.on('uncaughtException', error => {
  logger.error(error);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  logger.error(error as Error);
  process.exit(1);
});

const start = async (): Promise<void> => {
  const extension = path.extname(__filename);
  await httpServer.registerRoutes(`**/express.routes${extension}`);
  httpServer.start();
};

start();
