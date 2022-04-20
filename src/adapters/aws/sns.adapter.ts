//#region Imports

import type { Context, SNSEvent } from 'aws-lambda';
import { AdapterContract, AdapterRequest, OnErrorProps } from '../../contracts';
import {
  EmptyResponse,
  IEmptyResponse,
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
} from '../../core';

//#endregion

/**
 * The options to customize the {@link SNSAdapter}
 *
 * @breadcumb Adapters / AWS / SNSAdapter
 * @public
 */
export interface SNSAdapterOptions {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue /sns
   */
  snsForwardPath?: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue POST
   */
  snsForwardMethod?: string;
}

/**
 * The adapter to handle requests from AWS SNS.
 *
 * The option of `responseWithErrors` is ignored by this adapter and we always call `resolver.fail` with the error.
 *
 * {@link https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sns.html | Event Reference}
 *
 * @example
 * ```typescript
 * const snsForwardPath = '/your/route/sns'; // default /sns
 * const snsForwardMethod = 'POST'; // default POST
 * const adapter = new SNSAdapter({ snsForwardPath, snsForwardMethod });
 * ```
 *
 * @breadcumb Adapters / AWS / SNSAdapter
 * @public
 */
export class SNSAdapter
  implements AdapterContract<SNSEvent, Context, IEmptyResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link SNSAdapter}
   */
  constructor(protected readonly options?: SNSAdapterOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return SNSAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is SNSEvent {
    const snsEvent = event as Partial<SNSEvent>;

    if (!Array.isArray(snsEvent?.Records)) return false;

    const eventSource = snsEvent.Records[0]?.EventSource;

    return eventSource === 'aws:sns';
  }

  /**
   * {@inheritDoc}
   */
  public getRequest(event: SNSEvent): AdapterRequest {
    const path = getDefaultIfUndefined(this.options?.snsForwardPath, '/sns');
    const method = getDefaultIfUndefined(
      this.options?.snsForwardMethod,
      'POST',
    );

    const [body, contentLength] = getEventBodyAsBuffer(
      JSON.stringify(event),
      false,
    );

    const headers = {
      host: 'sns.amazonaws.com',
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
  public getResponse(): IEmptyResponse {
    return EmptyResponse;
  }

  /**
   * {@inheritDoc}
   */
  public onErrorWhileForwarding({
    error,
    delegatedResolver,
  }: OnErrorProps<SNSEvent, IEmptyResponse>): void {
    delegatedResolver.fail(error);
  }

  //#endregion
}
