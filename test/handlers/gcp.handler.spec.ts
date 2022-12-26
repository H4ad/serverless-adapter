import { IncomingMessage, ServerResponse } from 'http';
import { GCPHandler } from '../../src/handlers/gcp/index';
import { FrameworkContract } from '../../src/index';
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

    const mockedData = Symbol('Mocked') as any;
    const mockedFn = () => mockedData;

    jest.mock('@google-cloud/functions-framework', () => ({
      http: (name, fn) => {
        expect(name).toEqual(functionName);
        expect(fn).toEqual(mockedData);
      },
    }));

    jest.spyOn(gcpHandler, 'onRequestCallback').mockImplementation(mockedFn);

    const handler = gcpHandler.getHandler(null, mockFramework);

    expect(handler).toEqual(mockedData);
  });
});
