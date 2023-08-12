import dotenv from 'dotenv';
dotenv.config();
import { LOG_LEVEL } from '@core/types/LogLevels';
import { injectable } from 'inversify';

@injectable()
export class Config {

  public getHttpPort (): number {
    return parseInt(process.env.HTTP_PORT as string);
  }

  public getServiceName (): string {
    return process.env.SERVICE_NAME as string;
  }

  public getServiceVersion (): string {
    return process.env.SERVICE_VERSION as string;
  }

  public getLogLevel (): LOG_LEVEL {
    return process.env.LOG_LEVEL as LOG_LEVEL;
  }

  public getBodySizeLimit (): string {
    return process.env.BODY_SIZE_LIMIT as string;
  }

  public getDatabaseProtocol (): string {
    return process.env.DATABASE_PROTOCOL as string;
  }

  public getDatabaseHost (): string {
    return process.env.DATABASE_HOST as string;
  }

  public getDatabasePort (): string {
    return process.env.DATABASE_PORT as string;
  }

  public getDatabaseUser (): string {
    return process.env.DATABASE_USER as string;
  }

  public getDatabasePassword (): string {
    return process.env.DATABASE_PASSWORD as string;
  }

  public getDatabaseName (): string {
    return process.env.DATABASE_NAME as string;
  }

  public getDatabaseParams (): string {
    return process.env.DATABASE_PARAMS as string;
  }

  public getTokenSecretKey (): string {
    const base64key = process.env.TOKEN_SECRET_KEY as string;

    return Buffer.from(base64key, 'base64').toString('utf-8');
  }

}
