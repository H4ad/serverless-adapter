//#region Imports

import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../contracts';
import {
  getEventBodyAsBuffer,
  getFlattenedHeadersMap,
  getPathWithQueryStringParams,
} from '../../core';

//#endregion

/**
 * The adapter to handle requests from AWS Api Gateway V2
 *
 * As per {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html know issues}, we throw an exception when you send the `transfer-encoding=chunked`, currently, API Gateway doesn't support chunked transfer.
 *
 * @example```typescript
 * const stripBasePath = '/any/custom/base/path'; // default ''
 * const adapter = new ApiGatewayV2Adapter(stripBasePath);
 * ```
 *
 * {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html Event Reference}
 */
export class ApiGatewayV2Adapter
  implements
    AdapterContract<
      APIGatewayProxyEventV2,
      Context,
      APIGatewayProxyStructuredResultV2
    >
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param stripBasePath Strip base path for custom domains
   */
  constructor(protected readonly stripBasePath: string = '') {}

  //#endregion

  //#region Public Methods

  /**
   * @inheritDoc
   */
  public getAdapterName(): string {
    return ApiGatewayV2Adapter.name;
  }

  /**
   * @inheritDoc
   */
  public canHandle(event: unknown): event is APIGatewayProxyEventV2 {
    const apiGatewayEvent = event as Partial<APIGatewayProxyEventV2> & {
      version?: string;
    };

    return !!(
      apiGatewayEvent?.requestContext && apiGatewayEvent.version === '2.0'
    );
  }

  /**
   * @inheritDoc
   */
  public getRequest(event: APIGatewayProxyEventV2): AdapterRequest {
    const method = event.requestContext.http.method;
    const path = this.getPathFromEvent(event);

    const headers = getFlattenedHeadersMap(event.headers, ',', true);

    if (event.cookies) {
      headers.cookie = event.cookies.join('; ');
    }

    let body: Buffer | undefined;

    if (event.body) {
      const [bufferBody, contentLength] = getEventBodyAsBuffer(
        event.body,
        event.isBase64Encoded
      );

      body = bufferBody;
      headers['content-length'] = String(contentLength);
    }

    const remoteAddress = event.requestContext.http.sourceIp;

    return {
      method,
      headers,
      body,
      remoteAddress,
      path,
    };
  }

  /**
   * @inheritDoc
   */
  public getResponse({
    headers: responseHeaders,
    body,
    isBase64Encoded,
    statusCode,
    response,
  }: GetResponseAdapterProps<APIGatewayProxyEventV2>): APIGatewayProxyStructuredResultV2 {
    const headers = getFlattenedHeadersMap(responseHeaders);

    if (
      headers['transfer-encoding'] === 'chunked' ||
      response?.chunkedEncoding
    ) {
      throw new Error('chunked encoding is not supported by API Gateway');
    }

    const cookies = headers['set-cookie'];

    if (cookies) {
      headers.cookies = cookies;

      delete headers['set-cookie'];
    }

    return {
      statusCode,
      body,
      headers,
      isBase64Encoded,
    };
  }

  /**
   * @inheritDoc
   */
  public onErrorWhileForwarding({
    error,
    resolver,
    respondWithErrors,
    event,
    log,
  }: OnErrorProps<
    APIGatewayProxyEventV2,
    APIGatewayProxyStructuredResultV2
  >): void {
    const body = respondWithErrors ? error.stack : '';
    const errorResponse = this.getResponse({
      event,
      statusCode: 500,
      body: body || '',
      headers: {},
      isBase64Encoded: false,
      log,
    });

    resolver.succeed(errorResponse);
  }

  //#endregion

  //#region Protected Methods

  /**
   * Get path from event with query strings
   *
   * @param event The event sent by serverless
   */
  protected getPathFromEvent(event: APIGatewayProxyEventV2): string {
    // NOTE: Strip base path for custom domains
    const replaceRegex = new RegExp(`^${this.stripBasePath}`);
    const path = event.rawPath.replace(replaceRegex, '');

    const queryParams = event.rawQueryString;

    return getPathWithQueryStringParams(path, queryParams || {});
  }

  //#endregion
}
