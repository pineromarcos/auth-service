import { UseCase } from '@core/application/UseCase';
import { LIFE_CYCLE_MANAGER, LifeCycleManager } from '@core/domain/LifeCycleManager';
import { Status } from '@core/domain/Status';
import { Config } from '@src/Config';
import { inject, injectable } from 'inversify';

@injectable()
export class GetStatus implements UseCase<void, Status> {

  private config: Config;
  private lifeCycleManager: LifeCycleManager;

  public constructor (@inject(Config) config: Config, @inject(LIFE_CYCLE_MANAGER) lifeCycleManager: LifeCycleManager) {
    this.config = config;
    this.lifeCycleManager = lifeCycleManager;
  }

  public async run (): Promise<Status> {
    await this.lifeCycleManager.isHealthy();

    return {
      version: this.config.getServiceVersion()
    };
  }

}
