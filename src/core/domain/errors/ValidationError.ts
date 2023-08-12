import { DataValidatorError } from '@core/domain/DataValidatorError';
import { BaseError } from '@core/domain/errors/BaseError';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';

export class ValidationError extends BaseError {

  private errors: DataValidatorError;

  public constructor (errors: DataValidatorError, message = 'Invalid Data.', statusCode = HTTP_STATUS_CODE.BAD_REQUEST, operational = true) {
    super(message, statusCode, operational);
    this.errors = errors;
  }

  public getErrors (): DataValidatorError {
    return this.errors;
  }

}
