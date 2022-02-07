//#region Imports

import { Context, SNSEvent } from 'aws-lambda';
import { AdapterContract, AdapterRequest, OnErrorProps } from '../../contracts';
import {
  EmptyResponse,
  getEventBodyAsBuffer,
  IEmptyResponse,
} from '../../core';

//#endregion

/**
 * The adapter to handle requests from AWS SNS.
 *
 * @example```typescript
 * const snsForwardPath = '/your/route/sns'; // default /sns
 * const snsForwardMethod = 'POST'; // default POST
 * const adapter = new SNSAdapter(snsForwardPath, snsForwardMethod);
 * ```
 *
 * {@link https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sns.html Event Reference}
 */
export class SNSAdapter
  implements AdapterContract<SNSEvent, Context, IEmptyResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param snsForwardPath The path that will be used to create a request to be forwarded to the framework. Default: /sns
   * @param snsForwardMethod The http method that will be used to create a request to be forwarded to the framework. Default: POST
   */
  constructor(
    protected readonly snsForwardPath: string = '/sns',
    protected readonly snsForwardMethod: string = 'POST'
  ) {}

  //#endregion

  //#region Public Methods

  /**
   * @inheritDoc
   */
  public getAdapterName(): string {
    return SNSAdapter.name;
  }

  /**
   * @inheritDoc
   */
  public canHandle(event: unknown): event is SNSEvent {
    const snsEvent = event as Partial<SNSEvent>;

    if (!Array.isArray(snsEvent.Records)) return false;

    const eventSource = snsEvent.Records[0]?.EventSource;

    return eventSource === 'aws:sns';
  }

  /**
   * @inheritDoc
   */
  public getRequest(event: SNSEvent): AdapterRequest {
    const path = this.snsForwardPath;
    const method = this.snsForwardMethod;
    const headers = { host: 'sns.amazonaws.com' };
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
