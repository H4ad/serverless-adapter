//#region Imports

import { IncomingMessage, ServerResponse } from 'http';
import { FrameworkContract } from '../../contracts';
import { ILogger, createDefaultLogger } from '../../core';

//#endregion

/**
 * The framework that asynchronously instantiates your application and forwards the request to the framework as quickly as possible.
 *
 * @example
 * ```typescript
 * import express from 'express';
 * import { ServerlessAdapter } from '@h4ad/serverless-adapter';
 * import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
 * import { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';
 *
 * const expressFramework = new ExpressFramework();
 * const factory = async () => {
 *   const app = express();
 *
 *   // do some asynchronous stuffs like create the database;
 *   await new Promise(resolve => setTimeout(resolve, 100);
 *
 *   return app;
 * };
 * const framework = new LazyFramework(expressFramework, factory);
 *
 * export const handler = ServerlessAdapter.new(null)
 *   .setFramework(framework)
 *   // set other configurations and then build
 *   .build();
 * ```
 *
 * @breadcumb Frameworks / LazyFramework
 * @public
 */
export class LazyFramework<TApp> implements FrameworkContract<null> {
  //#region Constructor

  /**
   * Default Constructor
   */
  constructor(
    protected readonly framework: FrameworkContract<TApp>,
    protected readonly factory: () => Promise<TApp>,
    protected readonly logger: ILogger = createDefaultLogger(),
  ) {
    this.delayedFactory = Promise.resolve()
      .then(() => factory())
      .then(app => {
        this.cachedApp = app;
      })
      .catch((error: Error) => {
        // deal with the error only when receive some request
        // to be able to return some message to user
        this.logger.error(
          'SERVERLESS_ADAPTER:LAZY_FRAMEWORK: An error occours during the creation of your app.',
        );
        this.logger.error(error);
      });
  }

  //#endregion

  //#region Protected Properties

  /**
   * The cached version of the app
   */
  protected cachedApp?: TApp;

  /**
   * The delayed factory to create an instance of the app
   */
  protected readonly delayedFactory: Promise<void>;

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: null,
    request: IncomingMessage,
    response: ServerResponse,
  ): void {
    if (this.cachedApp)
      return this.framework.sendRequest(this.cachedApp, request, response);

    this.delayedFactory.then(() => {
      if (!this.cachedApp) {
        return response.emit(
          'error',
          new Error(
            'SERVERLESS_ADAPTER:LAZY_FRAMEWORK: The instance of the app returned by the factory is not valid, see the logs to learn more.',
          ),
        );
      }

      return this.framework.sendRequest(this.cachedApp, request, response);
    });
  }

  //#endregion
}
