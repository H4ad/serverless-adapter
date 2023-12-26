//#region Imports

import type { BinarySettings } from '../@types';
import type { ILogger } from '../core';
import type { AdapterContract } from './adapter.contract';
import type { FrameworkContract } from './framework.contract';
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
> {
  /**
   * Get the handler that will handle serverless requests
   */
  getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
    adapters: AdapterContract<TEvent, TContext, TResponse>[],
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
  ): ServerlessHandler<TReturn>;
}
