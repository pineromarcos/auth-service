import { Response } from 'express';

export interface ExpressResponse<T> extends Response {
   send: (data: T) => this;
}
