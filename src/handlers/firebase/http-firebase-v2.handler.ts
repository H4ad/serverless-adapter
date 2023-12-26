//#region Imports

import { IncomingMessage, ServerResponse } from 'node:http';
// eslint-disable-next-line import/no-unresolved
import { https } from 'firebase-functions/v2';
import type { FrameworkContract, HandlerContract } from '../../contracts';
import { RawRequest } from '../base';

//#endregion

/**
 * The HTTP handler that is exposed when you use {@link HttpFirebaseV2Handler}.
 *
 * @breadcrumb Handlers / HttpFirebaseHandler
 * @public
 */
export type FirebaseHttpHandler = (
  request: IncomingMessage,
  response: ServerResponse,
) => void | Promise<void>;

/**
 * The class that implements a handler for Firebase Https Events
 *
 * @remarks Read more about Https Events {@link https://firebase.google.com/docs/functions/http-events | here}
 *
 * @breadcrumb Handlers / HttpFirebaseHandler
 * @public
 */
export class HttpFirebaseV2Handler<TApp>
  extends RawRequest<TApp>
  implements
    HandlerContract<TApp, never, never, never, void, void | Promise<void>>
{
  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(protected readonly options?: https.HttpsOptions) {
    super();
  }

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
  ): FirebaseHttpHandler {
    if (this.options) {
      return this.onRequestWithOptions(
        this.options,
        this.onRequestCallback(app, framework),
      );
    }

    return https.onRequest(
      this.onRequestCallback(app, framework),
    ) as unknown as FirebaseHttpHandler;
  }

  //#endregion

  //#region Protected Method

  /**
   * Wrapper method around onRequest for better testability
   */
  protected onRequestWithOptions(
    options: https.HttpsOptions,
    callback: ReturnType<HttpFirebaseV2Handler<TApp>['onRequestCallback']>,
  ): FirebaseHttpHandler {
    return https.onRequest(options, callback) as unknown as FirebaseHttpHandler;
  }

  //#endregion
}
