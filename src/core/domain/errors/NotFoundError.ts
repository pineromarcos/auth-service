import { BaseError } from '@core/domain/errors/BaseError';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';

export class NotFoundError extends BaseError {

  public constructor (message = '', statusCode = HTTP_STATUS_CODE.NOT_FOUND, operational = true) {
    super(`Not Found ${message}`, statusCode, operational);
  }

}
