//#region Imports

import type { IncomingMessage, ServerResponse } from 'http';
import type { FrameworkContract } from '../../contracts';
import { ServerlessRequest } from '../../network';
import { getEventBodyAsBuffer, getFlattenedHeadersMap } from '../../core';

//#endregion

/**
 * The class that expose some methods to be used to get raw request from Express HTTP Request
 *
 * @breadcrumb Handlers / Base / RawRequest
 * @public
 */
export abstract class RawRequest<TApp> {
  //#region Protected Methods

  /**
   * The callback to when receive some request from external source
   *
   * @param app - The instance of the app
   * @param framework - The framework for the app
   */
  protected onRequestCallback(
    app: TApp,
    framework: FrameworkContract<TApp>,
  ): (req: IncomingMessage, res: ServerResponse) => void | Promise<void> {
    return (request: IncomingMessage, response: ServerResponse) => {
      const customRequest = this.getRequestFromExpressRequest(request);

      return framework.sendRequest(app, customRequest, response);
    };
  }

  /**
   * Not sure why they think using Express instance with prebuilt middlewares was a good idea, but Firebase/GCP
   * decides to use `Express` and `body-parser` by default, so you don't get a raw request, instead, you get a modified version by
   * Express and also with the body parsed by `body-parser`.
   * If you use NestJS or Express it's awesome, but for the rest of the frameworks it's terrible!
   * That's why I have this method, just to try and create a raw request to be used and passed to the frameworks so they can handle the request
   * as if they received the request from the native http module.
   *
   * @param request - The Express request
   */
  protected getRequestFromExpressRequest(
    request: IncomingMessage,
  ): ServerlessRequest {
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

    return new ServerlessRequest({
      method: request.method!,
      url: request.url!,
      body,
      headers,
      remoteAddress,
    });
  }

  //#endregion
}
