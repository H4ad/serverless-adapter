import type { CloudFrontHeaders } from 'aws-lambda/common/cloudfront';
import type {
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
} from 'aws-lambda/trigger/cloudfront-request';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import {
  BothValueHeaders,
  DelegatedResolver,
  ILogger,
  MultiValueHeaders,
  SingleValueHeaders,
} from '../../../src';
import {
  DEFAULT_LAMBDA_EDGE_DISALLOWED_HEADERS,
  DEFAULT_ORIGIN_MAX_RESPONSE_SIZE_IN_BYTES,
  DEFAULT_VIEWER_MAX_RESPONSE_SIZE_IN_BYTES,
  RequestLambdaEdgeAdapter,
} from '../../../src/adapters/aws';
import {
  createLambdaEdgeOriginEvent,
  createLambdaEdgeViewerEvent,
} from './utils/lambda-edge';

describe(RequestLambdaEdgeAdapter.name, () => {
  let adapter!: RequestLambdaEdgeAdapter;

  beforeEach(() => {
    adapter = new RequestLambdaEdgeAdapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(RequestLambdaEdgeAdapter.name);
    });
  });

  describe('canHandle', () => {
    it('should handle origin-request and viewer-request', () => {
      expect(
        adapter.canHandle(createLambdaEdgeViewerEvent('GET', '/users')),
      ).toBe(true);

      expect(
        adapter.canHandle(createLambdaEdgeOriginEvent('GET', '/users')),
      ).toBe(true);

      expect(adapter.canHandle({})).toBe(false);
    });
  });

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const events: [
        factory:
          | typeof createLambdaEdgeOriginEvent
          | typeof createLambdaEdgeViewerEvent,
        method: string,
        path: string,
        body?: any,
        headers?: CloudFrontHeaders,
      ][] = [
        [createLambdaEdgeOriginEvent, 'GET', '/projects', undefined],
        [
          createLambdaEdgeOriginEvent,
          'GET',
          '/users',
          undefined,
          {
            test: [{ key: 'test', value: '1' }],
            test2: [
              { key: 'Test2', value: '1' },
              { key: 'Test2', value: '2' },
            ],
          },
        ],
        [
          createLambdaEdgeOriginEvent,
          'POST',
          'batata.png',
          {
            base64: Buffer.from('batata', 'utf-8').toString('base64'),
          },
        ],
        [createLambdaEdgeViewerEvent, 'GET', '/products', undefined],
        [
          createLambdaEdgeViewerEvent,
          'PUT',
          '/tests',
          {
            base64: Buffer.from('batata', 'utf-8').toString('base64'),
          },
        ],
      ];

      for (const [createEvent, method, path, body, headers] of events) {
        const lambdaEdgeEvent = createEvent(method, path, body, headers);
        const cloudfrontRequest = lambdaEdgeEvent.Records[0].cf.request;

        const result = adapter.getRequest(lambdaEdgeEvent);

        const keys = Object.keys(result);
        const expectedKeys = [
          'method',
          'path',
          'headers',
          'body',
          'remoteAddress',
          'host',
          'hostname',
        ];

        expect(keys.length === expectedKeys.length).toBe(true);
        expect(keys.every(key => expectedKeys.includes(key))).toBe(true);

        expect(result.method).toBe(method);
        expect(result.path).toBe(path);

        const someHeaderValueIsArray = Object.values(result.headers).some(
          Array.isArray,
        );

        expect(someHeaderValueIsArray).toBe(false);

        const headerKeys = Object.keys(result.headers);
        const expectedHeaderKeys = Object.keys(cloudfrontRequest.headers);

        if (result.body) expectedHeaderKeys.push('content-length');

        expect(headerKeys.length === expectedHeaderKeys.length).toBe(true);
        expect(headerKeys.every(key => expectedHeaderKeys.includes(key))).toBe(
          true,
        );

        if (result.body === undefined) expect(result.body).toBeUndefined();
        else expect(result.body.toString('utf-8')).toBe(JSON.stringify(body));

        expect(result.remoteAddress).toBe(cloudfrontRequest.clientIp);

        if (cloudfrontRequest.headers['host']) {
          const host = cloudfrontRequest.headers['host'][0].value;

          expect(result.host).toBe(host);
          expect(result.hostname).toBe(host);
        } else {
          expect(result.host).toBeUndefined();
          expect(result.hostname).toBeUndefined();
        }
      }
    });

    it('should return the correct mapping for the request with query params', () => {
      const lambdaEvent = createLambdaEdgeOriginEvent(
        'GET',
        '/image_of_apple.png',
        undefined,
        undefined,
        'pretty=true',
      );

      const result = adapter.getRequest(lambdaEvent);

      expect(result.path).toBe('/image_of_apple.png?pretty=true');
    });

    it('should return the correct path for the request with stripBasePath', () => {
      const lambdaEvent = createLambdaEdgeOriginEvent(
        'GET',
        '/api/users',
        undefined,
        undefined,
        'potato=true',
      );

      const customAdapter = new RequestLambdaEdgeAdapter({
        stripBasePath: '/api',
      });

      const result = customAdapter.getRequest(lambdaEvent);

      expect(result.path).toBe('/users?potato=true');
    });
  });

  describe('getResponse', () => {
    it('should return the correct mapping for the response', () => {
      const options: CloudFrontRequestEvent[] = [
        createLambdaEdgeOriginEvent('GET', '/users'),
        createLambdaEdgeViewerEvent('GET', '/products'),
      ];

      for (const event of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const result = adapter.getResponse({
          event,
          body,
          headers: {
            Test: 'value',
          },
          log: {} as ILogger,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(result).toBeDefined();
        expect(result.headers).toEqual({
          test: [{ key: 'Test', value: 'value' }],
        });
        expect(result.bodyEncoding).toEqual('text');
        expect(result.status).toEqual('200');
        expect(result.body).toEqual(body);
      }
    });

    it('should return the correct mapping for the response when base64', () => {
      const options: CloudFrontRequestEvent[] = [
        createLambdaEdgeOriginEvent('GET', '/users'),
        createLambdaEdgeViewerEvent('GET', '/products'),
      ];

      for (const event of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = Buffer.from(JSON.stringify(cloudFrontRequest)).toString(
          'base64',
        );

        const result = adapter.getResponse({
          event,
          body,
          headers: {
            Test: 'value',
            Single: ['2'],
            Test2: ['1', '2'],
          },
          log: {} as ILogger,
          statusCode: 200,
          isBase64Encoded: true,
        });

        expect(result).toBeDefined();
        expect(result.headers).toEqual({
          test: [{ key: 'Test', value: 'value' }],
          single: [{ key: 'Single', value: '2' }],
          test2: [
            { key: 'Test2', value: '1' },
            { key: 'Test2', value: '2' },
          ],
        });
        expect(result.bodyEncoding).toEqual('base64');
        expect(result.status).toEqual('200');
        expect(result.body).toEqual(body);
      }
    });

    it('should return the correct mapping for the response even if we reach the max response size', () => {
      const bigResponseForOrigin = new Array(
        DEFAULT_ORIGIN_MAX_RESPONSE_SIZE_IN_BYTES + 1,
      ).map(() => 'a');
      const bigResponseForView = new Array(
        DEFAULT_VIEWER_MAX_RESPONSE_SIZE_IN_BYTES + 1,
      ).map(() => 'b');

      const options: CloudFrontRequestEvent[] = [
        createLambdaEdgeOriginEvent('GET', '/users', {
          bigResponseForOrigin,
        }),
        createLambdaEdgeViewerEvent('GET', '/products', {
          bigResponseForView,
        }),
      ];

      for (const event of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const log = {
          error: vitest.fn(message =>
            expect(message).toContain('Max response size exceeded'),
          ) as any,
        } as ILogger;

        adapter.getResponse({
          event,
          body,
          headers: {},
          log,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(log.error).toHaveBeenCalledTimes(1);
      }
    });

    it('should return the correct mapping for the response with option "disallowedHeaders"', () => {
      const disallowedHeadersList =
        DEFAULT_LAMBDA_EDGE_DISALLOWED_HEADERS.filter(
          header => typeof header === 'string',
        ) as string[];

      expect(disallowedHeadersList.length > 0).toBe(true);

      const allDisallowedHeadersMap: SingleValueHeaders = {};
      const allDisallowedMultiValueHeadersMap: MultiValueHeaders = {};

      for (const header of disallowedHeadersList) {
        allDisallowedHeadersMap[header] = Math.random().toString();
        allDisallowedMultiValueHeadersMap[header] = [Math.random().toString()];
      }

      const options: [
        adapter: RequestLambdaEdgeAdapter,
        event: CloudFrontRequestEvent,
        headers: BothValueHeaders,
      ][] = [
        [
          new RequestLambdaEdgeAdapter({
            disallowedHeaders: disallowedHeadersList,
          }),
          createLambdaEdgeOriginEvent('GET', '/products', undefined),
          allDisallowedHeadersMap,
        ],
        [
          new RequestLambdaEdgeAdapter({
            disallowedHeaders: disallowedHeadersList,
          }),
          createLambdaEdgeOriginEvent('GET', '/products', undefined),
          allDisallowedMultiValueHeadersMap,
        ],
      ];

      for (const [customAdapter, event, headers] of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const result = customAdapter.getResponse({
          event,
          body,
          headers,
          log: {} as ILogger,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(Object.keys(result.headers!)).toHaveLength(0);
      }
    });

    it('should return the correct mapping for the response with option "shouldStripHeader"', () => {
      const customAdapter = new RequestLambdaEdgeAdapter({
        shouldStripHeader: () => true,
      });

      const options: [
        event: CloudFrontRequestEvent,
        headers: BothValueHeaders,
      ][] = [
        [createLambdaEdgeViewerEvent('GET', '/users'), { test: '1' }],
        [
          createLambdaEdgeOriginEvent('GET', '/products'),
          { test: '2', potato: ['3', '4'] },
        ],
      ];

      for (const [event, headers] of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const result = customAdapter.getResponse({
          event,
          body,
          headers,
          log: {} as ILogger,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(Object.keys(result.headers!)).toHaveLength(0);
      }
    });

    it('should return the correct mapping for the response with option "onResponseSizeExceedLimit"', () => {
      const customAdapter = new RequestLambdaEdgeAdapter({
        originMaxResponseSizeInBytes: 0,
        viewerMaxResponseSizeInBytes: 0,
      });

      const options: CloudFrontRequestEvent[] = [
        createLambdaEdgeViewerEvent('GET', '/users', { potato: true }),
        createLambdaEdgeOriginEvent('GET', '/products', { apple: true }),
      ];

      for (const event of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const log = {
          error: vitest.fn(message =>
            expect(message).toContain('Max response size exceeded'),
          ) as any,
        } as ILogger;

        const result = customAdapter.getResponse({
          event,
          body,
          headers: {},
          log,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(result).toBeDefined();
        expect(log.error).toHaveBeenCalledTimes(1);

        const onResponseSizeExceedLimit = vitest.fn();

        const customAdapter2 = new RequestLambdaEdgeAdapter({
          originMaxResponseSizeInBytes: 0,
          viewerMaxResponseSizeInBytes: 0,
          onResponseSizeExceedLimit,
        });

        customAdapter2.getResponse({
          event,
          body,
          headers: {},
          log: {} as ILogger,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(onResponseSizeExceedLimit).toHaveBeenCalled();
      }
    });
  });

  describe('onErrorWhileForwarding', () => {
    it('should resolver call succeed', () => {
      const options: [
        event: CloudFrontRequestEvent,
        respondWithError: boolean,
      ][] = [
        [createLambdaEdgeViewerEvent('GET', '/users', { potato: true }), false],
        [createLambdaEdgeOriginEvent('GET', '/users', { apple: true }), false],
        [createLambdaEdgeViewerEvent('GET', '/products'), true],
        [createLambdaEdgeOriginEvent('GET', '/juices'), true],
      ];

      for (const [event, respondWithErrors] of options) {
        const log = {} as ILogger;

        const resolver: DelegatedResolver<CloudFrontRequestResult> = {
          fail: vitest.fn(),
          succeed: vitest.fn(),
        };

        const error = new Error('Test error');

        adapter.onErrorWhileForwarding({
          event,
          log,
          delegatedResolver: resolver,
          respondWithErrors,
          error,
        });

        expect(resolver.fail).toHaveBeenCalledTimes(0);
        expect(resolver.succeed).toHaveBeenCalledTimes(1);
      }
    });
  });
});
