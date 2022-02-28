import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { ApiGatewayV2Adapter } from '../../../src/v2/adapters/aws';
import {
  DelegatedResolver,
  GetResponseAdapterProps,
} from '../../../src/v2/contracts';
import {
  ILogger,
  getEventBodyAsBuffer,
  getFlattenedHeadersMap,
  getMultiValueHeadersMap,
  getPathWithQueryStringParams,
} from '../../../src/v2/core';
import { ServerlessResponse } from '../../../src/v2/network';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import { createApiGatewayV2 } from './utils/api-gateway-v2';

describe(ApiGatewayV2Adapter.name, () => {
  let adapter!: ApiGatewayV2Adapter;

  beforeEach(() => {
    adapter = new ApiGatewayV2Adapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(ApiGatewayV2Adapter.name);
    });
  });

  createCanHandleTestsForAdapter(() => new ApiGatewayV2Adapter(), undefined);

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const method = 'PUT';
      const path = '/collaborators';
      const body = { name: 'H4ad Collaborator' };
      const queryParams = { page: '2' };
      const cookies = ['batata', 'joga10'];

      const event = createApiGatewayV2(
        method,
        path,
        body,
        {},
        queryParams,
        cookies,
      );
      const result = adapter.getRequest(event);

      const remoteAddress = event.requestContext.http.sourceIp;

      expect(result).toHaveProperty('method', method);
      expect(result).toHaveProperty('headers');

      expect(result).toHaveProperty('body');
      expect(result.body).toBeInstanceOf(Buffer);

      const [bodyBuffer, contentLength] = getEventBodyAsBuffer(
        JSON.stringify(body),
        false,
      );
      expect(result.body).toStrictEqual(bodyBuffer);
      expect(result.headers).toHaveProperty('content-length');
      expect(result.headers['content-length']).toBe(String(contentLength));

      expect(result.headers['cookie']).toBe(cookies.join('; '));

      expect(result).toHaveProperty('remoteAddress', remoteAddress);

      const resultPath = getPathWithQueryStringParams(
        path,
        event.rawQueryString,
      );
      expect(result).toHaveProperty('path', resultPath);
    });

    it('should return the correct mapping for the request when it has no body', () => {
      const method = 'GET';
      const path = '/collaborators';
      const body = undefined;

      const event = createApiGatewayV2(method, path, body, {}, { page: '2' });
      const result = adapter.getRequest(event);

      const remoteAddress = event.requestContext.http.sourceIp;

      expect(result).toHaveProperty('method', method);
      expect(result).toHaveProperty('headers');
      expect(result.headers).toHaveProperty('cookie', undefined);

      expect(result).toHaveProperty('body');
      expect(result.body).not.toBeInstanceOf(Buffer);
      expect(result.body).toBeUndefined();

      expect(result).toHaveProperty('remoteAddress', remoteAddress);

      const resultPath = getPathWithQueryStringParams(
        path,
        event.queryStringParameters,
      );
      expect(result).toHaveProperty('path', resultPath);
    });

    it('should return the correct mapping for the request when send stripBasePath', () => {
      const stripBasePath = '/prod';

      const method = 'GET';
      const path = '/prod/collaborators';
      const body = undefined;

      const strippedAdapter = new ApiGatewayV2Adapter({ stripBasePath });

      const event = createApiGatewayV2(method, path, body);
      const result = strippedAdapter.getRequest(event);

      const remoteAddress = event.requestContext.http.sourceIp;

      expect(result).toHaveProperty('method', method);
      expect(result).toHaveProperty('headers');

      expect(result).toHaveProperty('body');
      expect(result.body).not.toBeInstanceOf(Buffer);
      expect(result.body).toBeUndefined();

      expect(result).toHaveProperty('remoteAddress', remoteAddress);

      const resultPath = getPathWithQueryStringParams(
        path.replace('/prod', ''),
        event.queryStringParameters,
      );
      expect(result).toHaveProperty('path', resultPath);
    });
  });

  describe('getResponse', () => {
    it('should return the correct mapping for the response', () => {
      const method = 'PUT';
      const path = '/collaborators';
      const requestBody = { name: 'H4ad Collaborator V2' };
      const queryParams = { page: '2' };
      const cookies = ['batata', 'joga10'];
      const resultCookies = 'batata; joga10; h4ad';

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createApiGatewayV2(
        method,
        path,
        requestBody,
        {},
        queryParams,
        cookies,
      );
      const resultHeaders = getFlattenedHeadersMap(event.headers);

      resultHeaders['set-cookie'] = resultCookies;

      const result = adapter.getResponse({
        event,
        log: {} as ILogger,
        body: resultBody,
        isBase64Encoded: resultIsBase64Encoded,
        statusCode: resultStatusCode,
        headers: resultHeaders,
      });

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body', resultBody);
      expect(result).toHaveProperty('headers');
      expect(result.headers).toHaveProperty('set-cookie', undefined);
      expect(result.headers).toHaveProperty('cookies', resultCookies);
      expect(result).toHaveProperty('isBase64Encoded', resultIsBase64Encoded);
    });

    it('should throw an error when framework send transfer-encoding=chunked in headers', () => {
      const method = 'GET';
      const path = '/collaborators/stream';
      const requestBody = undefined;

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createApiGatewayV2(method, path, requestBody);
      const resultHeaders = getFlattenedHeadersMap(event.headers);

      resultHeaders['transfer-encoding'] = 'gzip,chunked';

      expect(() =>
        adapter.getResponse({
          event,
          log: {} as ILogger,
          body: resultBody,
          isBase64Encoded: resultIsBase64Encoded,
          statusCode: resultStatusCode,
          headers: resultHeaders,
        }),
      ).toThrowError('is not supported');

      const resultMultiValueHeaders = getMultiValueHeadersMap(event.headers);

      resultMultiValueHeaders['transfer-encoding'] = ['gzip', 'chunked'];

      expect(() =>
        adapter.getResponse({
          event,
          log: {} as ILogger,
          body: resultBody,
          isBase64Encoded: resultIsBase64Encoded,
          statusCode: resultStatusCode,
          headers: resultMultiValueHeaders,
        }),
      ).toThrowError('is not supported');
    });

    it('should throw an error when framework send chunkedEncoding=true in response', () => {
      const method = 'GET';
      const path = '/collaborators/stream';
      const requestBody = undefined;

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createApiGatewayV2(method, path, requestBody);
      const resultHeaders = getFlattenedHeadersMap(event.headers);

      const fakeChunkedResponse = new ServerlessResponse({ method });

      fakeChunkedResponse.chunkedEncoding = true;

      expect(() =>
        adapter.getResponse({
          event,
          log: {} as ILogger,
          body: resultBody,
          isBase64Encoded: resultIsBase64Encoded,
          statusCode: resultStatusCode,
          headers: resultHeaders,
          response: fakeChunkedResponse,
        }),
      ).toThrowError('is not supported');
    });
  });

  describe('onErrorWhileForwarding', () => {
    it('should resolver call succeed', () => {
      const method = 'GET';
      const path = '/events';
      const requestBody = undefined;

      const event = createApiGatewayV2(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: DelegatedResolver<APIGatewayProxyStructuredResultV2> = {
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const respondWithErrors = true;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: APIGatewayProxyStructuredResultV2 | undefined;

      adapter.getResponse = jest.fn(
        (params: GetResponseAdapterProps<APIGatewayProxyEventV2>) => {
          expect(params.event).toBe(event);
          expect(params.statusCode).toBe(500);
          expect(params.body).toBe(error.stack);
          expect(params.isBase64Encoded).toBe(false);
          expect(params.log).toBe(log);
          expect(params.headers).toStrictEqual({});

          getResponseResult = oldGetResponse(params);

          return getResponseResult;
        },
      );

      adapter.onErrorWhileForwarding({
        event,
        log,
        delegatedResolver: resolver,
        respondWithErrors,
        error,
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(adapter.getResponse).toHaveBeenCalledTimes(1);

      expect(resolver.fail).toHaveBeenCalledTimes(0);
      expect(resolver.succeed).toHaveBeenCalledTimes(1);

      expect(resolver.succeed).toHaveBeenCalledWith(getResponseResult);
    });

    it('should resolver call succeed but without sending errors', () => {
      const method = 'GET';
      const path = '/users';
      const requestBody = undefined;

      const event = createApiGatewayV2(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: DelegatedResolver<APIGatewayProxyStructuredResultV2> = {
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const respondWithErrors = false;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: APIGatewayProxyStructuredResultV2 | undefined;

      adapter.getResponse = jest.fn(
        (params: GetResponseAdapterProps<APIGatewayProxyEventV2>) => {
          expect(params.event).toBe(event);
          expect(params.statusCode).toBe(500);
          expect(params.body).toBe('');
          expect(params.isBase64Encoded).toBe(false);
          expect(params.log).toBe(log);
          expect(params.headers).toStrictEqual({});

          getResponseResult = oldGetResponse(params);

          return getResponseResult;
        },
      );

      adapter.onErrorWhileForwarding({
        event,
        log,
        delegatedResolver: resolver,
        respondWithErrors,
        error,
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(adapter.getResponse).toHaveBeenCalledTimes(1);

      expect(resolver.fail).toHaveBeenCalledTimes(0);
      expect(resolver.succeed).toHaveBeenCalledTimes(1);

      expect(resolver.succeed).toHaveBeenCalledWith(getResponseResult);
    });
  });
});
