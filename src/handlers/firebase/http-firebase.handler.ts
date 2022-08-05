//#region Imports

import { IncomingMessage, ServerResponse } from 'http';
import { https } from 'firebase-functions';
import { FrameworkContract, HandlerContract } from '../../contracts';
import { ServerlessRequest } from '../../network';

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
  ): (req: IncomingMessage, res: ServerResponse) => void | Promise<void> {
    return https.onRequest(
      (request: IncomingMessage, response: ServerResponse) => {
        const serverlessRequest = request as ServerlessRequest;

        if (
          serverlessRequest.body &&
          typeof serverlessRequest.body === 'object'
        ) {
          serverlessRequest.body = Buffer.from(
            JSON.stringify(serverlessRequest.body),
            'utf-8',
          );
        }

        return framework.sendRequest(app, serverlessRequest, response);
      },
    );
  }

  //#endregion
}
