declare namespace NodeJS {
  export interface ProcessEnv {
    SERVICE_NAME: string;
    SERVICE_VERSION: string;
    DEBUG: string;
    HTTP_PORT: string;
    LOG_LEVEL: string;
    DATABASE_PROTOCOL: string;
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_PARAMS: string;
    BODY_SIZE_LIMIT: string;
    TOKEN_SECRET_KEY: string;
  }
}
