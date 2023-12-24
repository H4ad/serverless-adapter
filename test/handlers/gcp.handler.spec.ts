import type { IncomingMessage, ServerResponse } from 'http';
import { describe, expect, it, vitest } from 'vitest';
import { FrameworkContract } from '../../src';
import { GCPHandler } from '../../src/handlers/gcp';
import { FrameworkMock } from '../mocks/framework.mock';

class TestGCPHandler<TApp> extends GCPHandler<TApp> {
  public onRequestCallback(
    app: TApp,
    framework: FrameworkContract<TApp>,
  ): (req: IncomingMessage, res: ServerResponse) => void | Promise<void> {
    return super.onRequestCallback(app, framework);
  }
}

describe(GCPHandler.name, () => {
  it('should register the callback to the library', () => {
    const functionName = 'test';
    const gcpHandler = new TestGCPHandler(functionName);
    const mockFramework = new FrameworkMock(204, {});

    const mockedData = 'Mocked' as any;
    const mockedFn = () => mockedData;

    vitest.mock('@google-cloud/functions-framework', () => ({
      http: (name, fn) => {
        expect(name).toEqual('test');
        expect(fn).toEqual('Mocked');
      },
    }));

    vitest.spyOn(gcpHandler, 'onRequestCallback').mockImplementation(mockedFn);

    const handler = gcpHandler.getHandler(null, mockFramework);

    expect(handler).toEqual(mockedData);
  });
});
