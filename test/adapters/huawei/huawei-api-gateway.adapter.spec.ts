import { beforeEach, describe, expect, it, vitest } from 'vitest';
import {
  DelegatedResolver,
  GetResponseAdapterProps,
  ILogger,
  getEventBodyAsBuffer,
  getFlattenedHeadersMap,
  getPathWithQueryStringParams,
} from '../../../src';
import {
  HuaweiApiGatewayEvent,
  HuaweiApiGatewayResponse,
} from '../../../src/@types/huawei';
import { HuaweiApiGatewayAdapter } from '../../../src/adapters/huawei';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import { createHuaweiApiGateway } from './utils/huawei-api-gateway';

describe(HuaweiApiGatewayAdapter.name, () => {
  let adapter!: HuaweiApiGatewayAdapter;

  beforeEach(() => {
    adapter = new HuaweiApiGatewayAdapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(HuaweiApiGatewayAdapter.name);
    });
  });

  createCanHandleTestsForAdapter(
    () => new HuaweiApiGatewayAdapter(),
    undefined,
  );

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const method = 'PUT';
      const path = '/collaborators';
      const body = { name: 'H4ad Collaborator' };
      const queryParams = { page: '44' };

      const event = createHuaweiApiGateway(method, path, body, {}, queryParams);
      const result = adapter.getRequest(event);

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

      const remoteAddress = event.headers['x-real-ip'];

      expect(result).toHaveProperty('remoteAddress', remoteAddress);

      const resultPath = getPathWithQueryStringParams(
        path,
        event.queryStringParameters,
      );
      expect(result).toHaveProperty('path', resultPath);
    });

    it('should return the correct mapping for the request when it has no body', () => {
      const method = 'GET';
      const path = '/potatos';
      const body = undefined;

      const event = createHuaweiApiGateway(method, path, body, undefined, {
        page: '2',
      });
      const result = adapter.getRequest(event);

      const remoteAddress = event.headers['x-real-ip'];

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
      const path = '/prod/collaborators';
      const body = undefined;

      const strippedAdapter = new HuaweiApiGatewayAdapter({ stripBasePath });

      const event = createHuaweiApiGateway(method, path, body);
      const result = strippedAdapter.getRequest(event);

      const remoteAddress = event.headers['x-real-ip'];

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

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createHuaweiApiGateway(
        method,
        path,
        requestBody,
        {},
        queryParams,
      );
      const resultHeaders = getFlattenedHeadersMap(event.headers);

      const result = adapter.getResponse({
        event,
        log: {} as ILogger,
        body: resultBody,
        isBase64Encoded: resultIsBase64Encoded,
        statusCode: resultStatusCode,
        headers: {
          ...resultHeaders,
        },
      });

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body', resultBody);
      expect(result).toHaveProperty('headers');
      expect(result).toHaveProperty('isBase64Encoded', resultIsBase64Encoded);
    });

    it('should return the correct mapping for the response when set-cookie is array', () => {
      const method = 'PUT';
      const path = '/collaborators';
      const requestBody = { name: 'H4ad Collaborator V2' };
      const queryParams = { page: '2' };

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createHuaweiApiGateway(
        method,
        path,
        requestBody,
        {},
        queryParams,
      );
      const resultHeaders = getFlattenedHeadersMap(event.headers);

      const result = adapter.getResponse({
        event,
        log: {} as ILogger,
        body: resultBody,
        isBase64Encoded: resultIsBase64Encoded,
        statusCode: resultStatusCode,
        headers: {
          ...resultHeaders,
        },
      });

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body', resultBody);
      expect(result).toHaveProperty('headers');
      expect(result).toHaveProperty('isBase64Encoded', resultIsBase64Encoded);
    });
  });

  describe('onErrorWhileForwarding', () => {
    it('should resolver call succeed', () => {
      const method = 'GET';
      const path = '/events';
      const requestBody = undefined;

      const event = createHuaweiApiGateway(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: DelegatedResolver<HuaweiApiGatewayResponse> = {
        fail: vitest.fn(),
        succeed: vitest.fn(),
      };

      const respondWithErrors = true;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: HuaweiApiGatewayResponse | undefined;

      adapter.getResponse = vitest.fn(
        (params: GetResponseAdapterProps<HuaweiApiGatewayEvent>) => {
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

      const event = createHuaweiApiGateway(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: DelegatedResolver<HuaweiApiGatewayResponse> = {
        fail: vitest.fn(),
        succeed: vitest.fn(),
      };

      const respondWithErrors = false;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: HuaweiApiGatewayResponse | undefined;

      adapter.getResponse = vitest.fn(
        (params: GetResponseAdapterProps<HuaweiApiGatewayEvent>) => {
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
