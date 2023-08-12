import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { HttpExpressHandler } from '@core/infrastructure/httpServers/HttpExpressHandler';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';
import { SignUp } from '@src/auth/application/SignUp';
import { ExpressRequestBody } from '@core/infrastructure/httpServers/ExpressRequest';
import { DataValidator } from '@core/domain/DataValidator';
import { ValidationError } from '@core/domain/errors/ValidationError';
import { SIGN_UP_DATA_VALIDATOR } from '@src/auth/domain/dataValidators/SignUpDataValidator';
import { SignUpDTO } from '@src/auth/domain/dataTransferObjects/SignUpDTO';

@injectable()
export class SignUpPostExpressHandler extends HttpExpressHandler {

  private signUp: SignUp;
  private validator: DataValidator;

  public constructor (@inject(SignUp) signUp: SignUp, @inject(SIGN_UP_DATA_VALIDATOR) validator: DataValidator) {
    super();
    this.signUp = signUp;
    this.validator = validator;
  }

  public async run (req: ExpressRequestBody<SignUpDTO>, res: Response): Promise<void> {
    const signUpDTO = req.body as SignUpDTO;
    const isValid = await this.validator.isValid(signUpDTO);

    if (!isValid) {
      const errors = await this.validator.getErrors();
      throw new ValidationError(errors);
    }

    await this.signUp.run(signUpDTO);

    res.status(HTTP_STATUS_CODE.CREATED).send();
  }

}
