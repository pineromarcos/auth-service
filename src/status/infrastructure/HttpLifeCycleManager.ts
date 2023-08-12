import { LifeCycleManager } from '@core/domain/LifeCycleManager';
import { LOGGER, Logger } from '@core/domain/Logger';
import { BaseError } from '@core/domain/errors/BaseError';
import { ServiceUnavailableError } from '@core/domain/errors/ServiceUnavailableError';
import { MongooseClientFactory } from '@core/infrastructure/dataSources/MongooseClientFactory';
import { inject, injectable } from 'inversify';

@injectable()
export class HttpLifeCycleManager implements LifeCycleManager {

  private logger: Logger;
  private mongooseClientFactory: MongooseClientFactory;

  public constructor (@inject(LOGGER) logger: Logger, @inject(MongooseClientFactory) mongooseClientFactory: MongooseClientFactory) {
    this.logger = logger;
    this.mongooseClientFactory = mongooseClientFactory;
  }

  public async isHealthy (): Promise<boolean> {
    try {
      await this.mongooseClientFactory.getClient();
    } catch (error) {
      this.logger.error(error as BaseError);
      throw new ServiceUnavailableError();
    }

    return true;
  }

  public async terminate (): Promise<void> {
    await this.mongooseClientFactory.disconnect();
    this.logger.info('HttpExpressLifeCycleManager Terminated.');
  }

}
