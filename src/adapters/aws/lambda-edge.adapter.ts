//#region Imports

import type { CloudFrontRequest, Context } from 'aws-lambda';
import type {
  CloudFrontEvent,
  CloudFrontHeaders,
  CloudFrontResultResponse,
} from 'aws-lambda/common/cloudfront';
import type {
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
} from 'aws-lambda/trigger/cloudfront-request';
import type {
  BothValueHeaders,
  Concrete,
  SingleValueHeaders,
} from '../../@types';
import type {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../contracts';
import {
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
  getPathWithQueryStringParams,
} from '../../core';

//#endregion

/**
 * The type alias to indicate where we get the default value of query string to create the request.
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter
 * @public
 */
export type DefaultQueryString =
  CloudFrontRequestEvent['Records'][number]['cf']['request']['querystring'];

/**
 * The type alias to indicate where we get the default value of path to create the request.
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter
 * @public
 */
export type DefaultForwardPath =
  CloudFrontRequestEvent['Records'][number]['cf']['request']['uri'];

/**
 * Represents the body of the new version of Lambda\@edge, which uses the `body` property inside `request` as the body (library) of the request.
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter
 * @public
 */
export type NewLambdaEdgeBody =
  CloudFrontRequestEvent['Records'][number]['cf']['request']['body'];

/**
 * Represents the body of the old version of Lambda\@edge supported by \@vendia/serverless-express which returns the `data` property within `body` for the body (library) of the request.
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter
 * @public
 */
export type OldLambdaEdgeBody = Concrete<
  CloudFrontRequestEvent['Records'][number]['cf']['request']
>['body']['data'];

/**
 * The list was created based on {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html | these docs} in the "Disallowed Headers" section.
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter / Constants
 * @public
 */
export const DEFAULT_LAMBDA_EDGE_DISALLOWED_HEADERS: (string | RegExp)[] = [
  'Connection',
  'Expect',
  'Keep-Alive',
  'Proxy-Authenticate',
  'Proxy-Authorization',
  'Proxy-Connection',
  'Trailer',
  'Upgrade',
  'X-Accel-Buffering',
  'X-Accel-Charset',
  'X-Accel-Limit-Rate',
  'X-Accel-Redirect',
  /(X-Amz-Cf-)(.*)/gim,
  'X-Cache',
  /(X-Edge-)(.*)/gim,
  'X-Forwarded-Proto',
  'X-Real-IP',
];

/**
 * The default max response size in bytes of viewer request and viewer response.
 *
 * @defaultValue 1024 * 40 = 40960 = 40KB
 *
 * {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html | Reference}
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter / Constants
 * @public
 */
export const DEFAULT_VIEWER_MAX_RESPONSE_SIZE_IN_BYTES = 1024 * 40;

/**
 * The default max response size in bytes of origin request and origin response.
 *
 * @defaultValue 1024 * 1024 = 1048576 = 1MB
 *
 * {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html | Reference}
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter / Constants
 * @public
 */
export const DEFAULT_ORIGIN_MAX_RESPONSE_SIZE_IN_BYTES = 1024 * 1024;

/**
 * The options to customize the {@link LambdaEdgeAdapter}.
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter
 * @public
 */
export interface LambdaEdgeAdapterOptions {
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
   * Return the path to be used to create a request to the framework
   *
   * @remarks You MUST append the query params from {@link DefaultQueryString}, you can use the helper {@link getPathWithQueryStringParams}.
   *
   * @param event - The event sent by the serverless
   * @defaultValue The value from {@link DefaultForwardPath}
   */
  getPathFromEvent?: (
    event: CloudFrontRequestEvent['Records'][number],
  ) => string;

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
   * @defaultValue The default method is implemented to test the header against the list {@link LambdaEdgeAdapterOptions.disallowedHeaders}.
   */
  shouldStripHeader?: (header: string) => boolean;

  /**
   * By default, the {@link aws-lambda#CloudFrontRequestResult} has the `headers` property, but we also have the headers sent by the framework too.
   * So this setting tells us how to handle this case, if you pass `true` to this property, we will use the framework headers.
   * Otherwise, we will forward the body back to cloudfront without modifying or trying to set the `headers` property inside {@link aws-lambda#CloudFrontRequestResult}.
   *
   * @defaultValue false
   */
  shouldUseHeadersFromFramework?: boolean;
}

/**
 * The adapter to handle requests from AWS Lambda\@Edge.
 *
 * This adapter is not fully compatible with Lambda\@edge supported by \@vendia/serverless-express, the request body was modified to return {@link NewLambdaEdgeBody} instead {@link OldLambdaEdgeBody}.
 * Also, the response has been modified to return entire body sent by the framework, in this form you MUST return the body from the framework in the format of {@link aws-lambda#CloudFrontRequestResult}.
 * And when we get an error during the forwarding to the framework, we call `resolver.fail` instead of trying to return status 500 like the old implementation was.
 *
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html | Lambda edge docs}
 * {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html | Event Reference}
 *
 * @example
 * ```typescript
 * const getPathFromEvent = () => '/lambda/edge'; // will forward all requests to the same endpoint
 * const adapter = new LambdaEdgeAdapter({ getPathFromEvent });
 * ```
 *
 * @breadcrumb Adapters / AWS / LambdaEdgeAdapter
 * @public
 */
export class LambdaEdgeAdapter
  implements
    AdapterContract<CloudFrontRequestEvent, Context, CloudFrontRequestResult>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link LambdaEdgeAdapter}
   */
  constructor(protected readonly options?: LambdaEdgeAdapterOptions) {
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
   * This property is used to cache the disallowed headers in `RegExp` version, even if you provide a string in `disallowedHeader`, we will cache it in an instance of `RegExp`.
   */
  protected readonly cachedDisallowedHeaders: RegExp[];

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return LambdaEdgeAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is CloudFrontRequestEvent {
    const lambdaEdgeEvent = event as Partial<CloudFrontRequestEvent>;

    if (!Array.isArray(lambdaEdgeEvent?.Records)) return false;

    const eventType = lambdaEdgeEvent.Records[0]?.cf?.config?.eventType;
    const validEventTypes: CloudFrontEvent['config']['eventType'][] = [
      'origin-response',
      'origin-request',
      'viewer-response',
      'viewer-request',
    ];

    return validEventTypes.includes(eventType);
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: CloudFrontRequestEvent): AdapterRequest {
    const request = event.Records[0];
    const cloudFrontRequest = request.cf.request;

    const method = cloudFrontRequest.method;

    const pathFromOptions = this.options?.getPathFromEvent
      ? this.options.getPathFromEvent(request)
      : undefined;
    const defaultPath = getPathWithQueryStringParams(
      cloudFrontRequest.uri,
      cloudFrontRequest.querystring,
    );
    const path = getDefaultIfUndefined(pathFromOptions, defaultPath);

    const remoteAddress = cloudFrontRequest.clientIp;

    const headers =
      this.getFlattenedHeadersFromCloudfrontRequest(cloudFrontRequest);

    let body: Buffer | undefined;

    if (cloudFrontRequest.body) {
      const [buffer, contentLength] = getEventBodyAsBuffer(
        JSON.stringify(cloudFrontRequest.body),
        false,
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
  public getResponse(
    props: GetResponseAdapterProps<CloudFrontRequestEvent>,
  ): CloudFrontRequestResult {
    const response = this.getResponseToLambdaEdge(props);
    const responseToServiceBytes = new TextEncoder().encode(
      JSON.stringify(response),
    ).length;

    const isOriginRequestOrResponse = this.isEventTypeOrigin(
      props.event.Records[0].cf.config,
    );
    const maxSizeInBytes = isOriginRequestOrResponse
      ? getDefaultIfUndefined(
          this.options?.originMaxResponseSizeInBytes,
          DEFAULT_ORIGIN_MAX_RESPONSE_SIZE_IN_BYTES,
        )
      : getDefaultIfUndefined(
          this.options?.viewerMaxResponseSizeInBytes,
          DEFAULT_VIEWER_MAX_RESPONSE_SIZE_IN_BYTES,
        );

    if (responseToServiceBytes <= maxSizeInBytes) return response;

    if (this.options?.onResponseSizeExceedLimit)
      this.options.onResponseSizeExceedLimit(response);
    else {
      props.log.error(
        `SERVERLESS_ADAPTER:LAMBDA_EDGE_ADAPTER: Max response size exceeded: ${responseToServiceBytes} of the max of ${maxSizeInBytes}.`,
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
  }: OnErrorProps<CloudFrontRequestEvent, CloudFrontRequestResult>): void {
    delegatedResolver.fail(error);
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

      acc[headerKey] = headerValue.map(header => header.value).join(',');

      return acc;
    }, {} as SingleValueHeaders);
  }

  /**
   * Returns the framework response in the format required by the Lambda\@edge.
   *
   * @param body - The body of the response
   * @param frameworkHeaders - The headers from the framework
   */
  protected getResponseToLambdaEdge({
    body,
    headers: frameworkHeaders,
  }: GetResponseAdapterProps<CloudFrontRequestEvent>): CloudFrontRequestResult {
    const shouldUseHeadersFromFramework = getDefaultIfUndefined(
      this.options?.shouldUseHeadersFromFramework,
      false,
    );

    const parsedBody: CloudFrontResultResponse | CloudFrontRequest =
      JSON.parse(body);

    if (parsedBody.headers) {
      parsedBody.headers = Object.keys(parsedBody.headers).reduce(
        (acc, header) => {
          if (this.shouldStripHeader(header)) return acc;

          acc[header] = parsedBody.headers![header];

          return acc;
        },
        {} as CloudFrontHeaders,
      );
    }

    if (!shouldUseHeadersFromFramework) return parsedBody;

    parsedBody.headers = this.getHeadersForCloudfrontResponse(frameworkHeaders);

    return parsedBody;
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

      if (!acc[headerKey]) acc[headerKey] = [];

      const headerValue = originalHeaders[headerKey];

      if (!Array.isArray(headerValue)) {
        acc[headerKey].push({
          key: headerKey,
          value: headerValue || '',
        });

        return acc;
      }

      const headersArray = headerValue.map(value => ({
        key: headerKey,
        value: value,
      }));

      acc[headerKey].push(...headersArray);

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

  /**
   * Determines whether the event is from origin or is from viewer.
   *
   * @param content - The event sent by AWS or the response sent by the framework
   */
  protected isEventTypeOrigin(content: CloudFrontEvent['config']): boolean {
    return content.eventType.includes('origin');
  }

  //#endregion
}
