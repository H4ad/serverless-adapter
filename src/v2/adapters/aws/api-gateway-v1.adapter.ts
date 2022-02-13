//#region Imports

import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../contracts';
import {
  getEventBodyAsBuffer,
  getFlattenedHeadersMap,
  getMultiValueHeadersMap,
  getPathWithQueryStringParams,
} from '../../core';

//#endregion

/**
 * The adapter to handle requests from AWS Api Gateway V1
 *
 * As per {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html know issues}, we throw an exception when you send the `transfer-encoding=chunked`, currently, API Gateway doesn't support chunked transfer.
 *
 * @note This adapter is not fully compatible with @vendia/serverless-express, on @vendia they filter `transfer-encoding=chunked` but we throw an exception.
 *
 * @example```typescript
 * const stripBasePath = '/any/custom/base/path'; // default ''
 * const adapter = new ApiGatewayV1Adapter(stripBasePath);
 * ```
 *
 * {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html Event Reference}
 */
export class ApiGatewayV1Adapter
  implements
    AdapterContract<APIGatewayProxyEvent, Context, APIGatewayProxyResult>
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
    return ApiGatewayV1Adapter.name;
  }

  /**
   * @inheritDoc
   */
  public canHandle(event: unknown): event is APIGatewayProxyEvent {
    const apiGatewayEvent = event as Partial<APIGatewayProxyEvent> & {
      version?: string;
    };

    return !!(
      apiGatewayEvent?.requestContext && apiGatewayEvent.version === '1.0'
    );
  }

  /**
   * @inheritDoc
   */
  public getRequest(event: APIGatewayProxyEvent): AdapterRequest {
    const method = event.httpMethod;
    const path = this.getPathFromEvent(event);

    const headers = event.multiValueHeaders
      ? getFlattenedHeadersMap(event.multiValueHeaders, ',', true)
      : event.headers || {};

    let body: Buffer | undefined;

    if (event.body) {
      const [bufferBody, contentLength] = getEventBodyAsBuffer(
        event.body,
        event.isBase64Encoded
      );

      body = bufferBody;
      headers['content-length'] = String(contentLength);
    }

    const remoteAddress =
      (event &&
        event.requestContext &&
        event.requestContext.identity &&
        event.requestContext.identity.sourceIp) ||
      '';

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
  }: GetResponseAdapterProps<APIGatewayProxyEvent>): APIGatewayProxyResult {
    const multiValueHeaders = getMultiValueHeadersMap(responseHeaders);

    const transferEncodingHeader: string[] =
      multiValueHeaders['transfer-encoding'];

    if (
      (transferEncodingHeader && transferEncodingHeader.includes('chunked')) ||
      response?.chunkedEncoding
    ) {
      throw new Error('chunked encoding is not supported by API Gateway');
    }

    return {
      statusCode,
      body,
      multiValueHeaders,
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
  }: OnErrorProps<APIGatewayProxyEvent, APIGatewayProxyResult>): void {
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
  protected getPathFromEvent(event: APIGatewayProxyEvent): string {
    // NOTE: Strip base path for custom domains
    const replaceRegex = new RegExp(`^${this.stripBasePath}`);
    const path = event.path.replace(replaceRegex, '');

    const queryParams = event.multiValueQueryStringParameters;

    return getPathWithQueryStringParams(path, queryParams || {});
  }

  //#endregion
}
