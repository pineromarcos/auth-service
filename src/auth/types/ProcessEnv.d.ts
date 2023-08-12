declare namespace NodeJS {
  interface ProcessEnv extends BaseProcessEnv {
    TOKEN_ALGORITHM: string;
    TOKEN_EXPIRATION: string;
  }
}
