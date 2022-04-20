//#region Imports

import { IncomingMessage, ServerResponse } from 'http';

//#endregion

/**
 * The interface that represents a contract between the framework and the framework implementation
 *
 * @breadcumb Contracts
 * @public
 */
export interface FrameworkContract<TApp> {
  /**
   * Send the request and response objects to the framework
   *
   * @param app - The instance of your app (Express, Fastify, Koa, etc...)
   * @param request - The request object that will be forward to your app
   * @param response - The response object that will be forward to your app to output the response
   */
  sendRequest(
    app: TApp,
    request: IncomingMessage,
    response: ServerResponse,
  ): void;
}
