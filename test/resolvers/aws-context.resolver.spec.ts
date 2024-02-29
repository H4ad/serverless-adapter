import type { Context } from 'aws-lambda';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import type {
  AdapterContract,
  ILogger,
  OnErrorProps,
  ResolverProps,
} from '../../src';
import { AwsContextResolver } from '../../src/resolvers/aws-context';

describe(AwsContextResolver.name, () => {
  let resolverFactory!: AwsContextResolver<unknown, unknown, unknown>;
  let mockedContext!: Context;
  let mockedLogger!: ILogger;
  let mockedAdapter!: AdapterContract<unknown, unknown, unknown>;

  function onContextResolve(task: () => void): void {
    setTimeout(task, 200);
  }

  beforeEach(() => {
    resolverFactory = new AwsContextResolver();

    mockedContext = {
      succeed: vitest.fn(),
      fail: vitest.fn(),
    } as unknown as Context;

    mockedLogger = {
      error: vitest.fn(),
    } as unknown as ILogger;

    mockedAdapter = {
      onErrorWhileForwarding: vitest.fn(
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

  it('should call correctly the context when succeed', async () => {
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

    await new Promise<void>(resolve => {
      onContextResolve(() => {
        expect(resolverProps.context.succeed).toHaveBeenCalledWith(true);

        resolve();
      });
    });
  });

  it('should call correctly the context when fail', async () => {
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

    await new Promise<void>(resolve => {
      onContextResolve(() => {
        expect(resolverProps.log.error).toHaveBeenCalled();

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(resolverProps.adapter.onErrorWhileForwarding).toHaveBeenCalled();
        expect(resolverProps.context.fail).toHaveBeenCalledWith(error);

        resolve();
      });
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
          fail: vitest.fn(),
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
          succeed: vitest.fn(),
          fail: undefined,
        } as unknown as Context,
        event: {},
      }),
    ).toThrowError();
  });
});
