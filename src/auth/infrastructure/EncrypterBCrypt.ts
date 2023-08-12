import { Encrypter } from '@src/auth/domain/Encrypter';
import { injectable } from 'inversify';
import bcrypt from 'bcrypt';

@injectable()
export class EncrypterBCrypt implements Encrypter {

  public async encrypt (plainPassword: string): Promise<string> {
    const randomRounds = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    const salt = await bcrypt.genSalt(randomRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    return hashedPassword;
  }

  public async compare (plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

}