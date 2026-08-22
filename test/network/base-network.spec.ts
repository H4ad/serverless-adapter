import { describe, expect, it } from 'vitest';
import {
  DEFAULT_NETWORK,
  DefaultNetwork,
  ServerlessRequest,
  ServerlessResponse,
} from '../../src';

describe(DefaultNetwork.name, () => {
  it('should create default request and response objects', () => {
    const request = DEFAULT_NETWORK.createRequest({
      method: 'GET',
      url: '/users',
      headers: {},
      remoteAddress: '168.16.0.1',
    });

    const response = DEFAULT_NETWORK.createResponse({ method: 'GET' });

    expect(DEFAULT_NETWORK).toBeInstanceOf(DefaultNetwork);
    expect(request).toBeInstanceOf(ServerlessRequest);
    expect(request).toHaveProperty('ip', '168.16.0.1');
    expect(response).toBeInstanceOf(ServerlessResponse);
  });

  it('should skip defining the request ip property when disabled', () => {
    const network = new DefaultNetwork({ setRequestIp: false });

    const request = network.createRequest({
      method: 'GET',
      url: '/users',
      headers: {},
      remoteAddress: '168.16.0.1',
    });

    expect(Object.hasOwn(request, 'ip')).toBe(false);
    expect(request.socket).toHaveProperty('remoteAddress', '168.16.0.1');
  });
});
