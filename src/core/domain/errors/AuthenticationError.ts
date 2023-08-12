import { BaseError } from '@core/domain/errors/BaseError';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';

export class AuthenticationError extends BaseError {

  public constructor (message = 'Unauthorized', statusCode = HTTP_STATUS_CODE.UNAUTHORIZED, operational = false) {
    super(message, statusCode, operational);
  }

}
