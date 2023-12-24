//#region

import type { ServerResponse } from 'http';
import { HttpKernel, HttpResponse, RequestBuilder } from '@deepkit/http';
import type { FrameworkContract } from '../../contracts';
import { getFlattenedHeadersMap } from '../../core';
import { ServerlessRequest } from '../../network';

//#endregion

/**
 * The framework that forwards requests to express handler
 *
 * @breadcrumb Frameworks / HttpDeepkitFramework
 * @public
 */
export class HttpDeepkitFramework implements FrameworkContract<HttpKernel> {
  /**
   * {@inheritDoc}
   */
  public sendRequest(
    app: HttpKernel,
    request: ServerlessRequest,
    response: ServerResponse,
  ): void {
    const flattenedHeaders = getFlattenedHeadersMap(request.headers);

    let requestBuilder = new RequestBuilder(
      request.url!,
      request.method,
    ).headers(flattenedHeaders);

    if (request.body) {
      requestBuilder = Buffer.isBuffer(request.body)
        ? requestBuilder.body(request.body)
        : requestBuilder.body(Buffer.from(request.body));
    }

    const httpRequest = requestBuilder.build();

    app.handleRequest(httpRequest, response as HttpResponse);
  }
}
