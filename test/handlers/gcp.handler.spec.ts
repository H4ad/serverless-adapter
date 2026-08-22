import type { IncomingMessage, ServerResponse } from 'http';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import {
  DEFAULT_NETWORK,
  type FrameworkContract,
  type NetworkContract,
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import { GCPHandler } from '../../src/handlers/gcp';
import { FrameworkMock } from '../mocks/framework.mock';

const httpMock = vitest.hoisted(() => vitest.fn());

vitest.mock('@google-cloud/functions-framework', () => ({
  http: httpMock,
}));

class TestGCPHandler<TApp> extends GCPHandler<TApp> {
  public override onRequestCallback(
    app: TApp,
    framework: FrameworkContract<TApp>,
    network?: Pick<NetworkContract, 'createRequest'>,
  ): (req: IncomingMessage, res: ServerResponse) => void | Promise<void> {
    return super.onRequestCallback(app, framework, network);
  }
}

describe(GCPHandler.name, () => {
  beforeEach(() => {
    httpMock.mockClear();
  });

  it('should register the callback to the library', () => {
    const functionName = 'test';
    const gcpHandler = new TestGCPHandler(functionName);
    const mockFramework = new FrameworkMock(204, {});

    const mockedData = 'Mocked' as any;
    const mockedFn = () => mockedData;

    vitest.spyOn(gcpHandler, 'onRequestCallback').mockImplementation(mockedFn);

    const handler = gcpHandler.getHandler(null, mockFramework);

    expect(handler).toEqual(mockedData);
    expect(httpMock).toHaveBeenCalledWith(functionName, mockedData);
  });

  it('should use custom network to create the forwarded request', async () => {
    const method = 'POST';
    const url = '/users/batata';
    const remoteAddress = '168.16.0.1';
    const body = { test: true };
    const request = new ServerlessRequest({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': remoteAddress,
      },
      remoteAddress,
      body: body as any,
    });
    const response = new ServerlessResponse({ method });
    const customNetwork: NetworkContract = {
      createRequest: vitest.fn(props => DEFAULT_NETWORK.createRequest(props)),
      createResponse: vitest.fn(props => DEFAULT_NETWORK.createResponse(props)),
      getResponseBody: vitest.fn(result =>
        DEFAULT_NETWORK.getResponseBody(result),
      ),
      getResponseHeaders: vitest.fn(result =>
        DEFAULT_NETWORK.getResponseHeaders(result),
      ),
    };
    const handler = (new GCPHandler<null>('test').getHandler as any)(
      null,
      new FrameworkMock(200, { ok: true }),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      customNetwork,
    );

    handler(request, response);

    await waitForStreamComplete(response);

    expect(customNetwork.createRequest).toHaveBeenCalledWith({
      method,
      url,
      body: Buffer.from(JSON.stringify(body)),
      headers: {
        'content-length': Buffer.byteLength(JSON.stringify(body)).toString(),
        'content-type': 'application/json',
        'x-forwarded-for': remoteAddress,
      },
      remoteAddress,
    });
    expect(customNetwork.createResponse).not.toHaveBeenCalled();
    expect(customNetwork.getResponseBody).not.toHaveBeenCalled();
    expect(customNetwork.getResponseHeaders).not.toHaveBeenCalled();
  });
});
