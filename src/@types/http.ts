import type { SingleValueHeaders } from '.';

/**
 * The record that represents the http root field of DigitalOceanHttpEvent
 *
 * {@link https://docs.digitalocean.com/products/functions/reference/parameters-responses/#parsed-web-events | Reference}
 *
 * @breadcrumb Types
 * @public
 */
export interface DigitalOceanHttpRootEvent {
  /**
   * The body of the request.
   */
  body: string;

  /**
   * The HTTP Headers of the request
   */
  headers: SingleValueHeaders;

  /**
   * Indicates if body is base64 string
   */
  isBase64Encoded: boolean;

  /**
   * The HTTP Method of the request
   */
  method: string;

  /**
   * The path in the request
   */
  path: string;

  /**
   * The query params in the request
   */
  queryString: string;
}
