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
import { USER_REPOSITORY, UserRepository } from '@auth/domain/UserRepository';
import { UserMongoose } from '@auth/infrastructure/dataSources/UserMongoose';
import { EncrypterBCrypt } from '@auth/infrastructure/EncrypterBCrypt';
import { ENCRYPTER, Encrypter } from '@auth/domain/Encrypter';
import { SignIn } from '@auth/application/SignIn';
import { SignInPostExpressHandler } from '@auth/infrastructure/SignInPostExpressHandler';
import { DataValidator } from '@core/domain/DataValidator';
import { TOKEN_GENERATOR, TokenGenerator } from '@auth/domain/TokenGenerator';
import { CREDENTIALS_DATA_VALIDATOR } from '@auth/domain/dataValidators/CredentialsDataValidator';
import { CredentialsAjvDataValidator } from '@auth/infrastructure/dataValidators/CredentialsAjvDataValidator';
import { TokenGeneratorJWT } from '@auth/infrastructure/TokenGeneratorJWT';
import { SignUp } from '@auth/application/SignUp';
import { SignUpPostExpressHandler } from '@auth/infrastructure/SignUpPostExpressHandler';
import { SIGN_UP_DATA_VALIDATOR } from '@auth/domain/dataValidators/SignUpDataValidator';
import { SignUpAjvDataValidator } from '@auth/infrastructure/dataValidators/SignUpAjvDataValidator';

const dependencyContainer: Container = new Container();

dependencyContainer.bind<Logger>(LOGGER).to(LoggerWinston).inSingletonScope();
dependencyContainer.bind<Config>(Config).toSelf().inSingletonScope();
dependencyContainer.bind<HttpExpressRouter>(HttpExpressRouter).toSelf();
dependencyContainer.bind<HttpServer>(HTTP_SERVER).to(HttpExpressServer);
dependencyContainer.bind<LifeCycleManager>(LIFE_CYCLE_MANAGER).to(HttpLifeCycleManager);
dependencyContainer.bind<MongooseClientFactory>(MongooseClientFactory).toSelf().inSingletonScope();

dependencyContainer.bind<GetStatus>(GetStatus).toSelf();
dependencyContainer.bind<StatusGetExpressHandler>(StatusGetExpressHandler).toSelf();

dependencyContainer.bind<UserRepository>(USER_REPOSITORY).to(UserMongoose);
dependencyContainer.bind<Encrypter>(ENCRYPTER).to(EncrypterBCrypt);

dependencyContainer.bind<SignIn>(SignIn).toSelf();
dependencyContainer.bind<SignInPostExpressHandler>(SignInPostExpressHandler).toSelf();
dependencyContainer.bind<DataValidator>(CREDENTIALS_DATA_VALIDATOR).to(CredentialsAjvDataValidator);
dependencyContainer.bind<TokenGenerator>(TOKEN_GENERATOR).to(TokenGeneratorJWT);

dependencyContainer.bind<SignUp>(SignUp).toSelf();
dependencyContainer.bind<SignUpPostExpressHandler>(SignUpPostExpressHandler).toSelf();
dependencyContainer.bind<DataValidator>(SIGN_UP_DATA_VALIDATOR).to(SignUpAjvDataValidator);

export { dependencyContainer };
