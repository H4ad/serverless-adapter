import type { Cookie, HttpRequest, HttpResponseSimple } from '@azure/functions';
import {
  DelegatedResolver,
  GetResponseAdapterProps,
  ILogger,
  getEventBodyAsBuffer,
  getFlattenedHeadersMap,
  getPathWithQueryStringParams,
} from '../../../src';
import { HttpTriggerV4Adapter } from '../../../src/adapters/azure';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import {
  createHttpTriggerContext,
  createHttpTriggerEvent,
} from './utils/http-trigger';

describe(HttpTriggerV4Adapter.name, () => {
  let adapter!: HttpTriggerV4Adapter;

  beforeEach(() => {
    adapter = new HttpTriggerV4Adapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(HttpTriggerV4Adapter.name);
    });
  });

  createCanHandleTestsForAdapter(
    () => new HttpTriggerV4Adapter(),
    createHttpTriggerContext('GET', '/'),
  );

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const method = 'PUT';
      const path = '/events';
      const body = { name: 'H4ad Event' };

      const event = createHttpTriggerEvent(method, path, body);

      expect(event.headers).toHaveProperty('x-forwarded-for');
      expect(event.headers['x-forwarded-for']).not.toBeInstanceOf(Array);

      const result = adapter.getRequest(event);

      const remoteAddress = event.headers['x-forwarded-for'];

      expect(result).toHaveProperty('method', method);

      expect(result).toHaveProperty('headers');
      expect(result.headers).toHaveProperty('x-forwarded-for');
      expect(result.headers['x-forwarded-for']).not.toBeInstanceOf(Array);

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

      const resultPath = getPathWithQueryStringParams(path, event.query);

      expect(result.path.replace('/api/test-serverless-adapter', '')).toEqual(
        resultPath,
      );
    });

    it('should return the correct mapping for the request when it has no body', () => {
      const method = 'POST';
      const path = '/events';
      const body = undefined;

      const event = createHttpTriggerEvent(method, path, body);
      const result = adapter.getRequest(event);

      const remoteAddress = event.headers['x-forwarded-for'];

      expect(result).toHaveProperty('method', method);

      expect(result).toHaveProperty('headers');
      expect(result.headers).toHaveProperty('x-forwarded-for');
      expect(result.headers['x-forwarded-for']).not.toBeInstanceOf(Array);

      expect(result).toHaveProperty('body');
      expect(result.body).not.toBeInstanceOf(Buffer);
      expect(result.body).toBeUndefined();

      expect(result.headers).not.toHaveProperty('content-length');

      expect(result).toHaveProperty('remoteAddress', remoteAddress);

      const resultPath = getPathWithQueryStringParams(path, event.query);
      expect(result.path.replace('/api/test-serverless-adapter', '')).toEqual(
        resultPath,
      );
    });

    it('should return the correct mapping for the request when send stripBasePath', () => {
      const stripBasePath = '/api/test-serverless-adapter';

      const method = 'PUT';
      const path = '/events';
      const body = { name: 'H4ad Event' };

      const strippedAdapter = new HttpTriggerV4Adapter({ stripBasePath });

      const event = createHttpTriggerEvent(method, path, body);

      expect(event.headers).toHaveProperty('x-forwarded-for');
      expect(event.headers['x-forwarded-for']).not.toBeInstanceOf(Array);

      const result = strippedAdapter.getRequest(event);

      const remoteAddress = event.headers['x-forwarded-for'];

      expect(result).toHaveProperty('method', method);

      expect(result).toHaveProperty('headers');
      expect(result.headers).toHaveProperty('x-forwarded-for');
      expect(result.headers['x-forwarded-for']).not.toBeInstanceOf(Array);

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

      const resultPath = getPathWithQueryStringParams(path, event.query);

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

      const event = createHttpTriggerEvent(method, path, requestBody);
      const responseHeaders = getFlattenedHeadersMap(event.headers);

      const result = adapter.getResponse({
        event,
        headers: responseHeaders,
        body: resultBody,
        log: {} as ILogger,
        isBase64Encoded: resultIsBase64Encoded,
        statusCode: resultStatusCode,
      });

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body', resultBody);
      expect(result).toHaveProperty('headers', responseHeaders);
      expect(result).toHaveProperty('enableContentNegotiation', false);
      expect(result).toHaveProperty('cookies', []);
    });

    it('should return the correct mapping for the response with multiple set-cookie', () => {
      const method = 'PUT';
      const path = '/events';
      const requestBody = { name: 'H4ad Event' };

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createHttpTriggerEvent(method, path, requestBody, {
        'set-cookie': [
          'id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;',
          'id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly',
          'mykey=myvalue; SameSite=Strict',
          'lu=Rg3vHJZnehYLjVg7qi3bZjzg; Expires=Tue, 15 Jan 2013 21:47:38 GMT; Path=/; Domain=.example.com; HttpOnly',
          'made_write_conn=1295214458; Path=/; Domain=.example.com; Max-Age=1209600',
          'reg_fb_gate=deleted; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/; Domain=.example.com; HttpOnly',
        ],
      });

      const result = adapter.getResponse({
        event,
        headers: event.headers,
        body: resultBody,
        log: {} as ILogger,
        isBase64Encoded: resultIsBase64Encoded,
        statusCode: resultStatusCode,
      });

      delete event.headers['set-cookie'];

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body', resultBody);
      expect(result).toHaveProperty('headers', event.headers);
      expect(result).toHaveProperty('enableContentNegotiation', false);
      expect(result.cookies).toStrictEqual([
        {
          name: 'id',
          value: 'a3fWa',
          expires: new Date('Thu, 31 Oct 2021 07:28:00 GMT'),
        },
        {
          name: 'id',
          value: 'a3fWa',
          expires: new Date('Thu, 21 Oct 2021 07:28:00 GMT'),
          secure: true,
          httpOnly: true,
        },
        {
          name: 'mykey',
          value: 'myvalue',
          sameSite: 'Strict',
        },
        {
          name: 'lu',
          value: 'Rg3vHJZnehYLjVg7qi3bZjzg',
          expires: new Date('Tue, 15 Jan 2013 21:47:38 GMT'),
          path: '/',
          domain: '.example.com',
          httpOnly: true,
        },
        {
          name: 'made_write_conn',
          value: '1295214458',
          path: '/',
          domain: '.example.com',
          maxAge: 1209600,
        },
        {
          name: 'reg_fb_gate',
          value: 'deleted',
          expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
          path: '/',
          domain: '.example.com',
          httpOnly: true,
        },
      ] as Cookie[]);
    });

    it('should return the correct mapping for the response with set-cookie', () => {
      const method = 'PUT';
      const path = '/events';
      const requestBody = { name: 'H4ad Event' };

      const resultBody = '{"success":true}';
      const resultStatusCode = 200;
      const resultIsBase64Encoded = false;

      const event = createHttpTriggerEvent(method, path, requestBody, {
        'set-cookie': 'id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;',
      });

      const result = adapter.getResponse({
        event,
        headers: event.headers,
        body: resultBody,
        log: {} as ILogger,
        isBase64Encoded: resultIsBase64Encoded,
        statusCode: resultStatusCode,
      });

      delete event.headers['set-cookie'];

      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body', resultBody);
      expect(result).toHaveProperty('headers', event.headers);
      expect(result).toHaveProperty('enableContentNegotiation', false);
      expect(result.cookies).toStrictEqual([
        {
          name: 'id',
          value: 'a3fWa',
          expires: new Date('Thu, 31 Oct 2021 07:28:00 GMT'),
        },
      ] as Cookie[]);
    });
  });

  describe('onErrorWhileForwarding', () => {
    it('should resolver call succeed', () => {
      const method = 'GET';
      const path = '/events';
      const requestBody = undefined;

      const event = createHttpTriggerEvent(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: DelegatedResolver<HttpRequest> = {
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const respondWithErrors = true;
      const error = new Error('Test error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: HttpResponseSimple | undefined;

      adapter.getResponse = jest.fn(
        (params: GetResponseAdapterProps<HttpRequest>) => {
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
      const path = '/events';
      const requestBody = undefined;

      const event = createHttpTriggerEvent(method, path, requestBody);

      const log = {} as ILogger;

      const resolver: DelegatedResolver<HttpResponseSimple> = {
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const respondWithErrors = false;
      const error = new Error('Test error without sending this error');

      const oldGetResponse = adapter.getResponse.bind(adapter);

      let getResponseResult: HttpResponseSimple | undefined;

      adapter.getResponse = jest.fn(
        (params: GetResponseAdapterProps<HttpRequest>) => {
          expect(params.event).toBe(event);
          expect(params.statusCode).toBe(500);
          expect(params.body).not.toBe(error.stack);
          expect(params.body).toStrictEqual('');
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
