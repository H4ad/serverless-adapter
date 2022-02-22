//#region Imports

import Application from 'koa';
import { FrameworkContract } from '../contracts';
import { ServerlessRequest, ServerlessResponse } from '../network';

//#endregion

/**
 * The framework that forwards requests to koa handler
 */
export class KoaFramework implements FrameworkContract<Application> {
  /**
   * @inheritDoc
   */
  public sendRequest(
    app: Application,
    request: ServerlessRequest,
    response: ServerlessResponse,
  ): void {
    app.callback()(request, response);
  }
}
