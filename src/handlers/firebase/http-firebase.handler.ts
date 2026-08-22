//#region Imports

import { type HttpsFunction, https } from 'firebase-functions/v1';
import type {
  FrameworkContract,
  HandlerContract,
  NetworkContract,
} from '../../contracts';
import { DEFAULT_NETWORK } from '../../network';
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
    _adapters?: unknown,
    _resolverFactory?: unknown,
    _binarySettings?: unknown,
    _respondWithErrors?: unknown,
    _log?: unknown,
    network: Pick<NetworkContract, 'createRequest'> = DEFAULT_NETWORK,
  ): HttpsFunction {
    return https.onRequest(this.onRequestCallback(app, framework, network));
  }

  //#endregion
}
