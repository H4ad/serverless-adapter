//#region Imports

import type { S3Event } from 'aws-lambda';
import { getDefaultIfUndefined } from '../../core';
import { AwsSimpleAdapter } from './base/index';

//#endregion

/**
 * The options to customize the {@link S3Adapter}
 *
 * @breadcrumb Adapters / AWS / S3Adapter
 * @public
 */
export interface S3AdapterOptions {
  /**
   * The path that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue /s3
   */
  s3ForwardPath?: string;

  /**
   * The http method that will be used to create a request to be forwarded to the framework.
   *
   * @defaultValue POST
   */
  s3ForwardMethod?: string;
}

/**
 * The adapter to handle requests from AWS S3.
 *
 * The option of `responseWithErrors` is ignored by this adapter and we always call `resolver.fail` with the error.
 *
 * {@link https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-s3.html | Event Reference}
 *
 * @example
 * ```typescript
 * const s3ForwardPath = '/your/route/s3'; // default /s3
 * const s3ForwardMethod = 'POST'; // default POST
 * const adapter = new S3Adapter({ s3ForwardPath, s3ForwardMethod });
 * ```
 *
 * @breadcrumb Adapters / AWS / S3Adapter
 * @public
 */
export class S3Adapter extends AwsSimpleAdapter<S3Event> {
  //#region Constructor

  /**
   * Default constructor
   *
   * @param options - The options to customize the {@link SNSAdapter}
   */
  constructor(options?: S3AdapterOptions) {
    super({
      forwardPath: getDefaultIfUndefined(options?.s3ForwardPath, '/s3'),
      forwardMethod: getDefaultIfUndefined(options?.s3ForwardMethod, 'POST'),
      batch: false,
      host: 's3.amazonaws.com',
    });
  }

  //#endregion

  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getAdapterName(): string {
    return S3Adapter.name;
  }

  /**
   * {@inheritDoc}
   */
  public canHandle(event: unknown): event is S3Event {
    const s3Event = event as Partial<S3Event>;

    if (!Array.isArray(s3Event?.Records)) return false;

    const eventSource = s3Event.Records[0]?.eventSource;

    return eventSource === 'aws:s3';
  }

  //#endregion
}
