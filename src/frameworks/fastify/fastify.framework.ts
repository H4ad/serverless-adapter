//#region Imports

import { IncomingMessage, ServerResponse } from 'http';
import type { FastifyInstance } from 'fastify';
import { FrameworkContract } from '../../contracts';

//#endregion

/**
 * The framework that forwards requests to fastify handler
 *
 * @breadcrumb Frameworks / FastifyFramework
 * @public
 */
export class FastifyFramework implements FrameworkContract<FastifyInstance> {
  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: FastifyInstance,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    // ref: https://www.fastify.io/docs/latest/Guides/Serverless/#implement-and-export-the-function
    app.ready().then(() => app.server.emit('request', request, response));
  }
}
