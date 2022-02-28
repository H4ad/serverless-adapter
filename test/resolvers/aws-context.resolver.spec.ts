import type { Context } from 'aws-lambda';
import {
  AdapterContract,
  OnErrorProps,
  ResolverProps,
} from '../../src/v2/contracts';
import { ILogger } from '../../src/v2/core';
import { AwsContextResolver } from '../../src/v2/resolvers';

describe(AwsContextResolver.name, () => {
  let resolverFactory!: AwsContextResolver;
  let mockedContext!: Context;
  let mockedLogger!: ILogger;
  let mockedAdapter!: AdapterContract<any, any>;

  function onCallbackResolve(task: () => void): void {
    setTimeout(task, 200);
  }

  beforeEach(() => {
    resolverFactory = new AwsContextResolver();

    mockedContext = {
      succeed: jest.fn(),
      fail: jest.fn(),
    } as unknown as Context;

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

  it('should call correctly the context when succeed', done => {
    const resolverProps: ResolverProps<any, any, Context, any> = {
      log: mockedLogger,
      respondWithErrors: false,
      context: mockedContext,
      event: {},
      adapter: mockedAdapter,
    };

    const resolver = resolverFactory.createResolver(resolverProps);

    const result = resolver.run(() => Promise.resolve(true));

    expect(result).toBeUndefined();

    onCallbackResolve(() => {
      expect(resolverProps.context.succeed).toHaveBeenCalledWith(true);

      done();
    });
  });

  it('should call correctly the context when fail', done => {
    const resolverProps: ResolverProps<any, any, Context, any> = {
      log: mockedLogger,
      respondWithErrors: false,
      context: mockedContext,
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
      expect(resolverProps.context.fail).toHaveBeenCalledWith(error);

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

    expect(() =>
      resolverFactory.createResolver({
        log: mockedLogger,
        respondWithErrors: false,
        adapter: mockedAdapter,
        context: {} as unknown as Context,
        event: {},
      }),
    ).toThrowError();

    expect(() =>
      resolverFactory.createResolver({
        log: mockedLogger,
        respondWithErrors: false,
        adapter: mockedAdapter,
        context: {
          succeed: undefined,
          fail: jest.fn(),
        } as unknown as Context,
        event: {},
      }),
    ).toThrowError();

    expect(() =>
      resolverFactory.createResolver({
        log: mockedLogger,
        respondWithErrors: false,
        adapter: mockedAdapter,
        context: {
          succeed: jest.fn(),
          fail: undefined,
        } as unknown as Context,
        event: {},
      }),
    ).toThrowError();
  });
});
