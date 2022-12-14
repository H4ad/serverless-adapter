//#region Imports

import { IncomingMessage, ServerResponse } from 'http';
import { https } from 'firebase-functions';
import { FrameworkContract, HandlerContract } from '../../contracts';
import { getEventBodyAsBuffer, getFlattenedHeadersMap } from '../../core';
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
        const expressRequestParsed = request as unknown as {
          body: object | Buffer;
        };

        const headers = getFlattenedHeadersMap(request.headers, ',', true);
        const remoteAddress = headers['x-forwarded-for'];

        let body: Buffer | undefined;

        if (
          expressRequestParsed.body &&
          typeof expressRequestParsed.body === 'object'
        ) {
          const jsonContent = JSON.stringify(expressRequestParsed.body);

          const [bufferBody, contentLength] = getEventBodyAsBuffer(
            jsonContent,
            false,
          );

          body = bufferBody;
          headers['content-length'] = String(contentLength);
        }

        const customRequest = new ServerlessRequest({
          method: request.method!,
          url: request.url!,
          body,
          headers,
          remoteAddress,
        });

        return framework.sendRequest(app, customRequest, response);
      },
    );
  }

  //#endregion
}
