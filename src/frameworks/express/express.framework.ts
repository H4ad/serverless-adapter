//#region

import { IncomingMessage, ServerResponse } from 'http';
import type { Express } from 'express';
import { FrameworkContract } from '../../contracts';

//#endregion

/**
 * The framework that forwards requests to express handler
 *
 * @public
 */
export class ExpressFramework implements FrameworkContract<Express> {
  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: Express,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    app(request, response);
  }
}
