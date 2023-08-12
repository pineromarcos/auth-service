import { UseCase } from '@core/application/UseCase';
import { AuthenticationError } from '@core/domain/errors/AuthenticationError';
import { Nullable } from '@core/types/Nullable';
import { ENCRYPTER, Encrypter } from '@src/auth/domain/Encrypter';
import { ROLES } from '@src/auth/domain/Roles';
import { User, UserDataConstructor } from '@src/auth/domain/User';
import { USER_REPOSITORY, UserRepository } from '@src/auth/domain/UserRepository';
import { CredentialsDTO } from '@src/auth/domain/dataTransferObjects/CredentialsDTO';
import { SignUpDTO } from '@src/auth/domain/dataTransferObjects/SignUpDTO';
import { inject, injectable } from 'inversify';

@injectable()
export class SignUp implements UseCase<CredentialsDTO, void> {

  private repository: UserRepository;
  private encrypter: Encrypter;

  public constructor (@inject(USER_REPOSITORY) repository: UserRepository, @inject(ENCRYPTER) encrypter: Encrypter) {
    this.repository = repository;
    this.encrypter = encrypter;
  }

  public async run (userInfo: SignUpDTO): Promise<void> {
    const userExist: Nullable<User> = await this.repository.findByUsername(userInfo.username);

    if (userExist) {
      throw new AuthenticationError();
    }

    const hashedPassword = await this.encrypter.encrypt(userInfo.password);

    const userData: UserDataConstructor = {
      ...userInfo,
      password: hashedPassword,
      role: ROLES.ADMIN
    };

    const user = new User(userData);

    await this.repository.create(user);
  }

}
