/* eslint-disable @typescript-eslint/unbound-method */
//#region Imports

import type { BinarySettings } from '../../@types';
import type { DigitalOceanHttpEvent } from '../../@types/digital-ocean';
import type {
  AdapterContract,
  FrameworkContract,
  ResolverContract,
  ServerlessHandler,
} from '../../contracts';
import type { ILogger } from '../../core';
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
> extends DefaultHandler<TApp, TEvent, void, void, TResponse, TReturn> {
  /**
   * {@inheritDoc}
   */
  public override getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
    adapters: AdapterContract<TEvent, void, TResponse>[],
    resolverFactory: ResolverContract<TEvent, void, void, TResponse, TReturn>,
    binarySettings: BinarySettings,
    respondWithErrors: boolean,
    log: ILogger,
  ): ServerlessHandler<TReturn> {
    const defaultHandler = super.getHandler(
      app,
      framework,
      adapters,
      resolverFactory,
      binarySettings,
      respondWithErrors,
      log,
    );

    return (event: DigitalOceanHttpEvent) =>
      defaultHandler(event, undefined, undefined);
  }
}
