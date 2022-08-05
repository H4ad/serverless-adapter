import {
  AdapterContract,
  AdapterRequest,
  BaseHandler,
  ILogger,
  ServerlessRequest,
  ServerlessResponse,
  createDefaultLogger,
} from '../../src';
import { AlbAdapter, SQSAdapter } from '../../src/adapters/aws';
import { createSQSEvent } from '../adapters/aws/utils/sqs';

class TestHandler<
  TApp,
  TEvent,
  TContext,
  TCallback,
  TResponse,
  TReturn,
> extends BaseHandler<TApp, TEvent, TContext, TCallback, TResponse, TReturn> {
  getHandler = jest.fn();

  /**
   * {@inheritDoc}
   */
  public getAdapterByEventAndContext(
    event: any,
    context: any,
    adapters: AdapterContract<TEvent, TContext, TResponse>[],
    log: ILogger,
  ): AdapterContract<TEvent, TContext, TResponse> {
    return super.getAdapterByEventAndContext(event, context, adapters, log);
  }

  /**
   * {@inheritDoc}
   */
  public getServerlessRequestResponseFromAdapterRequest(
    requestValues: AdapterRequest,
  ): [request: ServerlessRequest, response: ServerlessResponse] {
    return super.getServerlessRequestResponseFromAdapterRequest(requestValues);
  }
}

describe(BaseHandler.name, () => {
  it('should can resolve adapter by event and context', () => {
    const handler = new TestHandler();
    const testEvent = createSQSEvent();
    const eventAdapter = new SQSAdapter();
    const adapters = [eventAdapter, new AlbAdapter()];
    const context = {};
    const logger = createDefaultLogger();

    adapters.forEach(adapter => {
      // @ts-ignore
      adapter.canHandle = jest.fn(adapter.canHandle.bind(adapter));
    });

    expect(
      handler.getAdapterByEventAndContext(testEvent, context, adapters, logger),
    ).toBe(eventAdapter);

    adapters.forEach(adapter => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(adapter.canHandle).toHaveBeenCalledWith(
        testEvent,
        context,
        logger,
      );
    });
  });

  it('should throw error when could not resolve the adapter', () => {
    const handler = new TestHandler();
    const testEvent = {};
    const adapters = [];

    expect(() =>
      handler.getAdapterByEventAndContext(
        testEvent,
        {},
        adapters,
        createDefaultLogger(),
      ),
    ).toThrowError("Couldn't find adapter");
  });

  it('should throw error when resolve more than one adapter', () => {
    const handler = new TestHandler();
    const testEvent = createSQSEvent();
    const adapters = [new SQSAdapter(), new SQSAdapter()];
    const adapterNames = adapters
      .map(adapter => adapter.getAdapterName())
      .join(', ');

    expect(() =>
      handler.getAdapterByEventAndContext(
        testEvent,
        {},
        adapters,
        createDefaultLogger(),
      ),
    ).toThrowError(adapterNames);
  });

  it('should can create correctly request and response from adapter request', () => {
    const handler = new TestHandler();

    const testEvent = createSQSEvent();
    const adapter = new SQSAdapter({
      sqsForwardPath: '/sqs',
      sqsForwardMethod: 'POST',
    });

    const adapterRequest = adapter.getRequest(testEvent);

    const [request, response] =
      handler.getServerlessRequestResponseFromAdapterRequest(adapterRequest);

    expect(request).toBeInstanceOf(ServerlessRequest);
    expect(request).toHaveProperty('method', adapterRequest.method);
    expect(request).toHaveProperty('url', adapterRequest.path);
    expect(request).toHaveProperty('headers', adapterRequest.headers);
    expect(request).toHaveProperty('body', adapterRequest.body);
    expect(request.socket).toHaveProperty(
      'remoteAddress',
      adapterRequest.remoteAddress,
    );

    expect(response).toBeInstanceOf(ServerlessResponse);
  });
});
