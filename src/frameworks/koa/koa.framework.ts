//#region Imports

import type { IncomingMessage, ServerResponse } from 'http';
import type Application from 'koa';
import type { FrameworkContract } from '../../contracts';

//#endregion

/**
 * The framework that forwards requests to koa handler
 *
 * @breadcrumb Frameworks / KoaFramework
 * @public
 */
export class KoaFramework implements FrameworkContract<Application> {
  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: Application,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    app.callback()(request, response);
  }
}
