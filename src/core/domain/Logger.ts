export interface Logger {
  info (message: string): void;
  debug (message: string): void;
  warning (message: string): void;
  error (error: Error): void;
}

export const LOGGER = Symbol.for('Logger');
