import { BaseError } from '@core/domain/errors/BaseError';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';

export class AuthorizationError extends BaseError {

  public constructor (message = 'Unauthorized', statusCode = HTTP_STATUS_CODE.FORBIDDEN, operational = false) {
    super(message, statusCode, operational);
  }

}
