import { SingleValueHeaders } from '../@types';
import { ILogger } from '../core';
import { ServerlessResponse } from '../network';
import { Resolver } from './resolver.contract';

export interface CanHandleProps<TEvent, TContext> {
  event: TEvent | unknown;
  context: TContext | unknown;
  log: ILogger;
}

export interface AdapterRequest {
  method: string;
  path: string;
  headers: SingleValueHeaders;
  body: Buffer | undefined;
  remoteAddress?: string;
  host?: string;
  hostname?: string;
}

export interface GetResponseAdapterProps<TEvent> {
  event: TEvent;
  response?: ServerlessResponse;
  statusCode: number;
  body: string;
  headers: Record<string, string | string[]>;
  isBase64Encoded: boolean;
  log: ILogger;
}

export interface OnErrorProps<TEvent, TResponse> {
  event: TEvent;
  error: Error;
  resolver: Resolver<TResponse>;
  respondWithErrors: boolean;
  log: ILogger;
}

/**
 * The interface that represents a contract between the adapter and the actual implementation of the adapter.
 */
export interface AdapterContract<
  TEvent = any,
  TContext = any,
  TResponse = any
> {
  /**
   * Get the adapter name
   */
  getAdapterName(): string;

  /**
   * Decide if this adapter can handle a request based in the event payload
   *
   * @param event The event sent by serverless
   * @param context The context sent by the serverless
   * @param log The instance of logger
   */
  canHandle(event: unknown, context: TContext, log: ILogger): boolean;

  /**
   * Maps the serverless payload to an actual request that a framework can handle
   *
   * @param event The event sent by serverless
   * @param context The context sent by the serverless
   * @param log The instance of logger
   */
  getRequest(event: TEvent, context: TContext, log: ILogger): AdapterRequest;

  /**
   * Maps the response of the framework to a payload that serverless can handle
   *
   * @param props The props sent by serverless
   */
  getResponse(props: GetResponseAdapterProps<TEvent>): TResponse;

  /**
   * When an error occurs while forwarding the request to the framework
   *
   * @note You must call resolver.fail or resolver.succeed when implementing this method.
   */
  onErrorWhileForwarding(props: OnErrorProps<TEvent, TResponse>): void;
}
