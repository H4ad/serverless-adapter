//#region Imports

import type { CloudFrontRequest, Context } from 'aws-lambda';
import type {
  CloudFrontHeaders,
  CloudFrontResultResponse,
} from 'aws-lambda/common/cloudfront';
import type {
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
} from 'aws-lambda/trigger/cloudfront-request';
import { BothValueHeaders, SingleValueHeaders } from '../../@types';
import {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../contracts';
import {
  StripBasePathFn,
  buildStripBasePath,
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
  getPathWithQueryStringParams,
} from '../../core';
import {
  DEFAULT_LAMBDA_EDGE_DISALLOWED_HEADERS,
  DEFAULT_ORIGIN_MAX_RESPONSE_SIZE_IN_BYTES,
  DEFAULT_VIEWER_MAX_RESPONSE_SIZE_IN_BYTES,
} from './lambda-edge.adapter';

//#endregion

//#endregion

/**
 * The options to customize the {@link RequestLambdaEdgeAdapter}.
 *
 * @breadcrumb Adapters / AWS / RequestLambdaEdgeAdapter
 * @public
 */
export interface RequestLambdaEdgeAdapterOptions {
  /**
   * Strip base path for custom paths, like `/api`.
   *
   * @defaultValue ''
   */
  stripBasePath?: string;

  /**
   * The max response size in bytes of viewer request and viewer response.
   *
   * {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html | Reference}
   *
   * @defaultValue {@link DEFAULT_VIEWER_MAX_RESPONSE_SIZE_IN_BYTES}
   */
  viewerMaxResponseSizeInBytes?: number;

  /**
   * The max response size in bytes of origin request and origin response.
   *
   * {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html | Reference}
   *
   * @defaultValue {@link DEFAULT_ORIGIN_MAX_RESPONSE_SIZE_IN_BYTES}
   */
  originMaxResponseSizeInBytes?: number;

  /**
   * The function called when the response size exceed the max limits of the Lambda\@edge
   *
   * @param response - The response from framework that exceed the limit of Lambda\@edge
   * @defaultValue undefined
   */
  onResponseSizeExceedLimit?: (
    response: CloudFrontRequestResult,
  ) => CloudFrontRequestResult;

  /**
   * The headers that will be stripped from the headers object because Lambda\@edge will fail if these headers are passed in the response.
   *
   * @remarks All headers will be compared with other headers using toLowerCase, but for the RegExp, if you modify this list, you must put the flag `/gmi` at the end of the RegExp (ex: `/(X-Amz-Cf-)(.*)/gim`)
   *
   * @defaultValue To get the full list, see {@link DEFAULT_LAMBDA_EDGE_DISALLOWED_HEADERS}.
   */
  disallowedHeaders?: (string | RegExp)[];

  /**
   * If you want to change how we check against the header if it should be stripped, you can pass a function to this property.
   *
   * @param header - The header of the response
   * @defaultValue The default method is implemented to test the header against the list {@link RequestLambdaEdgeAdapterOptions.disallowedHeaders}.
   */
  shouldStripHeader?: (header: string) => boolean;
}

/**
 * The adapter to handle requests from AWS Lambda\@Edge of the type Viewer Request.
 *
 * The idea of this Adapter is to you be able to expose your framework to the Edge, like when you build for Cloudfront.
 *
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html | Lambda edge docs}
 * {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html | Event Reference}
 *
 * @example
 * ```typescript
 * const stripBasePath = '/api'; // in case you have configure the cloudfront to forward the path /api to your lambda
 * const adapter = new RequestLambdaEdgeAdapter({ stripBasePath });
 * ```
 *
 * @breadcrumb Adapters / AWS / RequestLambdaEdgeAdapter
 * @public
 */
export class RequestLambdaEdgeAdapter
  implements
    AdapterContract<CloudFrontRequestEvent, Context, CloudFrontResultResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link RequestLambdaEdgeAdapter}
   */
  constructor(protected readonly options?: RequestLambdaEdgeAdapterOptions) {
    this.stripPathFn = buildStripBasePath(this.options?.stripBasePath);

    const disallowedHeaders = getDefaultIfUndefined(
      this.options?.disallowedHeaders,
      DEFAULT_LAMBDA_EDGE_DISALLOWED_HEADERS,
    );

    this.cachedDisallowedHeaders = disallowedHeaders.map(disallowedHeader => {
      if (disallowedHeader instanceof RegExp) return disallowedHeader;

      return new RegExp(`(${disallowedHeader})`, 'gim');
    });
  }

  //#endregion

  //#region Protected Properties

  /**
   * Strip base path function
   */
  protected readonly stripPathFn: StripBasePathFn;

  /**
   * This property is used to cache the disallowed headers in `RegExp` version, even if you provide a string in `disallowedHeader`, we will cache it in an instance of `RegExp`.
   */
  protected readonly cachedDisallowedHeaders: RegExp[];

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return RequestLambdaEdgeAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is CloudFrontRequestEvent {
    const lambdaEdgeEvent = event as Partial<CloudFrontRequestEvent>;

    if (!Array.isArray(lambdaEdgeEvent?.Records)) return false;

    const eventType = lambdaEdgeEvent.Records[0]?.cf?.config?.eventType;

    return eventType === 'viewer-request' || eventType === 'origin-request';
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: CloudFrontRequestEvent): AdapterRequest {
    const request = event.Records[0];
    const cloudFrontRequest = request.cf.request;

    const method = cloudFrontRequest.method;

    const path = this.stripPathFn(
      getPathWithQueryStringParams(
        cloudFrontRequest.uri,
        cloudFrontRequest.querystring,
      ),
    );
    const remoteAddress = cloudFrontRequest.clientIp;

    const headers =
      this.getFlattenedHeadersFromCloudfrontRequest(cloudFrontRequest);

    let body: Buffer | undefined;

    if (cloudFrontRequest.body) {
      const [buffer, contentLength] = getEventBodyAsBuffer(
        cloudFrontRequest.body.data,
        cloudFrontRequest.body.encoding === 'base64',
      );

      body = buffer;
      headers['content-length'] = contentLength.toString();
    }

    const { host } = headers;

    return {
      method,
      path,
      headers,
      body,
      remoteAddress,
      host,
      hostname: host,
    };
  }

  /**
   * {@inheritDoc}
   */
  public getResponse({
    body,
    headers: frameworkHeaders,
    isBase64Encoded,
    statusCode,
    log,
    event,
  }: GetResponseAdapterProps<CloudFrontRequestEvent>): CloudFrontResultResponse {
    const headers = this.getHeadersForCloudfrontResponse(frameworkHeaders);

    const maxSizeInBytes =
      event.Records[0].cf.config.eventType === 'origin-request'
        ? getDefaultIfUndefined(
            this.options?.originMaxResponseSizeInBytes,
            DEFAULT_ORIGIN_MAX_RESPONSE_SIZE_IN_BYTES,
          )
        : getDefaultIfUndefined(
            this.options?.viewerMaxResponseSizeInBytes,
            DEFAULT_VIEWER_MAX_RESPONSE_SIZE_IN_BYTES,
          );

    const response: CloudFrontResultResponse = {
      body,
      status: statusCode.toString(),
      bodyEncoding: isBase64Encoded ? 'base64' : 'text',
      headers,
    };

    // probably is not correctly accurate, but it's a good approximation
    const bodyLength = body.length;

    if (bodyLength <= maxSizeInBytes) return response;

    if (this.options?.onResponseSizeExceedLimit)
      this.options.onResponseSizeExceedLimit(response);
    else {
      log.error(
        `SERVERLESS_ADAPTER:LAMBDA_EDGE_ADAPTER: Max response size exceeded: ${bodyLength} of the max of ${maxSizeInBytes}.`,
      );
    }

    return response;
  }

  /**
   * {@inheritDoc}
   */
  public onErrorWhileForwarding({
    error,
    delegatedResolver,
    respondWithErrors,
    log,
    event,
  }: OnErrorProps<CloudFrontRequestEvent, CloudFrontRequestResult>): void {
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
   * Returns the headers with the flattened (non-list) values of the cloudfront request headers
   *
   * @param cloudFrontRequest - The cloudfront request
   */
  protected getFlattenedHeadersFromCloudfrontRequest(
    cloudFrontRequest: CloudFrontRequest,
  ): SingleValueHeaders {
    return Object.keys(cloudFrontRequest.headers).reduce((acc, headerKey) => {
      const headerValue = cloudFrontRequest.headers[headerKey];

      if (headerValue.length === 1) acc[headerKey] = headerValue[0].value;
      else acc[headerKey] = headerValue.map(header => header.value).join(',');

      return acc;
    }, {} as SingleValueHeaders);
  }

  /**
   * Returns headers in Cloudfront Response format.
   *
   * @param originalHeaders - The original version of the request sent by the framework
   */
  protected getHeadersForCloudfrontResponse(
    originalHeaders: BothValueHeaders,
  ): CloudFrontHeaders {
    return Object.keys(originalHeaders).reduce((acc, headerKey) => {
      if (this.shouldStripHeader(headerKey)) return acc;

      const lowercaseHeaderKey = headerKey.toLowerCase();

      if (!acc[lowercaseHeaderKey]) acc[lowercaseHeaderKey] = [];

      const headerValue = originalHeaders[headerKey];

      if (!Array.isArray(headerValue)) {
        acc[lowercaseHeaderKey].push({
          key: headerKey,
          value: headerValue || '',
        });

        return acc;
      }

      const headersArray = headerValue.map(value => ({
        key: headerKey,
        value: value,
      }));

      acc[lowercaseHeaderKey].push(...headersArray);

      return acc;
    }, {} as CloudFrontHeaders);
  }

  /**
   * Returns the information if we should remove the response header
   *
   * @param headerKey - The header that will be tested
   */
  protected shouldStripHeader(headerKey: string): boolean {
    if (this.options?.shouldStripHeader)
      return this.options.shouldStripHeader(headerKey);

    const headerKeyLowerCase = headerKey.toLowerCase();

    for (const stripHeaderIf of this.cachedDisallowedHeaders) {
      if (!stripHeaderIf.test(headerKeyLowerCase)) continue;

      return true;
    }

    return false;
  }

  //#endregion
}
