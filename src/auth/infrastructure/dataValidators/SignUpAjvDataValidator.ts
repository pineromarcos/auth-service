import { AjvDataValidator } from '@core/infrastructure/dataValidators/AjvDataValidator';
import { SignUpJsonSchema } from '@src/auth/domain/dataValidators/SignUpDataValidator';
import { injectable } from 'inversify';

@injectable()
export class SignUpAjvDataValidator extends AjvDataValidator {

  protected getSchema (): object {
    return SignUpJsonSchema;
  }

}
