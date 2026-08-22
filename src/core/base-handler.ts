//#region Imports

import type { BinarySettings } from '../@types';
import type {
  AdapterContract,
  AdapterRequest,
  FrameworkContract,
  HandlerContract,
  NetworkContract,
  NetworkRequest,
  NetworkResponse,
  ResolverContract,
  ServerlessHandler,
} from '../contracts';
import type { ILogger } from './index';

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
  TNetworkRequest extends NetworkRequest = NetworkRequest,
  TNetworkResponse extends NetworkResponse = NetworkResponse,
> implements HandlerContract<
  TApp,
  TEvent,
  TContext,
  TCallback,
  TResponse,
  TReturn,
  TNetworkRequest,
  TNetworkResponse
> {
  //#region Public Methods

  /**
   * Get the handler that will handle serverless requests
   */
  public abstract getHandler(
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
    adapters: AdapterContract<TEvent, TContext, TResponse, TNetworkResponse>[],
    log: ILogger,
  ): AdapterContract<TEvent, TContext, TResponse, TNetworkResponse> {
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
   * Get serverless request and response from the adapter request
   *
   * @param requestValues - The request values from adapter
   * @param network - The network config
   */
  protected getServerlessRequestResponseFromAdapterRequest(
    requestValues: AdapterRequest,
    network: NetworkContract<TNetworkRequest, TNetworkResponse>,
  ): [request: TNetworkRequest, response: TNetworkResponse] {
    const request = network.createRequest({
      method: requestValues.method,
      headers: requestValues.headers,
      body: requestValues.body,
      remoteAddress: requestValues.remoteAddress,
      url: requestValues.path,
    });

    const response = network.createResponse({
      method: requestValues.method,
    });

    return [request, response];
  }

  //#endregion
}
