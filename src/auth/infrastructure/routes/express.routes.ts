import { HttpExpressRouter } from '@core/infrastructure/httpServers/HttpExpressRouter';
import { HTTP_METHOD } from '@core/types/HttpMethods';
import { SignInPostExpressHandler } from '@src/auth/infrastructure/SignInPostExpressHandler';
import { SignUpPostExpressHandler } from '@src/auth/infrastructure/SignUpPostExpressHandler';
import { dependencyContainer } from '@src/inversify.config';

export const register = async (router: HttpExpressRouter): Promise<void> => {
  const signInPostExpressHandler = dependencyContainer.get<SignInPostExpressHandler>(SignInPostExpressHandler);
  const signUpPostExpressHandler = dependencyContainer.get<SignUpPostExpressHandler>(SignUpPostExpressHandler);

  await router.add(HTTP_METHOD.POST, '/v1/auth/sign-in', signInPostExpressHandler);
  await router.add(HTTP_METHOD.POST, '/v1/auth/sign-up', signUpPostExpressHandler);
};
