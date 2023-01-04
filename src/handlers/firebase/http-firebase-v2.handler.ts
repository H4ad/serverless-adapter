//#region Imports

// eslint-disable-next-line import/no-unresolved
import { https } from 'firebase-functions/v2';
import { FrameworkContract, HandlerContract } from '../../contracts';
import { RawRequest } from '../base';

//#endregion

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
  ): ReturnType<HttpFirebaseV2Handler<TApp>['onRequestCallback']> {
    if (this.options) {
      return this.onRequestWithOptions(
        this.options,
        this.onRequestCallback(app, framework),
      );
    }

    return https.onRequest(this.onRequestCallback(app, framework));
  }

  //#endregion

  //#region Protected Method

  /**
   * Wrapper method around onRequest for better testability
   */
  protected onRequestWithOptions(
    options: https.HttpsOptions,
    callback: ReturnType<HttpFirebaseV2Handler<TApp>['onRequestCallback']>,
  ): ReturnType<HttpFirebaseV2Handler<TApp>['onRequestCallback']> {
    return https.onRequest(options, callback);
  }

  //#endregion
}
