import { beforeEach, describe, expect, it, vitest } from 'vitest';
import {
  DelegatedResolver,
  GetResponseAdapterProps,
  ILogger,
  getEventBodyAsBuffer,
  getPathWithQueryStringParams,
} from '../../../src';
import { DigitalOceanHttpEvent } from '../../../src/@types/digital-ocean';
import { DigitalOceanHttpResponse } from '../../../src/@types/digital-ocean/digital-ocean-http-response';
import { HttpFunctionAdapter } from '../../../src/adapters/digital-ocean';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import { createHttpFunctionEvent } from './utils/http-function';

describe(HttpFunctionAdapter.name, () => {
  let adapter!: HttpFunctionAdapter;

  beforeEach(() => {
    adapter = new HttpFunctionAdapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(HttpFunctionAdapter.name);
    });
  });

  createCanHandleTestsForAdapter(() => new HttpFunctionAdapter(), undefined);

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const method = 'PUT';
      const path = '/collaborators';
      const body = { name: 'H4ad Collaborator' };
      const queryParams = { page: '2' };

      const event = createHttpFunctionEvent(
        method,
        path,
        body,
        {},
        queryParams,
      );
      const result = adapter.getRequest(event);

      const remoteAddress = event.http.headers['x-forwarded-for'];

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
        event.http.queryString,
      );
      expect(result).toHaveProperty('path', resultPath);
    });

    it('should method be always uppercase', () => {
      const method = 'get';
      const path = '/test';

      const event = createHttpFunctionEvent(method, path);
      const result = adapter.getRequest(event);

      expect(result).toHaveProperty('method', method.toUpperCase());
    });

    it('should return the correct mapping for the request when it has no body', () => {
      const method = 'GET';
      const path = '/collaborators';
      const body = undefined;

      const event = createHttpFunctionEvent(
        method,
        path,
        body,
        {},
        { page: '2' },
      );
      const result = adapter.getRequest(event);

      const remoteAddress = event.http.headers['x-forwarded-for'];

      expect(result).toHaveProperty('method', method);
      expect(result).toHaveProperty('headers');
      expect(result).toHaveProperty('body');
      expect(result.body).not.toBeInstanceOf(Buffer);
      expect(result.body).toBeUndefined();

      expect(result).toHaveProperty('remoteAddress', remoteAddress);

      const resultPath = getPathWithQueryStringParams(
        path,
        event.http.queryString,
      );
      expect(result).toHaveProperty('path', resultPath);
    });

    it('should return the correct mapping for the request when send stripBasePath', () => {
      const stripBasePath = '/prod';

      const method = 'GET';
      const path = '/prod/collaborators';
      const body = undefined;

      const strippedAdapter = new HttpFunctionAdapter({ stripBasePath });

      const event = createHttpFunctionEvent(method, path, body);
      const result = strippedAdapter.getRequest(event);

      const remoteAddress = event.http.headers['x-forwarded-for'];

      expect(result).toHaveProperty('method', method);
      expect(result).toHaveProperty('headers');

      expect(result).toHaveProperty('body');
      expect(result.body).not.toBeInstanceOf(Buffer);
      expect(result.body).toBeUndefined();

      expect(result).toHaveProperty('remoteAddress', remoteAddress);

      const resultPath = getPathWithQueryStringParams(
        path.replace('/prod', ''),
        event.http.queryString,
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

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createHttpFunctionEvent(
        method,
        path,
        requestBody,
        {},
        queryParams,
      );
      const resultHeaders = event.http.headers;

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
    });
  });

  describe('onErrorWhileForwarding', () => {
    it('should resolver call succeed', () => {
      const method = 'GET';
      const path = '/events';
      const requestBody = undefined;

      const event = createHttpFunctionEvent(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: DelegatedResolver<DigitalOceanHttpResponse> = {
        fail: vitest.fn(),
        succeed: vitest.fn(),
      };

      const respondWithErrors = true;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: DigitalOceanHttpResponse | undefined;

      adapter.getResponse = vitest.fn(
        (params: GetResponseAdapterProps<DigitalOceanHttpEvent>) => {
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

      const event = createHttpFunctionEvent(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: DelegatedResolver<DigitalOceanHttpResponse> = {
        fail: vitest.fn(),
        succeed: vitest.fn(),
      };

      const respondWithErrors = false;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: DigitalOceanHttpResponse | undefined;

      adapter.getResponse = vitest.fn(
        (params: GetResponseAdapterProps<DigitalOceanHttpEvent>) => {
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
