import type { IncomingMessage, ServerResponse } from 'node:http';
import type { BothValueHeaders, SingleValueHeaders } from '../@types';

/**
 * The properties used to create an HTTP request for the framework.
 *
 * @breadcrumb Contracts / NetworkContract
 * @public
 */
export interface NetworkRequestProps {
  /**
   * The HTTP Method of the request.
   */
  method: string;

  /**
   * The URL requested by the event source.
   */
  url: string;

  /**
   * The headers from the event source.
   */
  headers: SingleValueHeaders;

  /**
   * The body from the event source.
   */
  body?: Buffer | Uint8Array;

  /**
   * The IP address from the caller.
   */
  remoteAddress?: string;
}

/**
 * The properties used to create an HTTP response for the framework.
 *
 * @breadcrumb Contracts / NetworkContract
 * @public
 */
export interface NetworkResponseProps {
  /**
   * The HTTP Method from the request.
   */
  method?: string;
}

/**
 * A request implementation that can be forwarded to a framework.
 *
 * @breadcrumb Contracts / NetworkContract
 * @public
 */
export type NetworkRequest = IncomingMessage & {
  /**
   * The body from the event source when the request implementation exposes it directly.
   */
  body?: Buffer | Uint8Array;

  /**
   * The IP address from the caller when the request implementation exposes it directly.
   */
  ip?: string;
};

/**
 * A response implementation that can receive framework output.
 *
 * @breadcrumb Contracts / NetworkContract
 * @public
 */
export type NetworkResponse = ServerResponse;

/**
 * Creates HTTP request/response objects and extracts the collected response data.
 *
 * @breadcrumb Contracts / NetworkContract
 * @public
 */
export interface NetworkContract<
  TRequest extends IncomingMessage = NetworkRequest,
  TResponse extends ServerResponse = NetworkResponse,
> {
  /**
   * Create the request that will be forwarded to the framework.
   */
  createRequest: (props: NetworkRequestProps) => TRequest;

  /**
   * Create the response that will receive framework output.
   */
  createResponse: (props: NetworkResponseProps) => TResponse;

  /**
   * Extract the response body collected by the response implementation.
   */
  getResponseBody: (response: TResponse) => Buffer;

  /**
   * Extract the response headers collected by the response implementation.
   */
  getResponseHeaders: (response: TResponse) => BothValueHeaders;
}
