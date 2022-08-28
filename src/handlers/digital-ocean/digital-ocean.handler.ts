/* eslint-disable @typescript-eslint/unbound-method */
//#region Imports

import { BinarySettings } from '../../@types';
import { DigitalOceanHttpEvent } from '../../@types/digital-ocean';
import {
  AdapterContract,
  FrameworkContract,
  ResolverContract,
  ServerlessHandler,
} from '../../contracts';
import { ILogger } from '../../core';
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
  public getHandler(
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

    return (event: DigitalOceanHttpEvent) => {
      return defaultHandler(event, undefined, undefined);
    };
  }
}
