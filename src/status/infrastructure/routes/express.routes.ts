import { HttpExpressRouter } from '@core/infrastructure/httpServers/HttpExpressRouter';
import { HTTP_METHOD } from '@core/types/HttpMethods';
import { dependencyContainer } from '@src/inversify.config';
import { StatusGetExpressHandler } from '@status/infrastructure/StatusGetExpressHandler';

export const register = async (router: HttpExpressRouter): Promise<void> => {
  const statusGetExpressHandler = dependencyContainer.get<StatusGetExpressHandler>(StatusGetExpressHandler);

  await router.add(HTTP_METHOD.GET, '/v1/status', statusGetExpressHandler);
};
