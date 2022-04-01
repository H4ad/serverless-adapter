//#region Imports

import type { Context, DynamoDBStreamEvent } from 'aws-lambda';
import { AdapterContract, AdapterRequest, OnErrorProps } from '../../contracts';
import {
  EmptyResponse,
  IEmptyResponse,
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
} from '../../core';

//#endregion

/**
 * The options to customize the {@link DynamoDBAdapter}
 */
export interface DynamoDBAdapterOptions {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   *
   * @default /dynamo
   */
  dynamoDBForwardPath?: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   *
   * @default POST
   */
  dynamoDBForwardMethod?: string;
}

/**
 * The adapter to handle requests from AWS DynamoDB.
 *
 * The option of `responseWithErrors` is ignored by this adapter and we always call `resolver.fail` with the error.
 *
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html Event Reference}
 *
 * @example```typescript
 * const dynamoDBForwardPath = '/your/route/dynamo'; // default /dynamo
 * const dynamoDBForwardMethod = 'POST'; // default POST
 * const adapter = new DynamoDBAdapter({ dynamoDBForwardPath, dynamoDBForwardMethod });
 * ```
 */
export class DynamoDBAdapter
  implements AdapterContract<DynamoDBStreamEvent, Context, IEmptyResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options The options to customize the {@link DynamoDBAdapter}
   */
  constructor(protected readonly options?: DynamoDBAdapterOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * @inheritDoc
   */
  public getAdapterName(): string {
    return DynamoDBAdapter.name;
  }

  /**
   * @inheritDoc
   */
  public canHandle(event: unknown): event is DynamoDBStreamEvent {
    const dynamoDBevent = event as Partial<DynamoDBStreamEvent>;

    if (!Array.isArray(dynamoDBevent?.Records)) return false;

    const eventSource = dynamoDBevent.Records[0]?.eventSource;

    return eventSource === 'aws:dynamodb';
  }

  /**
   * @inheritDoc
   */
  public getRequest(event: DynamoDBStreamEvent): AdapterRequest {
    const path = getDefaultIfUndefined(
      this.options?.dynamoDBForwardPath,
      '/dynamo',
    );
    const method = getDefaultIfUndefined(
      this.options?.dynamoDBForwardMethod,
      'POST',
    );

    const [body, contentLength] = getEventBodyAsBuffer(
      JSON.stringify(event),
      false,
    );

    const headers = {
      host: 'dynamodb.amazonaws.com',
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
    delegatedResolver,
  }: OnErrorProps<DynamoDBStreamEvent, IEmptyResponse>): void {
    delegatedResolver.fail(error);
  }

  //#endregion
}
