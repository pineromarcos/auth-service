import { UserTokenPayload } from '@core/domain/UserTokenPayload';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export interface ExtendedRequest extends Request {
  user?: UserTokenPayload;
}

export interface ExpressRequestBody<T> extends ExtendedRequest {
  body: T
}

export interface ExpressRequestParams<T extends ParamsDictionary> extends ExtendedRequest {
  params: T
}

export interface ExpressRequestParamsBody<P extends ParamsDictionary, B> extends ExtendedRequest {
  params: P,
  body: B
}
