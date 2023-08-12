import { DataValidatorError } from '@core/domain/DataValidatorError';

export interface DataValidator {
  getErrors (): Promise<DataValidatorError>;
  isValid<T> (data: T): Promise<boolean>;
}

export const DATA_VALIDATOR = Symbol.for('DataValidator');
