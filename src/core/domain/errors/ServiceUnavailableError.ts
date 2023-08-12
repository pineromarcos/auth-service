import { BaseError } from '@core/domain/errors/BaseError';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';

export class ServiceUnavailableError extends BaseError {

  public constructor (message = 'Service Unavailable', statusCode = HTTP_STATUS_CODE.SERVICE_UNAVAILABLE, operational = false) {
    super(message, statusCode, operational);
  }

}
