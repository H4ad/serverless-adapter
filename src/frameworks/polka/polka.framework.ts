//#region Imports

import type { IncomingMessage, ServerResponse } from 'http';
import polka, { type Polka } from 'polka';
import type { FrameworkContract } from '../../contracts';

//#endregion

/**
 * The framework that forwards requests to polka handler
 *
 * @breadcrumb Frameworks / PolkaFramework
 * @public
 */
export class PolkaFramework implements FrameworkContract<Polka> {
  /**
   * {@inheritDoc}
   */
  sendRequest(
    app: Polka,
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>,
  ): void {
    app.handler(request as polka.Request, response);
  }
}
