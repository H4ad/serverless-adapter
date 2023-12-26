//#region Imports

import type { SQSEvent } from 'aws-lambda';
import { getDefaultIfUndefined } from '../../core';
import { type AWSSimpleAdapterOptions, AwsSimpleAdapter } from './base/index';

//#endregion

/**
 * The options to customize the {@link SQSAdapter}
 *
 * @breadcrumb Adapters / AWS / SQSAdapter
 * @public
 */
export interface SQSAdapterOptions
  extends Pick<AWSSimpleAdapterOptions, 'batch'> {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue /sqs
   */
  sqsForwardPath?: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue POST
   */
  sqsForwardMethod?: string;
}

/**
 * The adapter to handle requests from AWS SQS.
 *
 * The option of `responseWithErrors` is ignored by this adapter and we always call `resolver.fail` with the error.
 *
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html | Event Reference}
 *
 * @example
 * ```typescript
 * const sqsForwardPath = '/your/route/sqs'; // default /sqs
 * const sqsForwardMethod = 'POST'; // default POST
 * const adapter = new SQSAdapter({ sqsForwardPath, sqsForwardMethod });
 * ```
 *
 * @breadcrumb Adapters / AWS / SQSAdapter
 * @public
 */
export class SQSAdapter extends AwsSimpleAdapter<SQSEvent> {
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link SNSAdapter}
   */
  constructor(options?: SQSAdapterOptions) {
    super({
      forwardPath: getDefaultIfUndefined(options?.sqsForwardPath, '/sqs'),
      forwardMethod: getDefaultIfUndefined(options?.sqsForwardMethod, 'POST'),
      batch: options?.batch,
      host: 'sqs.amazonaws.com',
    });
  }

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public override getAdapterName(): string {
    return SQSAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public override canHandle(event: unknown): event is SQSEvent {
    const sqsEvent = event as Partial<SQSEvent>;

    if (!Array.isArray(sqsEvent?.Records)) return false;

    const eventSource = sqsEvent.Records[0]?.eventSource;

    return eventSource === 'aws:sqs';
  }

  //#endregion
}
