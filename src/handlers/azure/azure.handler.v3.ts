//#region Imports

import type { Context } from '@azure/functions';
import type { BinarySettings } from '../../@types';
import type {
  AdapterContract,
  FrameworkContract,
  ResolverContract,
  ServerlessHandler,
} from '../../contracts';
import {
  type ILogger,
  getDefaultIfUndefined,
  isInternalLogger,
} from '../../core';
import { DefaultHandler } from '../default';

//#endregion

/**
 * The options to customize {@link AzureHandlerV3}
 *
 * @breadcrumb Handlers / AzureHandlerV3
 * @public
 */
export interface AzureHandlerV3Options {
  /**
   * Indicates to use the context log instead console.log when logger is internal (created by the library)
   *
   * @defaultValue true
   */
  useContextLogWhenInternalLogger: boolean;
}

/**
 * The class that implements a serverless handler for Azure Function V2/V3.
 *
 * When you don't specify a custom logger, the {@link Context} logger is used instead.
 *
 * @breadcrumb Handlers / AzureHandlerV3
 * @public
 */
export class AzureHandlerV3<
  TApp,
  TEvent,
  TCallback,
  TResponse,
  TReturn,
> extends DefaultHandler<TApp, TEvent, Context, TCallback, TResponse, TReturn> {
  //#region Constructor

  /**
   * Default Constructor
   */
  constructor(protected readonly options?: AzureHandlerV3Options) {
    super();
  }

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public override getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
    adapters: AdapterContract<TEvent, Context, TResponse>[],
    resolverFactory: ResolverContract<
      TEvent,
      Context,
      TCallback,
      TResponse,
      TReturn
    >,
    binarySettings: BinarySettings,
    respondWithErrors: boolean,
    log: ILogger,
  ): ServerlessHandler<TReturn> {
    return (context: Context, event: TEvent) => {
      const useContextLogWhenInternalLogger = getDefaultIfUndefined(
        this.options?.useContextLogWhenInternalLogger,
        true,
      );

      if (isInternalLogger(log) && useContextLogWhenInternalLogger)
        log = this.createLoggerFromContext(context);

      const defaultHandler = super.getHandler(
        app,
        framework,
        adapters,
        resolverFactory,
        binarySettings,
        respondWithErrors,
        log,
      );

      // remove this from context
      // because user can mess it-up the things
      // @ts-ignore
      delete context.done;
      delete context.res;

      return defaultHandler(event, context, undefined);
    };
  }

  //#endregion

  //#region Protected Methods

  /**
   * Get the {@link ILogger} instance from logger of the context
   *
   * @param context - The Azure Context
   */
  protected createLoggerFromContext(context: Context): ILogger {
    return {
      error: context.log.error,
      debug: context.log.verbose,
      verbose: context.log.verbose,
      info: context.log.info,
      warn: context.log.warn,
    };
  }

  //#endregion
}
