//#region Imports

import type { SNSEvent } from 'aws-lambda';
import { getDefaultIfUndefined } from '../../core';
import { AwsSimpleAdapter } from './base/index';

//#endregion

/**
 * The options to customize the {@link SNSAdapter}
 *
 * @breadcrumb Adapters / AWS / SNSAdapter
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
 * @breadcrumb Adapters / AWS / SNSAdapter
 * @public
 */
export class SNSAdapter extends AwsSimpleAdapter<SNSEvent> {
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link SNSAdapter}
   */
  constructor(options?: SNSAdapterOptions) {
    super({
      forwardPath: getDefaultIfUndefined(options?.snsForwardPath, '/sns'),
      forwardMethod: getDefaultIfUndefined(options?.snsForwardMethod, 'POST'),
      batch: false,
      host: 'sns.amazonaws.com',
    });
  }

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

  //#endregion
}
