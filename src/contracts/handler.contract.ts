//#region Imports

import type { BinarySettings } from '../@types';
import type { ILogger } from '../core';
import type { AdapterContract } from './adapter.contract';
import type { FrameworkContract } from './framework.contract';
import type {
  NetworkContract,
  NetworkRequest,
  NetworkResponse,
} from './network.contract';
import type { ResolverContract } from './resolver.contract';

//#endregion

/**
 * The function used to handle serverless requests
 *
 * @breadcrumb Contracts / HandlerContract
 * @public
 */
export type ServerlessHandler<TReturn> = (...args: any[]) => TReturn;

/**
 * The interface that represents the contract between the handler and the real implementation
 *
 * @breadcrumb Contracts / HandlerContract
 * @public
 */
export interface HandlerContract<
  TApp,
  TEvent,
  TContext,
  TCallback,
  TResponse,
  TReturn,
  TNetworkRequest extends NetworkRequest = any,
  TNetworkResponse extends NetworkResponse = any,
> {
  /**
   * Get the handler that will handle serverless requests
   */
  getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
    adapters: AdapterContract<TEvent, TContext, TResponse, TNetworkResponse>[],
    resolverFactory: ResolverContract<
      TEvent,
      TContext,
      TCallback,
      TResponse,
      TReturn
    >,
    binarySettings: BinarySettings,
    respondWithErrors: boolean,
    log: ILogger,
    network: NetworkContract<TNetworkRequest, TNetworkResponse>,
  ): ServerlessHandler<TReturn>;
}
