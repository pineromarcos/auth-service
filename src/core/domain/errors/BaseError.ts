import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';

export abstract class BaseError extends Error {

  public name: string;
  protected statusCode: HTTP_STATUS_CODE;
  protected operational: boolean;

  public constructor (message = 'Here Message', statusCode: HTTP_STATUS_CODE, operational: boolean) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.operational = operational;
  }

  public getStatusCode (): HTTP_STATUS_CODE {
    return this.statusCode;
  }

  public getName (): string {
    return this.name;
  }

  public isOperational (): boolean {
    return this.operational;
  }

  public getMessage (): string {
    return this.message;
  }

}
