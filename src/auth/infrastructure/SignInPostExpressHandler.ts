import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { HttpExpressHandler } from '@core/infrastructure/httpServers/HttpExpressHandler';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';
import { SignIn } from '@src/auth/application/SignIn';
import { ExpressRequestBody } from '@core/infrastructure/httpServers/ExpressRequest';
import { CredentialsDTO } from '@src/auth/domain/dataTransferObjects/CredentialsDTO';
import { DataValidator } from '@core/domain/DataValidator';
import { ValidationError } from '@core/domain/errors/ValidationError';
import { CREDENTIALS_DATA_VALIDATOR } from '@src/auth/domain/dataValidators/CredentialsDataValidator';

@injectable()
export class SignInPostExpressHandler extends HttpExpressHandler {

  private signIn: SignIn;
  private validator: DataValidator;

  public constructor (@inject(SignIn) signIn: SignIn, @inject(CREDENTIALS_DATA_VALIDATOR) validator: DataValidator) {
    super();
    this.signIn = signIn;
    this.validator = validator;
  }

  public async run (req: ExpressRequestBody<CredentialsDTO>, res: Response): Promise<void> {
    const credentialsDTO = req.body as CredentialsDTO;
    const isValid = await this.validator.isValid(credentialsDTO);

    if (!isValid) {
      const errors = await this.validator.getErrors();
      throw new ValidationError(errors);
    }

    const token = await this.signIn.run(credentialsDTO);

    res.status(HTTP_STATUS_CODE.OK).send(token);
  }

}
