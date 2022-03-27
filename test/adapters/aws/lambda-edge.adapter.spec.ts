import { join } from 'path';
import type { CloudFrontHeaders } from 'aws-lambda/common/cloudfront';
import type {
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
} from 'aws-lambda/trigger/cloudfront-request';
import {
  BothValueHeaders,
  MultiValueHeaders,
  SingleValueHeaders,
} from '../../../src/@types';
import {
  DEFAULT_LAMBDA_EDGE_DISALLOWED_HEADERS,
  DEFAULT_ORIGIN_MAX_RESPONSE_SIZE_IN_BYTES,
  DEFAULT_VIEWER_MAX_RESPONSE_SIZE_IN_BYTES,
  LambdaEdgeAdapter,
} from '../../../src/adapters/aws';
import { DelegatedResolver } from '../../../src/contracts';
import { ILogger } from '../../../src/core';
import { createCanHandleTestsForAdapter } from '../utils/can-handle';
import {
  createLambdaEdgeOriginEvent,
  createLambdaEdgeViewerEvent,
} from './utils/lambda-edge';

describe(LambdaEdgeAdapter.name, () => {
  let adapter!: LambdaEdgeAdapter;

  beforeEach(() => {
    adapter = new LambdaEdgeAdapter();
  });

  describe('getAdapterName', () => {
    it('should be the same name of the class', () => {
      expect(adapter.getAdapterName()).toBe(LambdaEdgeAdapter.name);
    });
  });

  createCanHandleTestsForAdapter(() => new LambdaEdgeAdapter(), undefined);

  describe('getRequest', () => {
    it('should return the correct mapping for the request', () => {
      const events: [
        factory:
          | typeof createLambdaEdgeOriginEvent
          | typeof createLambdaEdgeViewerEvent,
        method: string,
        path: string,
        body?: any,
      ][] = [
        [createLambdaEdgeOriginEvent, 'GET', '/image.png', undefined],
        [
          createLambdaEdgeOriginEvent,
          'POST',
          'batata.png',
          {
            base64: Buffer.from('batata', 'utf-8').toString('base64'),
          },
        ],
        [createLambdaEdgeViewerEvent, 'GET', '/image4343.png', undefined],
        [
          createLambdaEdgeViewerEvent,
          'PUT',
          'banana.png',
          {
            base64: Buffer.from('batata', 'utf-8').toString('base64'),
          },
        ],
      ];

      for (const [createEvent, method, path, body] of events) {
        const lambdaEdgeEvent = createEvent(method, path, body);
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
        else {
          const dataAsBase64 = Buffer.from(
            JSON.stringify(body),
            'utf-8',
          ).toString('base64');

          const jsonString = JSON.stringify({
            action: 'read-only',
            encoding: 'base64',
            inputTruncated: false,
            data: dataAsBase64,
          });

          expect(result.body.toString('utf-8')).toBe(jsonString);
        }

        expect(result.remoteAddress).toBe(cloudfrontRequest.clientIp);

        const host = cloudfrontRequest.headers['host'][0].value;

        expect(result.host).toBe(host);
        expect(result.hostname).toBe(host);
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

    it('should return the correct mapping for the request with custom path function', () => {
      const lambdaEvent = createLambdaEdgeOriginEvent(
        'GET',
        '/image2.png',
        undefined,
        undefined,
        'potato=true',
      );

      const customAdapter = new LambdaEdgeAdapter({
        getPathFromEvent: event => join('/prod', event.cf.request.uri),
      });

      const result = customAdapter.getRequest(lambdaEvent);

      expect(result.path).toBe('/prod/image2.png');

      // certifies the behavior described in the comments of `getPathFromEvent`.
      expect(result.path).not.toBe('/prod/image2.png?potato=true');
    });
  });

  describe('getResponse', () => {
    it('should return the correct mapping for the response', () => {
      const options: CloudFrontRequestEvent[] = [
        createLambdaEdgeOriginEvent('GET', '/potato.png'),
        createLambdaEdgeViewerEvent('GET', '/apple.png'),
      ];

      for (const event of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const result = adapter.getResponse({
          event,
          body,
          headers: {},
          log: {} as ILogger,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(result).toBeDefined();

        expect(result).toHaveProperty('headers');
        expect(result!.headers).toHaveProperty(
          'host',
          cloudFrontRequest.headers['host'],
        );

        expect(result).toHaveProperty('clientIp', cloudFrontRequest.clientIp);
        expect(result).toHaveProperty('method', cloudFrontRequest.method);
        expect(result).toHaveProperty('origin', cloudFrontRequest.origin);
        expect(result).toHaveProperty(
          'querystring',
          cloudFrontRequest.querystring,
        );
        expect(result).toHaveProperty('uri', cloudFrontRequest.uri);

        expect(result).not.toHaveProperty('body');
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
        createLambdaEdgeOriginEvent('GET', '/potato.png', {
          bigResponseForOrigin,
        }),
        createLambdaEdgeViewerEvent('GET', '/apple.png', {
          bigResponseForView,
        }),
      ];

      for (const event of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const log = {
          error: jest.fn(message =>
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

    it('should return the correct mapping for the response with option "shouldUseHeadersFromFramework"', () => {
      const event = createLambdaEdgeViewerEvent('GET', '/potato.png');
      const cloudFrontRequest = event.Records[0].cf.request;
      const body = JSON.stringify(cloudFrontRequest);

      const customAdapter = new LambdaEdgeAdapter({
        shouldUseHeadersFromFramework: true,
      });

      const options: BothValueHeaders[] = [
        { batata: 'true' },
        { batata: ['true'] },
      ];

      for (const headers of options) {
        const result = customAdapter.getResponse({
          event,
          body,
          headers,
          log: {} as ILogger,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(result!.headers!['batata']).toStrictEqual([
          { key: 'batata', value: 'true' },
        ]);

        expect(result!.headers!['batata']).not.toStrictEqual([
          { key: 'batata', value: Math.random().toString() },
        ]);
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
      const allDisallowedCloudfrontHeaders: CloudFrontHeaders = {};

      for (const header of disallowedHeadersList) {
        allDisallowedHeadersMap[header] = Math.random().toString();
        allDisallowedMultiValueHeadersMap[header] = [Math.random().toString()];
        allDisallowedCloudfrontHeaders[header] = [
          { key: header, value: Math.random().toString() },
        ];
      }

      const options: [
        adapter: LambdaEdgeAdapter,
        event: CloudFrontRequestEvent,
        headers: BothValueHeaders,
      ][] = [
        [
          new LambdaEdgeAdapter({
            disallowedHeaders: disallowedHeadersList,
          }),
          createLambdaEdgeViewerEvent(
            'GET',
            '/potato.png',
            undefined,
            allDisallowedCloudfrontHeaders,
          ),
          {},
        ],
        [
          new LambdaEdgeAdapter({
            disallowedHeaders: disallowedHeadersList,
          }),
          createLambdaEdgeOriginEvent(
            'GET',
            '/potato.png',
            undefined,
            allDisallowedCloudfrontHeaders,
          ),
          {},
        ],
        [
          new LambdaEdgeAdapter({
            shouldUseHeadersFromFramework: true,
            disallowedHeaders: disallowedHeadersList,
          }),
          createLambdaEdgeViewerEvent('GET', '/potato.png'),
          allDisallowedHeadersMap,
        ],
        [
          new LambdaEdgeAdapter({
            shouldUseHeadersFromFramework: true,
            disallowedHeaders: disallowedHeadersList,
          }),
          createLambdaEdgeViewerEvent('GET', '/apple.png'),
          allDisallowedMultiValueHeadersMap,
        ],
        [
          new LambdaEdgeAdapter({
            shouldUseHeadersFromFramework: true,
            disallowedHeaders: disallowedHeadersList,
          }),
          createLambdaEdgeOriginEvent('GET', '/apple.png'),
          allDisallowedHeadersMap,
        ],
        [
          new LambdaEdgeAdapter({
            shouldUseHeadersFromFramework: true,
            disallowedHeaders: disallowedHeadersList,
          }),
          createLambdaEdgeOriginEvent('GET', '/apple.png'),
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

        expect(Object.keys(result!.headers!)).toHaveLength(0);
      }
    });

    it('should return the correct mapping for the response with option "shouldStripHeader"', () => {
      const customAdapter = new LambdaEdgeAdapter({
        shouldStripHeader: () => true,
      });

      const options: CloudFrontRequestEvent[] = [
        createLambdaEdgeViewerEvent('GET', '/potato.png'),
        createLambdaEdgeOriginEvent('GET', '/apple.png'),
      ];

      for (const event of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const result = customAdapter.getResponse({
          event,
          body,
          headers: {},
          log: {} as ILogger,
          statusCode: 200,
          isBase64Encoded: false,
        });

        expect(Object.keys(result!.headers!)).toHaveLength(0);
      }
    });

    it('should return the correct mapping for the response with option "onResponseSizeExceedLimit"', () => {
      const customAdapter = new LambdaEdgeAdapter({
        originMaxResponseSizeInBytes: 0,
        viewerMaxResponseSizeInBytes: 0,
      });

      const options: CloudFrontRequestEvent[] = [
        createLambdaEdgeViewerEvent('GET', '/potato.png', { potato: true }),
        createLambdaEdgeOriginEvent('GET', '/apple.png', { apple: true }),
      ];

      for (const event of options) {
        const cloudFrontRequest = event.Records[0].cf.request;
        const body = JSON.stringify(cloudFrontRequest);

        const log = {
          error: jest.fn(message =>
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

        const onResponseSizeExceedLimit = jest.fn();

        const customAdapter2 = new LambdaEdgeAdapter({
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
        [
          createLambdaEdgeViewerEvent('GET', '/potato.png', { potato: true }),
          false,
        ],
        [
          createLambdaEdgeOriginEvent('GET', '/apple.png', { apple: true }),
          false,
        ],
        [createLambdaEdgeViewerEvent('GET', '/mapple.png'), true],
        [createLambdaEdgeOriginEvent('GET', '/juice.png'), true],
      ];

      for (const [event, respondWithErrors] of options) {
        const log = {} as ILogger;

        const resolver: DelegatedResolver<CloudFrontRequestResult> = {
          fail: jest.fn(),
          succeed: jest.fn(),
        };

        const error = new Error('Test error');

        adapter.onErrorWhileForwarding({
          event,
          log,
          delegatedResolver: resolver,
          respondWithErrors,
          error,
        });

        expect(resolver.fail).toHaveBeenCalledTimes(1);
        expect(resolver.succeed).toHaveBeenCalledTimes(0);
      }
    });
  });
});
