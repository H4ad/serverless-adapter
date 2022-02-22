import util from 'util';
import { getEventSource } from '../event-sources';
import { isBinary } from '../utils/is-binary';
import { ServerlessRequest } from './request';
import { ServerlessResponse } from './response';

export function forwardResponse({
  binarySettings,
  response,
  resolver,
  eventSource,
  event,
  log,
}) {
  const statusCode = response.statusCode;
  const headers = ServerlessResponse.headers(response);
  const isBase64Encoded = isBinary({
    headers,
    binarySettings,
  });
  const encoding = isBase64Encoded ? 'base64' : 'utf8';
  const body = ServerlessResponse.body(response).toString(encoding);
  const logBody = isBase64Encoded ? '[BASE64_ENCODED]' : body;

  log.debug(
    'SERVERLESS_EXPRESS:FORWARD_RESPONSE:EVENT_SOURCE_RESPONSE_PARAMS',
    {
      statusCode,
      body: logBody,
      headers,
      isBase64Encoded,
    },
  );

  const successResponse = eventSource.getResponse({
    event,
    statusCode,
    body,
    headers,
    isBase64Encoded,
    response,
  });

  log.debug('SERVERLESS_EXPRESS:FORWARD_RESPONSE:EVENT_SOURCE_RESPONSE', {
    successResponse: util.inspect(successResponse, { depth: null }),
    body: logBody,
  });

  resolver.succeed({
    response: successResponse,
  });
}

export function respondToEventSourceWithError({
  error,
  resolver,
  log,
  respondWithErrors,
  eventSourceName,
  eventSource,
}) {
  log.error('SERVERLESS_EXPRESS:RESPOND_TO_EVENT_SOURCE_WITH_ERROR', error);

  if (
    eventSourceName !== 'AWS_ALB' &&
    eventSourceName !== 'AWS_LAMBDA_EDGE' &&
    eventSourceName !== 'AWS_API_GATEWAY_V1' &&
    eventSourceName !== 'AWS_API_GATEWAY_V2'
  ) {
    resolver.fail({ error });
    return;
  }

  const body = respondWithErrors ? error.stack : '';
  const errorResponse = eventSource.getResponse({
    statusCode: 500,
    body,
    headers: {},
    isBase64Encoded: false,
  });

  resolver.succeed({ response: errorResponse });
}

export async function getRequestResponse({
  method,
  headers,
  body,
  remoteAddress,
  path,
}) {
  const request = new ServerlessRequest({
    method,
    headers,
    body,
    remoteAddress,
    url: path,
  });
  await waitForStreamComplete(request);

  const response = new ServerlessResponse(request);

  return { request, response };
}

export function waitForStreamComplete(stream) {
  if (stream.complete || stream.writableEnded) return stream;

  return new Promise((resolve, reject) => {
    stream.once('error', complete);
    stream.once('end', complete);
    stream.once('finish', complete);

    let isComplete = false;

    function complete(err) {
      if (isComplete) return;

      isComplete = true;

      stream.removeListener('error', complete);
      stream.removeListener('end', complete);
      stream.removeListener('finish', complete);

      if (err) reject(err);
      else resolve(stream);
    }
  });
}

export async function forwardRequestToNodeServer({
  app,
  framework,
  event,
  context,
  resolver,
  eventSourceName,
  binarySettings,
  eventSource = getEventSource({ eventSourceName }),
  eventSourceRoutes,
  log,
}: any) {
  const requestValues = eventSource.getRequest({ event, context, log });

  if (!requestValues.path && eventSourceRoutes[eventSourceName])
    requestValues.path = eventSourceRoutes[eventSourceName];

  log.debug(
    'SERVERLESS_EXPRESS:FORWARD_REQUEST_TO_NODE_SERVER:REQUEST_VALUES',
    { requestValues },
  );
  const { request, response } = await getRequestResponse(requestValues);
  await framework.sendRequest({ app, request, response });
  await waitForStreamComplete(response);
  log.debug('SERVERLESS_EXPRESS:FORWARD_REQUEST_TO_NODE_SERVER:RESPONSE', {
    response,
  });
  forwardResponse({
    binarySettings,
    response,
    resolver,
    eventSource,
    event,
    log,
  });
  return response;
}
