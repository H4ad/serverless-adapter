//#region Imports

import type { BinarySettings } from '../../@types';
import type { DigitalOceanHttpEvent } from '../../@types/digital-ocean';
import type {
  AdapterContract,
  FrameworkContract,
  NetworkContract,
  NetworkRequest,
  NetworkResponse,
  ResolverContract,
  ServerlessHandler,
} from '../../contracts';
import type { ILogger } from '../../core';
import type { ServerlessRequest, ServerlessResponse } from '../../network';
import { DefaultHandler } from '../default';

//#endregion

/**
 * The class that implements a serverless handler for Digital Ocean Functions.
 *
 * @breadcrumb Handlers / DigitalOceanHandler
 * @public
 */
export class DigitalOceanHandler<
  TApp,
  TEvent,
  TResponse,
  TReturn,
  TNetworkRequest extends NetworkRequest = ServerlessRequest,
  TNetworkResponse extends NetworkResponse = ServerlessResponse,
> extends DefaultHandler<
  TApp,
  TEvent,
  void,
  void,
  TResponse,
  TReturn,
  TNetworkRequest,
  TNetworkResponse
> {
  /**
   * {@inheritDoc}
   */
  public override getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
    adapters: AdapterContract<TEvent, void, TResponse, TNetworkResponse>[],
    resolverFactory: ResolverContract<TEvent, void, void, TResponse, TReturn>,
    binarySettings: BinarySettings,
    respondWithErrors: boolean,
    log: ILogger,
    network: NetworkContract<TNetworkRequest, TNetworkResponse>,
  ): ServerlessHandler<TReturn> {
    const defaultHandler = super.getHandler(
      app,
      framework,
      adapters,
      resolverFactory,
      binarySettings,
      respondWithErrors,
      log,
      network,
    );

    return (event: DigitalOceanHttpEvent) =>
      defaultHandler(event, undefined, undefined);
  }
}
