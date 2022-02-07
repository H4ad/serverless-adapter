//#region

import { Express } from 'express';
import { FrameworkContract } from '../contracts';
import { ServerlessRequest, ServerlessResponse } from '../network';

//#endregion

/**
 * The framework that forwards requests to express handler
 */
export class ExpressFramework implements FrameworkContract<Express> {
  /**
   * @inheritDoc
   */
  public sendRequest(
    app: Express,
    request: ServerlessRequest,
    response: ServerlessResponse
  ): void {
    app(request, response);
  }
}
