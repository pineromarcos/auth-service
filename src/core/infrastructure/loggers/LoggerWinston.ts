import { Config } from '@src/Config';
import { Logger } from '@core/domain/Logger';
import { inject, injectable } from 'inversify';
import { createLogger, format, Logger as WinstonLogger, transports } from 'winston';
import { Format } from 'logform';
import os from 'os';

@injectable()
export class LoggerWinston implements Logger {

  private logger: WinstonLogger;

  public constructor (@inject(Config) config: Config) {
    this.logger = createLogger({
      level: config.getLogLevel(),
      format: this.getMachineFormat(),
      defaultMeta: {
        service_name: config.getServiceName(),
        service_version: config.getServiceVersion(),
        hostname: os.hostname()
      },
      transports: [
        new transports.Console(),
      ],
    });
  }

  public info (message: string): void {
    this.logger.info(message);
  }

  public debug (message: string): void {
    this.logger.debug(message);
  }

  public warning (message: string): void {
    this.logger.warn(message);
  }

  public error (error: Error): void {
    this.logger.error({
      message: error.message,
      name: error.name,
      stack: error.stack
    });
  }

  private getMachineFormat (): Format {
    return format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
      format.prettyPrint(),
      format.colorize({ all: true, colors: { debug: 'cyan' } }),
    );
  }

}
