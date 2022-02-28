import type { APIGatewayProxyResult } from 'aws-lambda';
import type { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { ApiGatewayV1Adapter } from '../../../src/v2/adapters/aws';
import { GetResponseAdapterProps, Resolver } from '../../../src/v2/contracts';
import {
  ILogger,
  getEventBodyAsBuffer,
  getFlattenedHeadersMap,
  getMultiValueHeadersMap,
  getPathWithQueryStringParams,
} from '../../../src/v2/core';
import { ServerlessResponse } from '../../../src/v2/network';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import { createApiGatewayV1 } from './utils/api-gateway-v1';

describe(ApiGatewayV1Adapter.name, () => {
  let adapter!: ApiGatewayV1Adapter;

  beforeEach(() => {
    adapter = new ApiGatewayV1Adapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(ApiGatewayV1Adapter.name);
    });
  });

  createCanHandleTestsForAdapter(() => new ApiGatewayV1Adapter(), undefined);

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const method = 'PUT';
      const path = '/events';
      const body = { name: 'H4ad Event' };

      const event = createApiGatewayV1(method, path, body);
      const result = adapter.getRequest(event);

      const remoteAddress = event.requestContext.identity.sourceIp;

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

      expect(result).toHaveProperty('remoteAddress', remoteAddress);

      const resultPath = getPathWithQueryStringParams(
        path,
        event.queryStringParameters,
      );
      expect(result).toHaveProperty('path', resultPath);
    });

    it('should return the correct mapping for the request when it has no body', () => {
      const method = 'GET';
      const path = '/users';
      const body = undefined;

      const event = createApiGatewayV1(method, path, body, {}, { page: '2' });
      const result = adapter.getRequest(event);

      const remoteAddress = event.requestContext.identity.sourceIp;

      expect(result).toHaveProperty('method', method);
      expect(result).toHaveProperty('headers');

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
      const path = '/prod/posts';
      const body = undefined;

      const strippedAdapter = new ApiGatewayV1Adapter({ stripBasePath });

      const event = createApiGatewayV1(method, path, body);
      const result = strippedAdapter.getRequest(event);

      const remoteAddress = event.requestContext.identity.sourceIp;

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
      const path = '/events';
      const requestBody = { name: 'H4ad Event' };

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createApiGatewayV1(method, path, requestBody);
      const resultHeaders = getFlattenedHeadersMap(event.headers);

      const result = adapter.getResponse({
        event,
        log: {} as ILogger,
        body: resultBody,
        isBase64Encoded: resultIsBase64Encoded,
        statusCode: resultStatusCode,
        headers: resultHeaders,
      });

      const responseHeaders = getMultiValueHeadersMap(resultHeaders);

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body', resultBody);
      expect(result).toHaveProperty('headers', undefined);
      expect(result).toHaveProperty('multiValueHeaders', responseHeaders);
      expect(result).toHaveProperty('isBase64Encoded', resultIsBase64Encoded);
    });

    it('should throw an error when framework send transfer-encoding=chunked in headers', () => {
      const method = 'GET';
      const path = '/events/stream';
      const requestBody = undefined;

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createApiGatewayV1(method, path, requestBody);
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
    });

    it('should throw an error when framework send chunkedEncoding=true in response', () => {
      const method = 'GET';
      const path = '/events/stream';
      const requestBody = undefined;

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createApiGatewayV1(method, path, requestBody);
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

      const event = createApiGatewayV1(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: Resolver<APIGatewayProxyResult> = {
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const respondWithErrors = true;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: APIGatewayProxyResult | undefined;

      adapter.getResponse = jest.fn(
        (params: GetResponseAdapterProps<APIGatewayProxyEvent>) => {
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

      const event = createApiGatewayV1(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: Resolver<APIGatewayProxyResult> = {
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const respondWithErrors = false;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: APIGatewayProxyResult | undefined;

      adapter.getResponse = jest.fn(
        (params: GetResponseAdapterProps<APIGatewayProxyEvent>) => {
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
