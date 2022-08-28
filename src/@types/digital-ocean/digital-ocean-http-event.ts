//#region Imports

import { SingleValueHeaders } from '../headers';

//#endregion

/**
 * The interface to represents the values of args send when someone calls a function using HTTP Endpoint.
 * To be able to receive this event, inside your `project.yml`, instead of `web: true` change to `web: 'raw'`.
 *
 * {@link https://www.digitalocean.com/community/questions/digitalocean-functions-how-to-differentiate-query-params-from-body-params | Reference}
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
   * The query porams of the request
   */
  __ow_query: string;

  /**
   * The body of the request.
   */
  __ow_body?: string;

  /**
   * Indicates if body is base64 string
   */
  __ow_isBase64Encoded?: boolean;

  /**
   * The HTTP Headers of the request
   */
  __ow_headers: SingleValueHeaders;

  /**
   * The path in the request
   */
  __ow_path: string;
}
