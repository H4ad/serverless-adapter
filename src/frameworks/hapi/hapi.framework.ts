//#region Imports

import { IncomingMessage, ServerResponse } from 'http';
import type { Server } from '@hapi/hapi';
import { FrameworkContract } from '../../contracts';

//#endregion

/**
 * The framework that forwards requests to hapi handler
 *
 * @breadcrumb Frameworks / HapiFramework
 * @public
 */
export class HapiFramework implements FrameworkContract<Server> {
  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: Server,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    const httpServer: any = app.listener;

    httpServer._events.request(request, response);
  }
}
