//#region Imports

import { Writable } from 'stream';
import util from 'util';
import type { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { BinarySettings } from '../../@types';
import {
  AdapterContract,
  AdapterRequest,
  FrameworkContract,
  ResolverContract,
  ServerlessHandler,
} from '../../contracts';
import {
  BaseHandler,
  ILogger,
  getFlattenedHeadersMap,
  setCurrentInvoke,
  waitForStreamComplete,
} from '../../core';
import { ServerlessRequest, ServerlessStreamResponse } from '../../network';

//#endregion

/**
 * @breadcrumb Handlers / AwsStreamHandler
 * @public
 */
export type AWSResponseStream = Writable;

/**
 * @breadcrumb Handlers / AwsStreamHandler
 * @public
 */
export type AWSStreamResponseMetadata = Pick<
  APIGatewayProxyStructuredResultV2,
  'statusCode' | 'headers' | 'cookies'
>;

/**
 * @breadcrumb Handlers / AwsStreamHandler
 * @public
 */
declare const awslambda: {
  streamifyResponse: (
    handler: (
      event: APIGatewayProxyEventV2,
      response: AWSResponseStream,
      context: Context,
    ) => Promise<void>,
  ) => any;
  HttpResponseStream: {
    from: (
      stream: AWSResponseStream,
      httpResponseMetadata: AWSStreamResponseMetadata,
    ) => AWSResponseStream;
  };
};

/**
 * The interface that describes the internal context used by the {@link AwsStreamHandler}
 *
 * @breadcrumb Handlers / AwsStreamHandler
 * @public
 */
export type AWSStreamContext = {
  /**
   * The response stream provided by the serverless
   */
  response: AWSResponseStream;
  /**
   * The context provided by the serverless
   */
  context: Context;
};

/**
 * The class that implements a default serverless handler consisting of a function with event, context and callback parameters respectively
 *
 * @breadcrumb Handlers / AwsStreamHandler
 * @public
 */
export class AwsStreamHandler<TApp> extends BaseHandler<
  TApp,
  APIGatewayProxyEventV2,
  AWSStreamContext,
  void,
  AWSStreamResponseMetadata,
  void
> {
  //#region Public Methods

  /**
   * {@inheritDoc}
   */
  public getHandler(
    app: TApp,
    framework: FrameworkContract<TApp>,
    adapters: AdapterContract<
      APIGatewayProxyEventV2,
      AWSStreamContext,
      AWSStreamResponseMetadata
    >[],
    resolverFactory: ResolverContract<
      unknown,
      unknown,
      unknown,
      unknown,
      unknown
    >,
    binarySettings: BinarySettings,
    respondWithErrors: boolean,
    log: ILogger,
  ): ServerlessHandler<Promise<void>> {
    return awslambda.streamifyResponse(async (event, response, context) => {
      const streamContext = { response, context };

      this.onReceiveRequest(
        log,
        event,
        streamContext,
        binarySettings,
        respondWithErrors,
      );

      const adapter = this.getAdapterByEventAndContext(
        event,
        streamContext,
        adapters,
        log,
      );

      this.onResolveAdapter(log, adapter);

      setCurrentInvoke({ event, context });

      await this.forwardRequestToFramework(
        app,
        framework,
        event,
        streamContext,
        adapter,
        binarySettings,
        log,
      );
    });
  }

  //#endregion

  //#region Hooks

  /**
   * The hook executed on receive a request, before the request is being processed
   *
   * @param log - The instance of logger
   * @param event - The event sent by serverless
   * @param context - The context sent by serverless
   * @param binarySettings - The binary settings
   * @param respondWithErrors - Indicates whether the error stack should be included in the response or not
   */
  protected onReceiveRequest(
    log: ILogger,
    event: APIGatewayProxyEventV2,
    context: AWSStreamContext,
    binarySettings: BinarySettings,
    respondWithErrors: boolean,
  ): void {
    log.debug('SERVERLESS_ADAPTER:PROXY', () => ({
      event,
      context: util.inspect(context, { depth: null }),
      binarySettings,
      respondWithErrors,
    }));
  }

  /**
   * The hook executed after resolve the adapter that will be used to handle the request and response
   *
   * @param log - The instance of logger
   * @param adapter - The adapter resolved
   */
  protected onResolveAdapter(
    log: ILogger,
    adapter: AdapterContract<
      APIGatewayProxyEventV2,
      AWSStreamContext,
      AWSStreamResponseMetadata
    >,
  ): void {
    log.debug(
      'SERVERLESS_ADAPTER:RESOLVED_ADAPTER_NAME: ',
      adapter.getAdapterName(),
    );
  }

  /**
   * The hook executed after resolves the request values that will be sent to the framework
   *
   * @param log - The instance of logger
   * @param requestValues - The request values returned by the adapter
   */
  protected onResolveRequestValues(
    log: ILogger,
    requestValues: AdapterRequest,
  ): void {
    log.debug(
      'SERVERLESS_ADAPTER:FORWARD_REQUEST_TO_FRAMEWORK:REQUEST_VALUES',
      () => ({
        requestValues: {
          ...requestValues,
          body: requestValues.body?.toString(),
        },
      }),
    );
  }

  /**
   * The hook executed before sending response to the serverless with response from adapter
   *
   * @param log - The instance of logger
   * @param successResponse - The success response resolved by the adapter
   */
  protected onForwardResponseAdapterResponse(
    log: ILogger,
    successResponse: AWSStreamResponseMetadata,
  ) {
    log.debug('SERVERLESS_ADAPTER:FORWARD_RESPONSE:EVENT_SOURCE_RESPONSE', {
      successResponse,
    });
  }

  //#endregion

  //#region Protected Methods

  /**
   * The function to forward the event to the framework
   *
   * @param app - The instance of the app (express, hapi, etc...)
   * @param framework - The framework that will process requests
   * @param event - The event sent by serverless
   * @param context - The context sent by serverless
   * @param adapter - The adapter resolved to this event
   * @param log - The instance of logger
   * @param binarySettings - The binary settings
   */
  protected async forwardRequestToFramework(
    app: TApp,
    framework: FrameworkContract<TApp>,
    event: APIGatewayProxyEventV2,
    context: AWSStreamContext,
    adapter: AdapterContract<
      APIGatewayProxyEventV2,
      AWSStreamContext,
      AWSStreamResponseMetadata
    >,
    binarySettings: BinarySettings,
    log: ILogger,
  ): Promise<void> {
    const requestValues = adapter.getRequest(event, context, log);

    this.onResolveRequestValues(log, requestValues);

    const request = new ServerlessRequest({
      method: requestValues.method,
      headers: requestValues.headers,
      body: requestValues.body,
      remoteAddress: requestValues.remoteAddress,
      url: requestValues.path,
    });

    const response = new ServerlessStreamResponse({
      method: requestValues.method,
      onReceiveHeaders: (status, headers) => {
        const flattenedHeaders = getFlattenedHeadersMap(headers);
        const awsMetadata: AWSStreamResponseMetadata = {
          statusCode: status,
          headers: flattenedHeaders,
        };

        const cookies = headers['set-cookie'];

        if (cookies) {
          awsMetadata.cookies = Array.isArray(cookies) ? cookies : [cookies];

          delete headers['set-cookie'];
          delete flattenedHeaders['set-cookie'];
        }

        this.onForwardResponseAdapterResponse(log, awsMetadata);

        const finalResponse = awslambda.HttpResponseStream.from(
          context.response,
          awsMetadata,
        );

        // some status do not return body, and
        // for some unknown reason, we cannot finish the stream without writing at least once
        // so I have this thing just to fix this issue
        // ref: https://stackoverflow.com/a/37303151
        const isHundreadStatus = status >= 100 && status < 200;
        const isNoContentStatus = status === 304 || status === 204;
        const isHeadRequest = requestValues.method === 'HEAD';

        if (isHundreadStatus || isNoContentStatus || isHeadRequest) {
          finalResponse.write('');
          // end the response to avoid waiting for nothing
          response.end();
        }

        return finalResponse;
      },
      log,
    });

    framework.sendRequest(app, request, response);

    log.debug(
      'SERVERLESS_ADAPTER:FORWARD_REQUEST_TO_FRAMEWORK:WAITING_STREAM_COMPLETE',
    );
    await waitForStreamComplete(response);

    log.debug(
      'SERVERLESS_ADAPTER:FORWARD_REQUEST_TO_FRAMEWORK:STREAM_COMPLETE',
    );
    context.response.end();
  }

  //#endregion
}
