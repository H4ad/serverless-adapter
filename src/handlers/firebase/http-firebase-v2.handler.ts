//#region Imports

import { IncomingMessage, ServerResponse } from 'node:http';
import { https } from 'firebase-functions/v2';
import type {
  FrameworkContract,
  HandlerContract,
  NetworkContract,
} from '../../contracts';
import { DEFAULT_NETWORK } from '../../network';
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
    _adapters?: unknown,
    _resolverFactory?: unknown,
    _binarySettings?: unknown,
    _respondWithErrors?: unknown,
    _log?: unknown,
    network: Pick<NetworkContract, 'createRequest'> = DEFAULT_NETWORK,
  ): FirebaseHttpHandler {
    if (this.options) {
      return this.onRequestWithOptions(
        this.options,
        this.onRequestCallback(app, framework, network),
      );
    }

    return https.onRequest(
      this.onRequestCallback(app, framework, network),
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
