import { inject, injectable } from 'inversify';
import { TokenGenerator } from '@src/auth/domain/TokenGenerator';
import { UserTokenPayload } from '@core/domain/UserTokenPayload';
import { Config } from '@src/Config';
import jwt, { SignOptions, Algorithm } from 'jsonwebtoken';
import { LOGGER, Logger } from '@core/domain/Logger';
import { Token } from '@core/types/Token';

@injectable()
export class TokenGeneratorJWT implements TokenGenerator {

  private config: Config;
  private logger: Logger;

  public constructor (@inject(Config) config: Config, @inject(LOGGER) logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  public async create (payload: UserTokenPayload): Promise<Token> {
    const options: SignOptions = {
      expiresIn: this.config.getTokenExpiration(),
      algorithm: this.config.getTokenAlgorithm() as Algorithm
    };

    return jwt.sign(payload, this.config.getTokenSecretKey(), options);
  }

}