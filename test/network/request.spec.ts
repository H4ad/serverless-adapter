import { describe, expect, it, vitest } from 'vitest';
import { NO_OP, ServerlessRequest } from '../../src';

describe('ServerlessRequest', () => {
  it('should can create serverless request from parameters of constructor', () => {
    const method = 'POST';
    const url = '/users/batata';
    const headers = { 'Content-Type': 'application/json' };
    const remoteAddress = '168.16.0.1';
    const body = Buffer.from('{"test": true}', 'utf-8');

    const request = new ServerlessRequest({
      method,
      url,
      headers,
      remoteAddress,
      body,
    });

    expect(request).toHaveProperty('statusCode', 200);
    expect(request).toHaveProperty('statusMessage', 'OK');
    expect(request).toHaveProperty('url', url);
    expect(request).toHaveProperty('headers', headers);
    expect(request).toHaveProperty('ip', remoteAddress);
    expect(request).toHaveProperty('body', body);
    expect(request).toHaveProperty('complete', true);
    expect(request).toHaveProperty('httpVersion', '1.1');
    expect(request).toHaveProperty('httpVersionMajor', 1);
    expect(request).toHaveProperty('httpVersionMinor', 1);
    expect(request.socket).toHaveProperty('encrypted', true);
    expect(request.socket).toHaveProperty('readable', true);
    expect(request.socket).toHaveProperty('remoteAddress', remoteAddress);
    expect(request.socket).toHaveProperty('end', NO_OP);
    expect(request.socket).toHaveProperty('destroy', NO_OP);
    expect(request.socket.address()).toHaveProperty('port', 443);
  });

  it('should push body property when call _read', () => {
    const method = 'POST';
    const url = '/users/batata';
    const headers = { 'Content-Type': 'application/json' };
    const remoteAddress = '168.16.0.1';
    const body = Buffer.from('{"random": 2323}', 'utf-8');

    const request = new ServerlessRequest({
      method,
      url,
      headers,
      remoteAddress,
      body,
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    request.push = vitest.fn(request.push);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    request._read = vitest.fn(request._read);

    request._read(Math.random());

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(request.push).toHaveBeenNthCalledWith(1, body);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(request.push).toHaveBeenNthCalledWith(2, null);
  });
});
