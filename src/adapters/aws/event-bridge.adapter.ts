//#region Imports

import type { EventBridgeEvent } from 'aws-lambda';
import { getDefaultIfUndefined } from '../../core';
import { AwsSimpleAdapter } from './base';

//#endregion

/**
 * The options to customize the {@link EventBridgeAdapter}
 *
 * @breadcrumb Adapters / AWS / EventBridgeAdapter
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
 * @breadcrumb Adapters / AWS / EventBridgeAdapter
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
 * @breadcrumb Adapters / AWS / EventBridgeAdapter
 * @public
 */
export class EventBridgeAdapter extends AwsSimpleAdapter<EventBridgeEventAll> {
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link EventBridgeAdapter}
   */
  constructor(options?: EventBridgeOptions) {
    super({
      forwardPath: getDefaultIfUndefined(
        options?.eventBridgeForwardPath,
        '/eventbridge',
      ),
      forwardMethod: getDefaultIfUndefined(
        options?.eventBridgeForwardMethod,
        'POST',
      ),
      batch: false,
      host: 'events.amazonaws.com',
    });
  }

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public override getAdapterName(): string {
    return EventBridgeAdapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public override canHandle(event: unknown): event is EventBridgeEventAll {
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

  //#endregion
}
