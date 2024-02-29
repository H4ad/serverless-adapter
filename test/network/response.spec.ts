import { ObjectReadableMock } from 'stream-mock';
import { describe, expect, it, vitest } from 'vitest';
import {
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';

describe('ServerlessResponse', () => {
  it('should can create serverless response from parameters of constructor', () => {
    const method = 'POST';

    const response = new ServerlessResponse({
      method,
    });

    expect(response).toHaveProperty('useChunkedEncodingByDefault', false);
    expect(response).toHaveProperty('chunkedEncoding', false);
    expect(response).toHaveProperty('writable', true);
    expect(response).toHaveProperty('writableEnded', false);

    const responseBody = ServerlessResponse.body(response);

    expect(responseBody).toBeInstanceOf(Buffer);
    expect(responseBody.length).toEqual(0);

    const responseHeaders = ServerlessResponse.headers(response);

    expect(Object.keys(responseHeaders).length).toEqual(0);

    response.setHeader('test', 'testedValue');

    const responseHeadersWithValue = ServerlessResponse.headers(response);

    expect(responseHeadersWithValue).toHaveProperty('test', 'testedValue');

    // we didn't have the header that we set before because this method
    // get the value from headers inside the response instead from original implementation
    expect(response.headers).not.toHaveProperty('test', 'testedValue');
  });

  it('should can create response from request', () => {
    const defaultParams = {
      method: 'GET',
      headers: { test2: 'value2' },
      url: '/values',
    };

    const request = new ServerlessRequest({
      ...defaultParams,
    });

    const requestWithBody = new ServerlessRequest({
      ...defaultParams,
      body: Buffer.from('{"test": true}', 'utf-8'),
    });

    const requestWithBodyString = new ServerlessRequest({
      ...defaultParams,
      body: '{"test": true}' as any,
    });

    const requestWithUintArray = new ServerlessRequest({
      ...defaultParams,
      body: Uint8Array.from(
        Array.from('{"test": true}').map(c => c.charCodeAt(0)),
      ),
    });

    const requestHead = new ServerlessRequest({
      ...defaultParams,
      method: 'HEAD',
    });

    const requests: [
      request: ServerlessRequest,
      expectedLength: number,
      hasBody: boolean,
    ][] = [
      [request, 0, true],
      [requestWithBody, requestWithBody.body!.length, true],
      [requestWithBodyString, requestWithBodyString.body!.length, true],
      [requestWithUintArray, requestWithUintArray.body!.length, true],
      [requestHead, 0, false],
    ];

    for (const [request, expectedLength, hasBody] of requests) {
      const responseFrom = ServerlessResponse.from(request);

      // why I have this test? Because of this line: https://github.com/nodejs/node/blob/master/lib/_http_server.js#L181
      // the only way that I can use to check if method passed in request is working.
      expect(responseFrom).toHaveProperty('_hasBody', hasBody);
      expect(responseFrom).toHaveProperty(
        'statusCode',
        responseFrom.statusCode,
      );
      expect(responseFrom.headers).toHaveProperty(
        'test2',
        defaultParams.headers.test2,
      );

      const body = ServerlessResponse.body(responseFrom);

      expect(body).toHaveLength(expectedLength);
      expect(responseFrom).toHaveProperty('writable', true);
      expect(responseFrom).toHaveProperty('writableEnded', true);

      // In this case, when we use ServerlessResponse.from we set
      // response headers instead setting original implementation,
      // so, we have access to the headers by calling get headers property
      expect(responseFrom.headers).toHaveProperty(
        'test2',
        defaultParams.headers.test2,
      );
    }
  });

  it('should can pipe response and return correct data', async () => {
    const options: [
      value: string | Buffer | Uint8Array,
      expectedValue: string,
    ][] = [
      ['test', 'test'],
      [Buffer.from('{"yo": true}', 'utf-8'), '{"yo": true}'],
      [
        Uint8Array.from(Array.from('{"test": true}').map(c => c.charCodeAt(0))),
        '{"test": true}',
      ],
    ];

    for (const [testedData, expectedValue] of options) {
      const response = new ServerlessResponse({
        method: 'GET',
      });

      const read = new ObjectReadableMock([testedData], {
        objectMode: true,
      });

      read.pipe(response);

      const waitedStream = await waitForStreamComplete(response);

      expect(waitedStream).toBe(response);
      expect(ServerlessResponse.body(response).toString('utf-8')).toBe(
        expectedValue,
      );
    }
  });

  it('should cannot pipe response with invalid data', () => {
    const options: any[] = [void 0, null];

    for (const testedData of options) {
      const response = new ServerlessResponse({
        method: 'GET',
      });

      expect(() => response.connection!.write(testedData)).toThrowError(
        'response.write()',
      );

      expect(() => response.connection!.write(testedData)).toThrowError(
        'response.write()',
      );
    }

    for (const testedData of options) {
      const response = new ServerlessResponse({
        method: 'GET',
      });

      response._header = null as any;

      expect(() => response.connection!.write(testedData)).toThrowError(
        'response.write()',
      );
    }
  });

  it('should call correctly the callback with valid data in response', () => {
    const options = [
      'test',
      Buffer.from('testB', 'utf-8'),
      Uint8Array.from(Array.from('{"test": true}').map(c => c.charCodeAt(0))),
    ];

    for (const testedData of options) {
      const response = new ServerlessResponse({
        method: 'GET',
      });

      response._header = null as any;

      const callback = vitest.fn();

      expect(() =>
        response.connection!.write(testedData, callback),
      ).not.toThrowError();

      expect(callback).toHaveBeenCalled();
    }
  });

  it('should write headers correctly in object when call writeHead', () => {
    class MockServerlessResponse extends ServerlessResponse {
      public override callNativeWriteHead(
        statusCode: number,
        statusMessage?: string | any | any[],
        obj?: any | any[],
      ): this {
        return super.callNativeWriteHead(statusCode, statusMessage, obj);
      }
    }

    const response = new MockServerlessResponse({
      method: 'GET',
    });

    response.callNativeWriteHead = vitest.fn();
    response.setHeader = vitest.fn();

    expect(() => response.writeHead(200, { test1: 'true' })).not.toThrowError();
    expect(() =>
      response.writeHead(200, [{ test2: 'true' }, { test3: 'true' }]),
    ).not.toThrowError();
    expect(() =>
      response.writeHead(200, 'test', { test4: 'true' }),
    ).not.toThrowError();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(response.setHeader).toHaveBeenCalledTimes(4);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(response.setHeader).toHaveBeenNthCalledWith(1, 'test1', 'true');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(response.setHeader).toHaveBeenNthCalledWith(2, 'test2', 'true');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(response.setHeader).toHaveBeenNthCalledWith(3, 'test3', 'true');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(response.setHeader).toHaveBeenNthCalledWith(4, 'test4', 'true');
  });

  it('should write headers correctly in object when call setHeader', () => {
    const response = new ServerlessResponse({
      method: 'GET',
    });

    response.setHeader('test', 'value');

    expect(response.getHeaders()).toHaveProperty('test', 'value');

    response._wroteHeader = true;

    response.setHeader('test2', 'value');

    expect(response.getHeaders()).not.toHaveProperty('test2', 'value');
    expect(response.headers).toHaveProperty('test2', 'value');
  });
});
