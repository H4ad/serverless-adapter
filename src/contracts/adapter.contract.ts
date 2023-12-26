//#region Imports

import type { BothValueHeaders, SingleValueHeaders } from '../@types';
import type { ILogger } from '../core';
import { ServerlessResponse } from '../network';
import type { DelegatedResolver } from './resolver.contract';

//#endregion

/**
 * The request interface used to bridge any event source to the framework.
 *
 * @breadcrumb Contracts / AdapterContract
 * @public
 */
export interface AdapterRequest {
  /**
   * The HTTP Method to use to create the request to the framework
   */
  method: string;

  /**
   * The path to use to create the request to the framework
   */
  path: string;

  /**
   * The headers to use to create the request to the framework
   */
  headers: SingleValueHeaders;

  /**
   * The body as buffer to use to create the request to the framework
   */
  body?: Buffer;

  /**
   * The remote address (client ip) to use to create the request to the framework
   */
  remoteAddress?: string;

  /**
   * The address of the event source (used in Lambda\@edge)
   *
   * @deprecated It is no longer used in the library and will be removed in the next major release.
   */
  host?: string;

  /**
   * The address of the event source (used in Lambda\@edge)
   *
   * @deprecated It is no longer used in the library and will be removed in the next major release.
   */
  hostname?: string;
}

/**
 * The props of the method that get the response from the framework and transform it into a format that the event source can handle
 *
 * @breadcrumb Contracts / AdapterContract
 * @public
 */
export interface GetResponseAdapterProps<TEvent> {
  /**
   * The event sent by the serverless
   */
  event: TEvent;

  /**
   * The framework {@link ServerlessResponse | response}.
   *
   * @remarks It can be optional, as this method can be used when an error occurs during the handling of the request by the framework.
   */
  response?: ServerlessResponse;

  /**
   * The framework response status code
   */
  statusCode: number;

  /**
   * The framework response body
   */
  body: string;

  /**
   * The framework response headers
   */
  headers: BothValueHeaders;

  /**
   * Indicates whether the response is base64 encoded or not
   */
  isBase64Encoded: boolean;

  /**
   * The instance of the logger
   */
  log: ILogger;
}

/**
 * The props of the method that handle the response when an error occurs while forwarding the request to the framework
 *
 * @breadcrumb Contracts / AdapterContract
 * @public
 */
export interface OnErrorProps<TEvent, TResponse> {
  /**
   * The event sent by the serverless
   */
  event: TEvent;

  /**
   * The error throwed during forwarding
   */
  error: Error;

  /**
   * The instance of the resolver
   */
  delegatedResolver: DelegatedResolver<TResponse>;

  /**
   * Indicates whether to forward the (error.stack) or not to the client
   */
  respondWithErrors: boolean;

  /**
   * The instance of the logger
   */
  log: ILogger;
}

/**
 * The interface that represents a contract between the adapter and the actual implementation of the adapter.
 *
 * @breadcrumb Contracts / AdapterContract
 * @public
 */
export interface AdapterContract<TEvent, TContext, TResponse> {
  /**
   * Get the adapter name
   */
  getAdapterName(): string;

  /**
   * Decide if this adapter can handle a request based in the event payload
   *
   * @param event - The event sent by serverless
   * @param context - The context sent by the serverless
   * @param log - The instance of logger
   */
  canHandle(event: unknown, context: TContext, log: ILogger): boolean;

  /**
   * Maps the serverless payload to an actual request that a framework can handle
   *
   * @param event - The event sent by serverless
   * @param context - The context sent by the serverless
   * @param log - The instance of logger
   */
  getRequest(event: TEvent, context: TContext, log: ILogger): AdapterRequest;

  /**
   * Maps the response of the framework to a payload that serverless can handle
   *
   * @param props - The props sent by serverless
   */
  getResponse(props: GetResponseAdapterProps<TEvent>): TResponse;

  /**
   * When an error occurs while forwarding the request to the framework
   *
   * @remarks You must call resolver.fail or resolver.succeed when implementing this method.
   */
  onErrorWhileForwarding(props: OnErrorProps<TEvent, TResponse>): void;
}
