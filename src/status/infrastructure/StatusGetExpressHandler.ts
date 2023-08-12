import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { GetStatus } from '@status/application/GetStatus';
import { HttpExpressHandler } from '@core/infrastructure/httpServers/HttpExpressHandler';
import { HTTP_STATUS_CODE } from '@core/types/HttpStatusCode';
import { ExtendedRequest } from '@core/infrastructure/httpServers/ExpressRequest';

@injectable()
export class StatusGetExpressHandler extends HttpExpressHandler {

  private getStatus: GetStatus;

  public constructor (@inject(GetStatus) getStatus: GetStatus) {
    super();
    this.getStatus = getStatus;
  }

  public async run (req: ExtendedRequest, res: Response): Promise<void> {
    const status = await this.getStatus.run();
    res.status(HTTP_STATUS_CODE.OK).send(status);
  }

}
