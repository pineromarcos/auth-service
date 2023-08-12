import { inject, injectable } from 'inversify';
import { NextFunction, Response } from 'express';
import { HttpExpressHandler } from '@core/infrastructure/httpServers/HttpExpressHandler';
import { AuthorizationError } from '@core/domain/errors/AuthorizationError';
import { ExtendedRequest } from '@core/infrastructure/httpServers/ExpressRequest';
import { TOKEN_VERIFIER, TokenVerifier } from '@core/domain/TokenVerifier';

@injectable()
export class AuthorizationExpressHandler extends HttpExpressHandler {

  private tokenVerifier: TokenVerifier;

  public constructor (@inject(TOKEN_VERIFIER) tokenVerifier: TokenVerifier) {
    super();
    this.tokenVerifier = tokenVerifier;
  }

  public async run (req: ExtendedRequest, _res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization;

    if (!token) {
      throw new AuthorizationError('Authorization header not found');
    }

    const splittedToken = token.split(' ');

    if (splittedToken.length !== 2) {
      throw new AuthorizationError('Token not found');
    }

    const payload = await this.tokenVerifier.verify(splittedToken[1]);

    req.user = payload;

    next();
  }

}
