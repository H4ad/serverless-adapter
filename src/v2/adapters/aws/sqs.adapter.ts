//#region Imports

import { Context, SQSEvent } from 'aws-lambda';
import { AdapterContract, AdapterRequest, OnErrorProps } from '../../contracts';
import {
  EmptyResponse,
  getEventBodyAsBuffer,
  IEmptyResponse,
} from '../../core';

//#endregion

/**
 * The adapter to handle requests from AWS SQS.
 *
 * @example```typescript
 * const sqsForwardPath = '/your/route/sqs'; // default /sqs
 * const sqsForwardMethod = 'POST'; // default POST
 * const adapter = new SQSAdapter(sqsForwardPath, sqsForwardMethod);
 * ```
 *
 * {@link https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sqs.html Event Reference}
 */
export class SQSAdapter
  implements AdapterContract<SQSEvent, Context, IEmptyResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param sqsForwardPath The path that will be used to create a request to be forwarded to the framework. Default: /sqs
   * @param sqsForwardMethod The http method that will be used to create a request to be forwarded to the framework. Default: POST
   */
  constructor(
    protected readonly sqsForwardPath: string = '/sqs',
    protected readonly sqsForwardMethod: string = 'POST'
  ) {}

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

    if (!Array.isArray(sqsEvent.Records)) return false;

    const eventSource = sqsEvent.Records[0]?.eventSource;

    return eventSource === 'aws:sqs';
  }

  /**
   * @inheritDoc
   */
  public getRequest(event: SQSEvent): AdapterRequest {
    const path = this.sqsForwardPath;
    const method = this.sqsForwardMethod;
    const headers = { host: 'sqs.amazonaws.com' };
    const [body] = getEventBodyAsBuffer(JSON.stringify(event), false);

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
  }: OnErrorProps<IEmptyResponse>): void {
    resolver.fail(error);
  }

  //#endregion
}
