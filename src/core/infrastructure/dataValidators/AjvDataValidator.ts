import { DataValidator } from '@core/domain/DataValidator';
import { DataValidatorError } from '@core/domain/DataValidatorError';
import { LOGGER, Logger } from '@core/domain/Logger';
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { inject, injectable } from 'inversify';

@injectable()
export abstract class AjvDataValidator implements DataValidator {

  protected validate: ValidateFunction;
  protected logger: Logger;

  public constructor (@inject(LOGGER) logger: Logger) {
    const validator = new Ajv({ allErrors: true });
    addFormats(validator);
    this.addCustomKeywords(validator);
    this.validate = validator.compile(this.getSchema());
    this.logger = logger;
  }

  public async isValid<T> (data: T): Promise<boolean> {
    return this.validate(data);
  }

  public async getErrors (): Promise<DataValidatorError> {
    const errors = this.validate.errors;

    if (!errors) {
      return {};
    }

    const errorsFormatted: DataValidatorError = {};

    for (const error of errors) {
      const property = error.instancePath.slice(1);
      this.setNestedProperty(errorsFormatted, property, error.message);
    }

    return errorsFormatted;
  }

  protected abstract getSchema(): object;

  private addCustomKeywords (validator: Ajv): void {
    validator.addKeyword({
      keyword: 'allowEmpty',
      type: 'string',
      error: { message: 'Should not be empty' },
      validate: (allowEmpty: boolean, data: string) => {
        if (allowEmpty === true) {
          return true;
        }

        return data.trim() !== '';
      }
    });
  }

  private setNestedProperty (obj: DataValidatorError, path: string, value: string = ''): void {
    const keys = path.split('/');
    let current: DataValidatorError | string = obj;

    while (keys.length > 1) {
      const key = keys.shift() as string;
      if (typeof current[key] === 'string') {
        current[key] = {
          '': current[key]
        };
      }
      current[key] = typeof current[key] === 'object' ? current[key] : {};
      current = current[key] as DataValidatorError;
    }

    current[keys[0]] = value;
  }

}
