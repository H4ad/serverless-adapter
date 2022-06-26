//#region

import { ServerResponse } from 'http';
import { HttpKernel, HttpResponse, RequestBuilder } from '@deepkit/http';
import { FrameworkContract } from '../../contracts';
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

    if (request.body) requestBuilder = requestBuilder.body(request.body);

    const httpRequest = requestBuilder.build();
    const httpResponse = Object.assign(
      new HttpResponse({ method: httpRequest.getMethod() } as any),
      response,
    );

    app.handleRequest(httpRequest, httpResponse);
  }
}
