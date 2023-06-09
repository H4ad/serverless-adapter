import { beforeEach, describe, expect, it } from 'vitest';
import { AdapterContract, ILogger } from '../../../src';
import { allEvents } from './events';

export function createCanHandleTestsForAdapter<
  T,
  TContext = any,
  TResponse = any,
>(
  adapterFactory: () => AdapterContract<T, TContext, TResponse>,
  context: TContext,
  logger: ILogger = {} as ILogger,
): void {
  let adapter!: AdapterContract<T, TContext, TResponse>;

  beforeEach(() => {
    adapter = adapterFactory();
  });

  describe('canHandle', () => {
    it('should return true when is valid event', () => {
      const events = allEvents.filter(
        ([adapterName]) => adapterName === adapter.getAdapterName(),
      )!;

      expect(events.length).toBeGreaterThan(0);

      for (const [, event] of events)
        expect(adapter.canHandle(event, context, logger)).toBe(true);
    });

    it('should return false when is not a valid event', () => {
      const events = allEvents.filter(
        ([adapterName]) => adapterName !== adapter.getAdapterName(),
      );

      expect(events.length).toBeGreaterThan(0);

      for (const [adapterName, event] of events) {
        const canHandle = adapter.canHandle(event, context, logger);

        expect(`${adapterName}: ${canHandle}`).toEqual(`${adapterName}: false`);
      }
    });
  });
}
