export interface LifeCycleManager {
  isHealthy (): Promise<boolean>;
  terminate (): Promise<void>;
}

export const LIFE_CYCLE_MANAGER = Symbol.for('LifeCycleManager');
