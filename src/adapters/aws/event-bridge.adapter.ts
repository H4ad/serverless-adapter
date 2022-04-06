//#region Imports

import type { Context, EventBridgeEvent } from 'aws-lambda';
import { AdapterContract, AdapterRequest, OnErrorProps } from '../../contracts';
import {
  EmptyResponse,
  IEmptyResponse,
  getDefaultIfUndefined,
  getEventBodyAsBuffer,
} from '../../core';

//#endregion

/**
 * The options to customize the {@link EventBridgeAdapter}
 *
 * @public
 */
export interface EventBridgeOptions {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue /eventbridge
   */
  eventBridgeForwardPath?: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue POST
   */
  eventBridgeForwardMethod?: string;
}

/**
 * Just a type alias to ignore generic types in the event
 *
 * @public
 */
export type EventBridgeEventAll = EventBridgeEvent<any, any>;

/**
 * The adapter to handle requests from AWS EventBridge (Cloudwatch Events).
 *
 * The option of `responseWithErrors` is ignored by this adapter and we always call `resolver.fail` with the error.
 *
 * {@link https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html | Event Reference}
 *
 * @example
 * ```typescript
 * const eventBridgeForwardPath = '/your/route/eventbridge'; // default /eventbridge
 * const eventBridgeForwardMethod = 'POST'; // default POST
 * const adapter = new EventBridgeAdapter({ eventBridgeForwardPath, eventBridgeForwardMethod });
 * ```
 *
 * @public
 */
export class EventBridgeAdapter
  implements AdapterContract<EventBridgeEventAll, Context, IEmptyResponse>
{
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link EventBridgeAdapter}
   */
  constructor(protected readonly options?: EventBridgeOptions) {}

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return EventBridgeAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is EventBridgeEventAll {
    const eventBridgeEvent = event as Partial<EventBridgeEventAll>;

    // thanks to @cnuss in https://github.com/vendia/serverless-express/blob/b5da6070b8dd2fb674c1f7035dd7edfef1dc83a2/src/event-sources/utils.js#L87
    return !!(
      eventBridgeEvent &&
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
   * {@inheritDoc}
   */
  public getRequest(event: EventBridgeEventAll): AdapterRequest {
    const path = getDefaultIfUndefined(
      this.options?.eventBridgeForwardPath,
      '/eventbridge',
    );
    const method = getDefaultIfUndefined(
      this.options?.eventBridgeForwardMethod,
      'POST',
    );

    const [body, contentLength] = getEventBodyAsBuffer(
      JSON.stringify(event),
      false,
    );

    const headers = {
      host: 'events.amazonaws.com',
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
  }: OnErrorProps<EventBridgeEventAll, IEmptyResponse>): void {
    delegatedResolver.fail(error);
  }

  //#endregion
}
