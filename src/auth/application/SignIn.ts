import { UseCase } from '@core/application/UseCase';
import { AuthenticationError } from '@core/domain/errors/AuthenticationError';
import { Nullable } from '@core/types/Nullable';
import { Token } from '@core/types/Token';
import { ENCRYPTER, Encrypter } from '@src/auth/domain/Encrypter';
import { TOKEN_GENERATOR, TokenGenerator } from '@src/auth/domain/TokenGenerator';
import { User } from '@src/auth/domain/User';
import { USER_REPOSITORY, UserRepository } from '@src/auth/domain/UserRepository';
import { CredentialsDTO } from '@src/auth/domain/dataTransferObjects/CredentialsDTO';
import { inject, injectable } from 'inversify';

@injectable()
export class SignIn implements UseCase<CredentialsDTO, Token> {

  private repository: UserRepository;
  private encrypter: Encrypter;
  private tokenGenerator: TokenGenerator;

  public constructor (@inject(USER_REPOSITORY) repository: UserRepository, @inject(ENCRYPTER) encrypter: Encrypter, @inject(TOKEN_GENERATOR) tokenGenerator: TokenGenerator) {
    this.repository = repository;
    this.encrypter = encrypter;
    this.tokenGenerator = tokenGenerator;
  }

  public async run (credentials: CredentialsDTO): Promise<Token> {
    const user: Nullable<User> = await this.repository.findByUsername(credentials.username);

    if (!user) {
      throw new AuthenticationError();
    }

    const equal: boolean = await this.encrypter.compare(credentials.password, user.getPassword());

    if (equal === false) {
      throw new AuthenticationError();
    }

    const token = this.tokenGenerator.create({
      sub: user.getId(),
      role: user.getRole(),
      username: user.getUsername()
    });

    return token;
  }

}
