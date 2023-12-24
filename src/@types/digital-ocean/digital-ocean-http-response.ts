//#region Imports

import type { SingleValueHeaders } from '../headers';

//#endregion

/**
 * The interface to represents the response of Digital Ocean Function.
 *
 * @public
 * @breadcrumb Types / Digital Ocean / DigitalOceanHttpResponse
 */
export interface DigitalOceanHttpResponse {
  /**
   * The HTTP Headers of the response
   */
  headers?: SingleValueHeaders;

  /**
   * The body of the response
   */
  body: unknown;

  /**
   * The HTTP Status code of the response
   */
  statusCode: number;
}
