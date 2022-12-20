//#region Imports

import type { Context, SQSBatchItemFailure } from 'aws-lambda';
import {
  AdapterContract,
  AdapterRequest,
  GetResponseAdapterProps,
  OnErrorProps,
} from '../../../contracts/index';
import {
  EmptyResponse,
  IEmptyResponse,
  getEventBodyAsBuffer,
} from '../../../core/index';

//#endregion

/**
 * The options to customize the {@link AwsSimpleAdapter}
 *
 * @breadcrumb Adapters / AWS / AWS Simple Adapter
 * @public
 */
export interface AWSSimpleAdapterOptions {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   */
  forwardPath: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   */
  forwardMethod: string;

  /**
   * The AWS Service host that will be injected inside headers to developer being able to validate if request originate from the library.
   */
  host: string;

  /**
   * Tells if this adapter should support batch item failures.
   */
  batch?: true | false;
}

/**
 * The batch item failure response expected from the API server
 *
 * @breadcrumb Adapters / AWS / AWS Simple Adapter
 * @public
 */
export type BatchItemFailureResponse = SQSBatchItemFailure;

/**
 * The possible options of response for {@link AwsSimpleAdapter}
 *
 * @breadcrumb Adapters / AWS / AWS Simple Adapter
 * @public
 */
export type AWSSimpleAdapterResponseType =
  | BatchItemFailureResponse
  | IEmptyResponse;

/**
 * The abstract adapter to use to implement other simple AWS adapters
 *
 * @breadcrumb Adapters / AWS / AWS Simple Adapter
 * @public
 */
export abstract class AwsSimpleAdapter<TEvent>
  implements AdapterContract<TEvent, Context, AWSSimpleAdapterResponseType>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link AwsSimpleAdapter}
   */
  constructor(protected readonly options: AWSSimpleAdapterOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    throw new Error('not implemented.');
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is TEvent {
    throw new Error('not implemented.');
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: TEvent): AdapterRequest {
    const path = this.options.forwardPath;
    const method = this.options.forwardMethod;

    const [body, contentLength] = getEventBodyAsBuffer(
      JSON.stringify(event),
      false,
    );

    const headers = {
      host: this.options.host,
      'content-type': 'application/json',
      'content-length': String(contentLength),
    };

    return {
      method,
      headers,
      body,
      path,
    };
  }

  /**
   * {@inheritDoc}
   */
  public getResponse({
    body,
    headers,
    isBase64Encoded,
    event,
    statusCode,
  }: GetResponseAdapterProps<TEvent>): AWSSimpleAdapterResponseType {
    if (this.hasInvalidStatusCode(statusCode)) {
      throw new Error(
        JSON.stringify({ body, headers, isBase64Encoded, event, statusCode }),
      );
    }

    if (!this.options.batch) return EmptyResponse;

    if (isBase64Encoded) {
      throw new Error(
        'SERVERLESS_ADAPTER: The response could not be base64 encoded when you set batch: true, the response should be a JSON.',
      );
    }

    if (!body) return EmptyResponse;

    return JSON.parse(body);
  }

  /**
   * {@inheritDoc}
   */
  public onErrorWhileForwarding({
    error,
    delegatedResolver,
  }: OnErrorProps<TEvent, AWSSimpleAdapterResponseType>): void {
    delegatedResolver.fail(error);
  }

  //#endregion

  //#region Protected Methods

  /**
   * Check if the status code is invalid
   *
   * @param statusCode - The status code
   */
  protected hasInvalidStatusCode(statusCode: number): boolean {
    return statusCode < 200 || statusCode >= 400;
  }

  //#endregion
}
