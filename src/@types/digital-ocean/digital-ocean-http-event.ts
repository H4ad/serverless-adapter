//#region Imports

import { SingleValueHeaders } from '../headers';

//#endregion

/**
 * The interface to represents the values of args send when someone calls a function using HTTP Endpoint.
 *
 * @public
 * @breadcrumb Types / Digital Ocean / DigitalOceanHttpEvent
 */
export interface DigitalOceanHttpEvent {
  /**
   * The HTTP Method of the request
   */
  __ow_method: string;

  /**
   * The body of the request.
   *
   * @remarks From my tests it usually appears along with {@link __ow_isBase64Encoded}=true, so this body is always a base64 string.
   */
  __ow_body?: string;

  /**
   * Indicates if body is base64, from my tests, when it appears, is always true.
   */
  __ow_isBase64Encoded?: true;

  /**
   * The HTTP Headers of the request
   */
  __ow_headers: SingleValueHeaders;

  /**
   * The path in the request
   */
  __ow_path: string;

  /**
   * This could represent Query Params or Body Params, it's very strange behavior, but it is what it is.
   */
  [key: string]: unknown;
}
