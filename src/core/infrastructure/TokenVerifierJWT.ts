import { inject, injectable } from 'inversify';
import { UserTokenPayload } from '@core/domain/UserTokenPayload';
import { Config } from '@src/Config';
import jwt from 'jsonwebtoken';
import { AuthorizationError } from '@core/domain/errors/AuthorizationError';
import { LOGGER, Logger } from '@core/domain/Logger';
import { TokenVerifier } from '@core/domain/TokenVerifier';

@injectable()
export class TokenVerifierJWT implements TokenVerifier {

  private config: Config;
  private logger: Logger;

  public constructor (@inject(Config) config: Config, @inject(LOGGER) logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  public async verify (token: string): Promise<UserTokenPayload> {
    try {
      const payload = await jwt.verify(token, this.config.getTokenSecretKey());

      return payload as UserTokenPayload;
    } catch (error) {
      const errorTyped = error as Error;
      throw new AuthorizationError(errorTyped.message);
    }
  }

}