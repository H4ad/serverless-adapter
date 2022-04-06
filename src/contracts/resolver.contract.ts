//#region Imports

import { ILogger } from '../core';
import { AdapterContract } from './adapter.contract';

//#endregion

/**
 * The type that represents a resolver used to send the response, error or success, to the client
 *
 * @public
 */
export type Resolver<TResponse, TReturn> = {
  /**
   * The method that will perform the task of forwarding the request to the framework and waiting for the promise to be resolved with the response
   *
   * @param task - The task to be executed
   */
  run(task: () => Promise<TResponse>): TReturn;
};

/**
 * The type that represents a delegate resolver that is passed to the adapter to handle what to do when an error occurs during forwarding.
 *
 * @public
 */
export type DelegatedResolver<TResponse> = {
  /**
   * Send the success response to the client
   *
   * @param success - The serverless response
   */
  succeed: (response: TResponse) => void;

  /**
   * Send the error response to the client
   *
   * @param error - The error object
   */
  fail: (error: Error) => void;
};

/**
 * The createResolver contract props
 *
 * @public
 */
export type ResolverProps<TEvent, TContext, TCallback, TResponse> = {
  /**
   * The event sent by the serverless environment
   */
  event: TEvent;

  /**
   * Indicates whether to forward the (error.stack) or not to the client
   */
  respondWithErrors: boolean;

  /**
   * The instance of the logger
   */
  log: ILogger;

  /**
   * The instance of the adapter
   */
  adapter: AdapterContract<TEvent, TContext, TResponse>;

  /**
   * The context sent by serverless
   */
  context?: TContext;

  /**
   * The callback sent by serverless
   */
  callback?: TCallback;
};

/**
 * The interface that represents the contract used to send the response to the client
 *
 * @public
 */
export interface ResolverContract<
  TEvent,
  TContext,
  TCallback,
  TResponse,
  TReturn,
> {
  /**
   * Create the resolver based on the context, callback or promise
   *
   * @param props - The props used to create the resolver
   */
  createResolver(
    props: ResolverProps<TEvent, TContext, TCallback, TResponse>,
  ): Resolver<TResponse, TReturn>;
}
