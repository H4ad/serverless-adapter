//#region Imports

import type { BinarySettings } from './@types';
import type {
  AdapterContract,
  FrameworkContract,
  HandlerContract,
  ResolverContract,
  ServerlessHandler,
} from './contracts';
import {
  DEFAULT_BINARY_CONTENT_TYPES,
  DEFAULT_BINARY_ENCODINGS,
  type ILogger,
  createDefaultLogger,
} from './core';

//#endregion

/**
 * The class used to build the serverless handler.
 *
 * @example
 * ```typescript
 * const app = express();
 * export const handler = ServerlessAdapter.new(app)
 *   .setFramework(new ExpressFramework())
 *   .setHandler(new DefaultHandler())
 *   .setResolver(new PromiseResolver())
 *   .setRespondWithErrors(true)
 *   .addAdapter(new AlbAdapter())
 *   .addAdapter(new SQSAdapter())
 *   .addAdapter(new SNSAdapter())
 *   .build();
 * ```
 *
 * @breadcrumb ServerlessAdapter
 * @public
 */
export class ServerlessAdapter<
  TApp,
  TEvent,
  TContext,
  TCallback,
  TResponse,
  TReturn,
> {
  //#region Constructor

  /**
   * Default constructor
   */
  private constructor(app: TApp) {
    this.app = app;
  }

  //#endregion

  //#region Protected Properties

  /**
   * The instance of the app (express, hapi, koa, etc...)
   */
  protected app: TApp;

  //#endregion

  //#region Protected Properties

  /**
   * Settings for whether the response should be treated as binary or not
   *
   * @defaultValue `contentEncodings` and `contentTypes` are set with {@link DEFAULT_BINARY_ENCODINGS} and {@link DEFAULT_BINARY_CONTENT_TYPES}, respectively.
   */
  protected binarySettings: BinarySettings = {
    contentEncodings: DEFAULT_BINARY_ENCODINGS,
    contentTypes: DEFAULT_BINARY_CONTENT_TYPES,
  };

  /**
   * Indicates whether the error stack should be included in the response or not
   *
   * @remarks These errors will only be included when an error occurs while forwarding the event to the framework
   * @defaultValue True when NODE_ENV is equal to `development`
   */
  protected respondWithErrors: boolean = process.env.NODE_ENV === 'development';

  /**
   * The instance of the logger service
   */
  protected log: ILogger = createDefaultLogger();

  /**
   * The list of adapters used to handle an event's request and response
   */
  protected adapters: AdapterContract<TEvent, TContext, TResponse>[] = [];

  /**
   * The framework that will process requests
   */
  protected framework?: FrameworkContract<TApp>;

  /**
   * The resolver that aims to resolve the response to serverless and stop its execution when the request ends
   */
  protected resolver?: ResolverContract<
    TEvent,
    TContext,
    TCallback,
    TResponse,
    TReturn
  >;

  /**
   * The handler that will get the event, context and callback and pass it to the adapter and framework
   */
  protected handler?: HandlerContract<
    TApp,
    TEvent,
    TContext,
    TCallback,
    TResponse,
    TReturn
  >;

  //#endregion

  //#region Static Methods

  /**
   * Creates a new instance of the builder with app (express, hapi, koa, etc...)
   *
   * @param app - The instance of the app
   */
  public static new<
    TApp,
    TEvent,
    TContext = any,
    TCallback = any,
    TResponse = any,
    TReturn = any,
  >(
    app: TApp,
  ): ServerlessAdapter<TApp, TEvent, TContext, TCallback, TResponse, TReturn> {
    return new ServerlessAdapter(app);
  }

  //#endregion

  //#region Builder Methods

  /**
   * Defines the handler that will get the event, context and callback and pass it to the adapter and framework
   *
   * @param handler - The implementation of the handler contract
   */
  public setHandler(
    handler: HandlerContract<
      TApp,
      TEvent,
      TContext,
      TCallback,
      TResponse,
      TReturn
    >,
  ): Omit<this, 'setHandler'> {
    if (this.handler)
      throw new Error('SERVERLESS_ADAPTER: The handler should not set twice.');

    this.handler = handler;

    return this;
  }

  /**
   * Defines the resolver that aims to resolve the response to serverless and stop its execution when the request ends
   *
   * @param resolver - The implementation of the resolver contract
   */
  public setResolver(
    resolver: ResolverContract<TEvent, TContext, TCallback, TResponse, TReturn>,
  ): Omit<this, 'setResolver'> {
    if (this.resolver)
      throw new Error('SERVERLESS_ADAPTER: The resolver should not set twice.');

    this.resolver = resolver;

    return this;
  }

  /**
   * Defines the framework that will process requests
   *
   * @param framework - The implementation of the framework contract
   */
  public setFramework(
    framework: FrameworkContract<TApp>,
  ): Omit<this, 'setFramework'> {
    if (this.framework) {
      throw new Error(
        'SERVERLESS_ADAPTER: The framework should not set twice.',
      );
    }

    this.framework = framework;

    return this;
  }

  /**
   * Defines the logger service used during the execution of the handler
   *
   * @param logger - The implementation of the logger
   */
  public setLogger(logger: ILogger): Omit<this, 'setLogger'> {
    this.log = logger;

    return this;
  }

  /**
   * Defines the binary settings for whether the response should be treated as binary or not
   *
   * @param binarySettings - The binary settings
   */
  public setBinarySettings(
    binarySettings: BinarySettings,
  ): Omit<this, 'setBinarySettings'> {
    this.binarySettings = {
      ...this.binarySettings,
      ...binarySettings,
    };

    return this;
  }

  /**
   * Defines the responseWithErrors, a property that indicates whether the error stack should be included in the response or not
   *
   * @param respondWithErrors - Should include or not the errors in response
   */
  public setRespondWithErrors(
    respondWithErrors: boolean,
  ): Omit<this, 'setRespondWithErrors'> {
    this.respondWithErrors = respondWithErrors;

    return this;
  }

  /**
   * Add an adapter to the adapters list to handle the event coming from any serverless event source
   *
   * @param adapter - The implementation of the adapter contract
   */
  public addAdapter(
    adapter: AdapterContract<TEvent, TContext, TResponse>,
  ): Pick<this, 'addAdapter' | 'build'> {
    this.adapters.push(adapter);

    return this;
  }

  /**
   * The builder method that returns the handler function to be exported for serverless consumption
   */
  public build(): ServerlessHandler<TReturn> {
    if (!this.resolver) {
      throw new Error(
        'SERVERLESS_ADAPTER: Is required to set a resolver before build.',
      );
    }

    if (!this.framework) {
      throw new Error(
        'SERVERLESS_ADAPTER: Is required to set a framework before build.',
      );
    }

    if (!this.handler) {
      throw new Error(
        'SERVERLESS_ADAPTER: Is required to set a handler before build.',
      );
    }

    if (this.adapters.length === 0) {
      throw new Error(
        'SERVERLESS_ADAPTER: Is required to set at least one adapter.',
      );
    }

    return this.handler.getHandler(
      this.app,
      this.framework,
      this.adapters,
      this.resolver,
      this.binarySettings,
      this.respondWithErrors,
      this.log,
    );
  }

  //#endregion
}
