import url from 'url';
import { getCommaDelimitedHeaders, getEventBody } from '../utils';

function getRequestValuesFromApiGatewayEvent({ event }) {
  const { requestContext, requestPath, rawPath, rawQueryString, cookies } =
    event;
  const method = requestContext.http.method;
  const requestPathOrRawPath = requestPath || rawPath;
  const basePath = ''; // TODO: Test with custom domain
  const stripBasePathRegex = new RegExp(`^${basePath}`);
  const path = url.format({
    pathname: requestPathOrRawPath.replace(stripBasePathRegex, ''),
    search: rawQueryString,
  });

  const headers: Record<any, any> = {};

  if (cookies) {
    headers.cookie = cookies.join('; ');
  }

  Object.entries(event.headers).forEach(([headerKey, headerValue]) => {
    headers[headerKey.toLowerCase()] = headerValue;
  });

  let body;

  if (event.body) {
    body = getEventBody({ event });
    const isBase64Encoded = event.isBase64Encoded;
    headers['content-length'] = Buffer.byteLength(
      body,
      isBase64Encoded ? 'base64' : 'utf8'
    );
  }

  return {
    method,
    headers,
    body,
    remoteAddress: requestContext.http.sourceIp,
    path,
  };
}

function getResponseToApiGateway({
  statusCode,
  body,
  headers = {},
  isBase64Encoded = false,
  response = {},
}: any) {
  if (headers['transfer-encoding'] === 'chunked' || response.chunkedEncoding) {
    throw new Error('chunked encoding is not supported by API Gateway');
  }

  const responseToApiGateway: Record<any, any> = {
    statusCode,
    body,
    isBase64Encoded,
  };

  const cookies = headers['set-cookie'];

  if (cookies) {
    responseToApiGateway.cookies = Array.isArray(cookies) ? cookies : [cookies];
    delete headers['set-cookie'];
  }

  responseToApiGateway.headers = getCommaDelimitedHeaders({
    headersMap: headers,
  });

  return responseToApiGateway;
}

export default {
  getRequest: getRequestValuesFromApiGatewayEvent,
  getResponse: getResponseToApiGateway,
};
