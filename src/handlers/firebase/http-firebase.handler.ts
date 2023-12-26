//#region Imports

// eslint-disable-next-line import/no-unresolved
import { type HttpsFunction, https } from 'firebase-functions/v1';
import type { FrameworkContract, HandlerContract } from '../../contracts';
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
export class HttpFirebaseHandler<TApp>
  extends RawRequest<TApp>
  implements
    HandlerContract<TApp, never, never, never, void, void | Promise<void>>
{
  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
  ): HttpsFunction {
    return https.onRequest(this.onRequestCallback(app, framework));
  }

  //#endregion
}
