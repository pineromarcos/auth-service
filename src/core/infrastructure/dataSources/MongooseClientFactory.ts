import mongoose, { Mongoose } from 'mongoose';
import { inject, injectable } from 'inversify';
import { LOGGER, Logger } from '@core/domain/Logger';
import { Config } from '@src/Config';

@injectable()
export class MongooseClientFactory {

  private client: Mongoose | null;
  private config: Config;
  private logger: Logger;

  public constructor (@inject(LOGGER) logger: Logger, @inject(Config) config: Config) {
    this.config = config;
    this.client = null;
    this.logger = logger;
  }

  public async getClient (): Promise<Mongoose> {
    if (!this.client) {
      const connectionString = `${this.config.getDatabaseProtocol()}://${this.config.getDatabaseUser()}:${this.config.getDatabasePassword()}@${this.config.getDatabaseHost()}:${this.config.getDatabasePort()}/${this.config.getDatabaseName()}?${this.config.getDatabaseParams()}`;
      this.logger.debug(`Mongoose connecting ${connectionString}`);
      this.client = await mongoose.connect(connectionString);
      this.logger.info(`Mongoose connected to host ${this.config.getDatabaseHost()} and database ${this.config.getDatabaseName()}`);
    }

    return this.client;
  }

  public async disconnect (): Promise<void> {
    if (!this.client) {
      return;
    }

    await this.client.disconnect();
  }

}

export const MongooseClient = Symbol('MONGOOSE_CLIENT');
