//#region Imports

import type { Context, SQSEvent } from 'aws-lambda';
import { AdapterContract, AdapterRequest, OnErrorProps } from '../../contracts';
import {
  EmptyResponse,
  IEmptyResponse,
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
} from '../../core';

//#endregion

/**
 * The options to customize the {@link SQSAdapter}
 */
export interface SQSAdapterOptions {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   *
   * @default /sqs
   */
  sqsForwardPath?: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   *
   * @default POST
   */
  sqsForwardMethod?: string;
}

/**
 * The adapter to handle requests from AWS SQS.
 *
 * The option of `responseWithErrors` is ignored by this adapter and we always call `resolver.fail` with the error.
 *
 * {@link https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sqs.html Event Reference}
 *
 * @example```typescript
 * const sqsForwardPath = '/your/route/sqs'; // default /sqs
 * const sqsForwardMethod = 'POST'; // default POST
 * const adapter = new SQSAdapter({ sqsForwardPath, sqsForwardMethod });
 * ```
 */
export class SQSAdapter
  implements AdapterContract<SQSEvent, Context, IEmptyResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options The options to customize the {@link SQSAdapter}
   */
  constructor(protected readonly options?: SQSAdapterOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * @inheritDoc
   */
  public getAdapterName(): string {
    return SQSAdapter.name;
  }

  /**
   * @inheritDoc
   */
  public canHandle(event: unknown): event is SQSEvent {
    const sqsEvent = event as Partial<SQSEvent>;

    if (!Array.isArray(sqsEvent?.Records)) return false;

    const eventSource = sqsEvent.Records[0]?.eventSource;

    return eventSource === 'aws:sqs';
  }

  /**
   * @inheritDoc
   */
  public getRequest(event: SQSEvent): AdapterRequest {
    const path = getDefaultIfUndefined(this.options?.sqsForwardPath, '/sqs');
    const method = getDefaultIfUndefined(
      this.options?.sqsForwardMethod,
      'POST',
    );

    const [body, contentLength] = getEventBodyAsBuffer(
      JSON.stringify(event),
      false,
    );

    const headers = {
      host: 'sqs.amazonaws.com',
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
   * @inheritDoc
   */
  public getResponse(): IEmptyResponse {
    return EmptyResponse;
  }

  /**
   * @inheritDoc
   */
  public onErrorWhileForwarding({
    error,
    resolver,
  }: OnErrorProps<SQSEvent, IEmptyResponse>): void {
    resolver.fail(error);
  }

  //#endregion
}
