//#region Imports

import { Server } from 'hapi';
import { FrameworkContract } from '../contracts';
import { ServerlessRequest, ServerlessResponse } from '../network';

//#endregion

/**
 * The framework that forwards requests to hapi handler
 */
export class HapiFramework implements FrameworkContract<Server> {
  /**
   * @inheritDoc
   */
  public sendRequest(
    app: Server,
    request: ServerlessRequest,
    response: ServerlessResponse
  ): void {
    const httpServer = app.listener || app.connections[0]?.server;

    (httpServer as any)._events.request(request, response);
  }
}
