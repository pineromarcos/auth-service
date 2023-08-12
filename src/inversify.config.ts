import { HTTP_SERVER, HttpServer } from '@core/domain/HttpServer';
import { Config } from './Config';
import { Logger, LOGGER } from '@core/domain/Logger';
import { LoggerWinston } from '@core/infrastructure/loggers/LoggerWinston';
import { Container } from 'inversify';
import { HttpExpressRouter } from '@core/infrastructure/httpServers/HttpExpressRouter';
import { HttpExpressServer } from '@core/infrastructure/httpServers/HttpExpressServer';
import { LIFE_CYCLE_MANAGER, LifeCycleManager } from '@core/domain/LifeCycleManager';
import { MongooseClientFactory } from '@core/infrastructure/dataSources/MongooseClientFactory';
import { HttpLifeCycleManager } from '@status/infrastructure/HttpLifeCycleManager';
import { GetStatus } from '@status/application/GetStatus';
import { StatusGetExpressHandler } from '@status/infrastructure/StatusGetExpressHandler';
import { AuthorizationExpressHandler } from '@core/infrastructure/AuthorizationExpressHandler';
import { TOKEN_VERIFIER, TokenVerifier } from '@core/domain/TokenVerifier';
import { TokenVerifierJWT } from '@core/infrastructure/TokenVerifierJWT';

const dependencyContainer: Container = new Container();

dependencyContainer.bind<Logger>(LOGGER).to(LoggerWinston).inSingletonScope();
dependencyContainer.bind<Config>(Config).toSelf().inSingletonScope();
dependencyContainer.bind<HttpExpressRouter>(HttpExpressRouter).toSelf();
dependencyContainer.bind<HttpServer>(HTTP_SERVER).to(HttpExpressServer);
dependencyContainer.bind<LifeCycleManager>(LIFE_CYCLE_MANAGER).to(HttpLifeCycleManager);
dependencyContainer.bind<MongooseClientFactory>(MongooseClientFactory).toSelf().inSingletonScope();

dependencyContainer.bind<GetStatus>(GetStatus).toSelf();
dependencyContainer.bind<StatusGetExpressHandler>(StatusGetExpressHandler).toSelf();

dependencyContainer.bind<TokenVerifier>(TOKEN_VERIFIER).to(TokenVerifierJWT);
dependencyContainer.bind<AuthorizationExpressHandler>(AuthorizationExpressHandler).to(AuthorizationExpressHandler);

export { dependencyContainer };
