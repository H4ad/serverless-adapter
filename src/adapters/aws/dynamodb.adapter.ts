//#region Imports

import type { DynamoDBStreamEvent } from 'aws-lambda';
import { getDefaultIfUndefined } from '../../core';
import { type AWSSimpleAdapterOptions, AwsSimpleAdapter } from './base/index';

//#endregion

/**
 * The options to customize the {@link DynamoDBAdapter}
 *
 * @breadcrumb Adapters / AWS / DynamoDBAdapter
 * @public
 */
export interface DynamoDBAdapterOptions
  extends Pick<AWSSimpleAdapterOptions, 'batch'> {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue /dynamo
   */
  dynamoDBForwardPath?: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue POST
   */
  dynamoDBForwardMethod?: string;
}

/**
 * The adapter to handle requests from AWS DynamoDB.
 *
 * The option of `responseWithErrors` is ignored by this adapter and we always call `resolver.fail` with the error.
 *
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html | Event Reference}
 *
 * @example
 * ```typescript
 * const dynamoDBForwardPath = '/your/route/dynamo'; // default /dynamo
 * const dynamoDBForwardMethod = 'POST'; // default POST
 * const adapter = new DynamoDBAdapter({ dynamoDBForwardPath, dynamoDBForwardMethod });
 * ```
 *
 * @breadcrumb Adapters / AWS / DynamoDBAdapter
 * @public
 */
export class DynamoDBAdapter extends AwsSimpleAdapter<DynamoDBStreamEvent> {
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link DynamoDBAdapter}
   */
  constructor(options?: DynamoDBAdapterOptions) {
    super({
      forwardPath: getDefaultIfUndefined(
        options?.dynamoDBForwardPath,
        '/dynamo',
      ),
      forwardMethod: getDefaultIfUndefined(
        options?.dynamoDBForwardMethod,
        'POST',
      ),
      batch: options?.batch,
      host: 'dynamodb.amazonaws.com',
    });
  }

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public override getAdapterName(): string {
    return DynamoDBAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public override canHandle(event: unknown): event is DynamoDBStreamEvent {
    const dynamoDBevent = event as Partial<DynamoDBStreamEvent>;

    if (!Array.isArray(dynamoDBevent?.Records)) return false;

    const eventSource = dynamoDBevent.Records[0]?.eventSource;

    return eventSource === 'aws:dynamodb';
  }

  //#endregion
}
