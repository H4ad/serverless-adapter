//#region Imports

import { BinarySettings } from '../@types';
import {
  AdapterContract,
  AdapterRequest,
  FrameworkContract,
  HandlerContract,
  ResolverContract,
  ServerlessHandler,
} from '../contracts';
import { ServerlessRequest, ServerlessResponse } from '../network';
import { ILogger } from './index';

//#endregion

/**
 * The abstract class that represents the base class for a handler
 *
 * @breadcrumb Core
 * @public
 */
export abstract class BaseHandler<
  TApp,
  TEvent,
  TContext,
  TCallback,
  TResponse,
  TReturn,
> implements
    HandlerContract<TApp, TEvent, TContext, TCallback, TResponse, TReturn>
{
  //#region Public Methods

  /**
   * Get the handler that will handle serverless requests
   */
  public abstract getHandler(
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

  //#endregion

  //#region Protected Methods

  /**
   * Get the adapter to handle a specific event and context
   *
   * @param event - The event sent by serverless
   * @param context - The context sent by serverless
   * @param adapters - The list of adapters
   * @param log - The instance of logger
   */
  protected getAdapterByEventAndContext(
    event: TEvent,
    context: TContext,
    adapters: AdapterContract<TEvent, TContext, TResponse>[],
    log: ILogger,
  ): AdapterContract<TEvent, TContext, TResponse> {
    const resolvedAdapters = adapters.filter(adapter =>
      adapter.canHandle(event, context, log),
    );

    if (resolvedAdapters.length === 0) {
      throw new Error(
        "SERVERLESS_ADAPTER: Couldn't find adapter to handle this event.",
      );
    }

    if (resolvedAdapters.length > 1) {
      throw new Error(
        `SERVERLESS_ADAPTER: Two or more adapters was resolved by the event, the adapters are: ${adapters
          .map(adapter => adapter.getAdapterName())
          .join(', ')}.`,
      );
    }

    return resolvedAdapters[0];
  }

  /**
   * Get serverless request and response frmo the adapter request
   *
   * @param requestValues - The request values from adapter
   */
  protected getServerlessRequestResponseFromAdapterRequest(
    requestValues: AdapterRequest,
  ): [request: ServerlessRequest, response: ServerlessResponse] {
    const request = new ServerlessRequest({
      method: requestValues.method,
      headers: requestValues.headers,
      body: requestValues.body,
      remoteAddress: requestValues.remoteAddress,
      url: requestValues.path,
    });

    const response = new ServerlessResponse({
      method: requestValues.method,
    });

    return [request, response];
  }

  //#endregion
}
