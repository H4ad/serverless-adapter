//#region Imports

import { BinarySettings } from '../@types';
import { ILogger } from '../core';
import { AdapterContract } from './adapter.contract';
import { FrameworkContract } from './framework.contract';
import { ResolverContract } from './resolver.contract';

//#endregion

/**
 * The function used to handle serverless requests
 */
export type ServerlessHandler = (...args: any[]) => any;

/**
 * The interface that represents the contract between the handler and the real implementation
 */
export interface HandlerContract<
  TApp = any,
  TEvent = any,
  TContext = any,
  TCallback = any,
  TResponse = any,
> {
  /**
   * Get the handler that will handle serverless requests
   */
  getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
    adapters: AdapterContract<TEvent, TContext, TResponse>[],
    resolverFactory: ResolverContract<TEvent, TContext, TCallback, TResponse>,
    binarySettings: BinarySettings,
    respondWithErrors: boolean,
    log: ILogger,
  ): ServerlessHandler;
}
