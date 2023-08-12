import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export abstract class HttpExpressHandler {

  public getName (): string {
    return this.constructor.name;
  }

  public abstract run (req: Request, res: Response, next: NextFunction): Promise<void>;

}
