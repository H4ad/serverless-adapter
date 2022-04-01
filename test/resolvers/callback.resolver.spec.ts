import {
  AdapterContract,
  OnErrorProps,
  ResolverProps,
} from '../../src/contracts';
import { ILogger } from '../../src/core';
import { CallbackResolver, ServerlessCallback } from '../../src/resolvers';

describe(CallbackResolver.name, () => {
  let resolverFactory!: CallbackResolver<unknown, unknown, unknown>;
  let mockedLogger!: ILogger;
  let mockedAdapter!: AdapterContract<unknown, unknown, unknown>;

  function onCallbackResolve(task: () => void): void {
    setTimeout(task, 200);
  }

  beforeEach(() => {
    resolverFactory = new CallbackResolver();

    mockedLogger = {
      error: jest.fn(),
    } as unknown as ILogger;

    mockedAdapter = {
      onErrorWhileForwarding: jest.fn(
        ({
          error,
          delegatedResolver,
          respondWithErrors,
          log,
          event,
        }: OnErrorProps<any, any>) => {
          expect(error).toBeInstanceOf(Error);
          expect(delegatedResolver).toHaveProperty('succeed');
          expect(delegatedResolver).toHaveProperty('fail');
          expect(typeof respondWithErrors).toBe('boolean');
          expect(log).toBe(mockedLogger);
          expect(event).toBeDefined();

          delegatedResolver.fail(error);
        },
      ),
    } as unknown as AdapterContract<any, any, any>;
  });

  it('should call correctly the callback when succeed', done => {
    const resolverProps: ResolverProps<
      any,
      any,
      ServerlessCallback<any>,
      any
    > = {
      log: mockedLogger,
      respondWithErrors: false,
      callback: jest.fn(),
      event: {},
      adapter: mockedAdapter,
    };

    const resolver = resolverFactory.createResolver(resolverProps);

    const result = resolver.run(() => Promise.resolve(true));

    expect(result).toBeUndefined();

    onCallbackResolve(() => {
      expect(resolverProps.callback).toHaveBeenCalledWith(null, true);

      done();
    });
  });

  it('should call correctly the callback when fail', done => {
    const resolverProps: ResolverProps<
      any,
      any,
      ServerlessCallback<any>,
      any
    > = {
      log: mockedLogger,
      respondWithErrors: false,
      callback: jest.fn(),
      event: {},
      adapter: mockedAdapter,
    };

    const error = new Error('error on test');

    const resolver = resolverFactory.createResolver(resolverProps);
    const result = resolver.run(() => Promise.reject(error));

    expect(result).toBeUndefined();

    onCallbackResolve(() => {
      expect(resolverProps.log.error).toHaveBeenCalled();

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(resolverProps.adapter.onErrorWhileForwarding).toHaveBeenCalled();
      expect(resolverProps.callback).toHaveBeenCalledWith(error, null);

      done();
    });
  });

  it('should return error when sending wrong arguments to build resolver', () => {
    expect(() =>
      resolverFactory.createResolver({
        log: mockedLogger,
        respondWithErrors: false,
        adapter: mockedAdapter,
        event: {},
      }),
    ).toThrowError();
  });
});
