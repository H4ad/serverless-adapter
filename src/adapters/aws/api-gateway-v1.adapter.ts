//#region Imports

import type { APIGatewayProxyResult, Context } from 'aws-lambda';
import type { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../contracts';
import {
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
  getMultiValueHeadersMap,
  getPathWithQueryStringParams,
} from '../../core';

//#endregion

/**
 * The options to customize the {@link ApiGatewayV1Adapter}
 *
 * @public
 */
export interface ApiGatewayV1Options {
  /**
   * Strip base path for custom domains
   *
   * @defaultValue ''
   */
  stripBasePath?: string;
}

/**
 * The adapter to handle requests from AWS Api Gateway V1
 *
 * As per {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html | know issues}, we throw an exception when you send the `transfer-encoding=chunked`, currently, API Gateway doesn't support chunked transfer.
 *
 * @remarks This adapter is not fully compatible with \@vendia/serverless-express, on \@vendia they filter `transfer-encoding=chunked` but we throw an exception.
 *
 * @example
 * ```typescript
 * const stripBasePath = '/any/custom/base/path'; // default ''
 * const adapter = new ApiGatewayV1Adapter({ stripBasePath });
 * ```
 *
 * {@link https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html | Event Reference}
 *
 * @public
 */
export class ApiGatewayV1Adapter
  implements
    AdapterContract<APIGatewayProxyEvent, Context, APIGatewayProxyResult>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link ApiGatewayV1Adapter}
   */
  constructor(protected readonly options?: ApiGatewayV1Options) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return ApiGatewayV1Adapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is APIGatewayProxyEvent {
    const partialEventV1 = event as Partial<APIGatewayProxyEvent> & {
      version?: '2.0';
    };

    return !!(
      partialEventV1?.requestContext &&
      partialEventV1.version !== '2.0' &&
      partialEventV1.headers &&
      partialEventV1.multiValueHeaders &&
      (partialEventV1.queryStringParameters ===
        partialEventV1.multiValueQueryStringParameters ||
        (partialEventV1.queryStringParameters &&
          partialEventV1.multiValueQueryStringParameters))
    );
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: APIGatewayProxyEvent): AdapterRequest {
    const method = event.httpMethod;
    const headers = event.headers;
    const path = this.getPathFromEvent(event);

    let body: Buffer | undefined;

    if (event.body) {
      const [bufferBody, contentLength] = getEventBodyAsBuffer(
        event.body,
        event.isBase64Encoded,
      );

      body = bufferBody;
      headers['content-length'] = String(contentLength);
    }

    const remoteAddress = event.requestContext.identity.sourceIp;

    return {
      method,
      headers,
      body,
      remoteAddress,
      path,
    };
  }

  /**
   * {@inheritDoc}
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

    const hasTransferEncodingChunked =
      transferEncodingHeader &&
      transferEncodingHeader.some(value => value.includes('chunked'));

    if (hasTransferEncodingChunked) {
      throw new Error(
        'chunked encoding in headers is not supported by API Gateway V1',
      );
    }

    if (response?.chunkedEncoding) {
      throw new Error(
        'chunked encoding in response is not supported by API Gateway V1',
      );
    }

    return {
      statusCode,
      body,
      multiValueHeaders,
      isBase64Encoded,
    };
  }

  /**
   * {@inheritDoc}
   */
  public onErrorWhileForwarding({
    error,
    delegatedResolver,
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

    delegatedResolver.succeed(errorResponse);
  }

  //#endregion

  //#region Protected Methods

  /**
   * Get path from event with query strings
   *
   * @param event - The event sent by serverless
   */
  protected getPathFromEvent(event: APIGatewayProxyEvent): string {
    const stripBasePath = getDefaultIfUndefined(
      this.options?.stripBasePath,
      '',
    );
    const replaceRegex = new RegExp(`^${stripBasePath}`);
    const path = event.path.replace(replaceRegex, '');

    const queryParams = event.queryStringParameters || {};

    return getPathWithQueryStringParams(path, queryParams);
  }

  //#endregion
}
