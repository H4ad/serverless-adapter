//#region Imports

import { Context, EventBridgeEvent } from 'aws-lambda';
import { AdapterContract, AdapterRequest, OnErrorProps } from '../../contracts';
import {
  EmptyResponse,
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
  IEmptyResponse,
} from '../../core';

//#endregion

/**
 * The options to customize the {@link EventBridgeAdapter}
 */
export interface EventBridgeOptions {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   *
   * @default /eventbridge
   */
  eventBridgeForwardPath?: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   *
   * @default POST
   */
  eventBridgeForwardMethod?: string;
}

/**
 * Just a type alias to ignore generic types in the event
 */
export type EventBridgeEventAll = EventBridgeEvent<any, any>;

/**
 * The adapter to handle requests from AWS EventBridge (Cloudwatch Events).
 *
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html Event Reference}
 *
 * @example```typescript
 * const eventBridgeForwardPath = '/your/route/eventbridge'; // default /eventbridge
 * const eventBridgeForwardMethod = 'POST'; // default POST
 * const adapter = new EventBridgeAdapter({ eventBridgeForwardPath, eventBridgeForwardMethod });
 * ```
 */
export class EventBridgeAdapter
  implements AdapterContract<EventBridgeEventAll, Context, IEmptyResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options The options to customize the {@link EventBridgeAdapter}
   */
  constructor(protected readonly options?: EventBridgeOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * @inheritDoc
   */
  public getAdapterName(): string {
    return EventBridgeAdapter.name;
  }

  /**
   * @inheritDoc
   */
  public canHandle(event: unknown): event is EventBridgeEventAll {
    const eventBridgeEvent = event as Partial<EventBridgeEventAll>;

    // thanks to @cnuss in https://github.com/vendia/serverless-express/blob/b5da6070b8dd2fb674c1f7035dd7edfef1dc83a2/src/event-sources/utils.js#L87
    return !!(
      eventBridgeEvent.version &&
      eventBridgeEvent.version === '0' &&
      eventBridgeEvent.id &&
      eventBridgeEvent['detail-type'] &&
      eventBridgeEvent.source &&
      eventBridgeEvent.account &&
      eventBridgeEvent.time &&
      eventBridgeEvent.region &&
      eventBridgeEvent.resources &&
      Array.isArray(eventBridgeEvent.resources) &&
      eventBridgeEvent.detail &&
      typeof eventBridgeEvent.detail === 'object' &&
      !Array.isArray(eventBridgeEvent.detail)
    );
  }

  /**
   * @inheritDoc
   */
  public getRequest(event: EventBridgeEventAll): AdapterRequest {
    const path = getDefaultIfUndefined(
      this.options?.eventBridgeForwardPath,
      '/eventbridge'
    );
    const method = getDefaultIfUndefined(
      this.options?.eventBridgeForwardMethod,
      'POST'
    );
    const headers = { host: 'events.amazonaws.com' };
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
  }: OnErrorProps<EventBridgeEventAll, IEmptyResponse>): void {
    resolver.fail(error);
  }

  //#endregion
}
