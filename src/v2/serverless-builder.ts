//#region Imports

import { BinarySettings } from './@types';
import {
  AdapterContract,
  FrameworkContract,
  HandlerContract,
  ResolverContract,
  ServerlessHandler,
} from './contracts';
import { DEFAULT_BINARY_ENCODINGS, ILogger, createDefaultLogger } from './core';

//#endregion

/**
 * The class used to build the serverless handler.
 *
 * @example```typescript
 * const app = express();
 * export const handler = ServerlessBuilder.new(app)
 *   .setFramework(new ExpressFramework())
 *   .setHandler(new DefaultHandler())
 *   .setResolver(new PromiseResolver())
 *   .setRespondWithErrors(true)
 *   .addAdapter(new AlbAdapter())
 *   .addAdapter(new SQSAdapter())
 *   .addAdapter(new SNSAdapter())
 *   .build();
 * ```
 */
export class ServerlessBuilder<
  TApp = any,
  TEvent = any,
  TContext = any,
  TCallback = any,
  TResponse = any,
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
   * @default `contentEncodings` and `contentTypes` are set with {@link DEFAULT_BINARY_ENCODINGS} and {@link DEFAULT_BINARY_ENCODINGS}, respectively.
   */
  protected binarySettings: BinarySettings = {
    contentEncodings: DEFAULT_BINARY_ENCODINGS,
    contentTypes: DEFAULT_BINARY_ENCODINGS,
  };

  /**
   * Indicates whether the error stack should be included in the response or not
   *
   * @note These errors will only be included when an error occurs while forwarding the event to the framework
   * @default True when NODE_ENV is equal to `development`
   */
  protected respondWithErrors: boolean = process.env.NODE_ENV === 'development';

  /**
   * The instance of the logger service
   */
  protected log: ILogger = createDefaultLogger();

  /**
   * The list of adapters used to handle an event's request and response
   */
  protected adapters: AdapterContract<TEvent, TContext>[] = [];

  /**
   * The framework that will process requests
   */
  protected framework?: FrameworkContract<TApp>;

  /**
   * The resolver that aims to resolve the response to serverless and stop its execution when the request ends
   */
  protected resolver?: ResolverContract;

  /**
   * The handler that will get the event, context and callback and pass it to the adapter and framework
   */
  protected handler?: HandlerContract<
    TApp,
    TEvent,
    TContext,
    TCallback,
    TResponse
  >;

  //#endregion

  //#region Static Methods

  /**
   * Creates a new instance of the builder with app (express, hapi, koa, etc...)
   *
   * @param app The instance of the app
   */
  public static new<TApp>(app: TApp): Omit<ServerlessBuilder, 'new'> {
    return new ServerlessBuilder(app);
  }

  //#endregion

  //#region Builder Methods

  /**
   * Defines the handler that will get the event, context and callback and pass it to the adapter and framework
   *
   * @param handler The implementation of the handler contract
   */
  public setHandler(
    handler: HandlerContract<TApp, TEvent, TContext, TCallback, TResponse>,
  ): Omit<this, 'setHandler'> {
    this.handler = handler;

    return this;
  }

  /**
   * Defines the resolver that aims to resolve the response to serverless and stop its execution when the request ends
   *
   * @param resolver The implementation of the resolver contract
   */
  public setResolver(resolver: ResolverContract): Omit<this, 'setResolver'> {
    this.resolver = resolver;

    return this;
  }

  /**
   * Defines the framework that will process requests
   *
   * @param framework The implementation of the framework contract
   */
  public setFramework(
    framework: FrameworkContract<TApp>,
  ): Omit<this, 'setFramework'> {
    this.framework = framework;

    return this;
  }

  /**
   * Defines the logger service used during the execution of the handler
   *
   * @param logger The implementation of the logger
   */
  public setLogger(logger: ILogger): Omit<this, 'setLogger'> {
    this.log = logger;

    return this;
  }

  /**
   * Defines the binary settings for whether the response should be treated as binary or not
   *
   * @param binarySettings The binary settings
   */
  public setBinarySettings(
    binarySettings: BinarySettings,
  ): Omit<this, 'setBinarySettings'> {
    this.binarySettings = binarySettings;

    return this;
  }

  /**
   * Defines the responseWithErrors, a property that indicates whether the error stack should be included in the response or not
   *
   * @param respondWithErrors Should include or not the errors in response
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
   * @param adapter The implementation of the adapter contract
   */
  public addAdapter(adapter: AdapterContract<TEvent, TContext>): this {
    this.adapters.push(adapter);

    return this;
  }

  /**
   * The builder method that returns the handler function to be exported for serverless consumption
   */
  public build(): ServerlessHandler {
    if (!this.resolver) {
      throw new Error(
        'SERVERLESS_ADAPTER: Is required to set a resolver before build the handler.',
      );
    }

    if (!this.framework) {
      throw new Error(
        'SERVERLESS_ADAPTER: Is required to set a framework before build the handler.',
      );
    }

    if (!this.handler) {
      throw new Error(
        'SERVERLESS_ADAPTER: Is required to set a framework before build the handler.',
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
