export interface HttpServer {
  registerRoutes (pattern: string): Promise<void>;
  start (): Promise<void>;
  stop (): Promise<void>;
}

export const HTTP_SERVER = Symbol.for('HttpServer');
