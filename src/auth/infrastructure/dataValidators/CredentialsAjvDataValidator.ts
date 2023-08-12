import { AjvDataValidator } from '@core/infrastructure/dataValidators/AjvDataValidator';
import { CredentialsJsonSchema } from '@src/auth/domain/dataValidators/CredentialsDataValidator';
import { injectable } from 'inversify';

@injectable()
export class CredentialsAjvDataValidator extends AjvDataValidator {

  protected getSchema (): object {
    return CredentialsJsonSchema;
  }

}
