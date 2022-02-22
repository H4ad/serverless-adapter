import { AdapterContract } from '../../../src/v2/contracts';
import { ILogger } from '../../../src/v2/core';
import { allEvents } from './events';

export function createCanHandleTestsForAdapter<T, TContext = any>(
  adapterFactory: () => AdapterContract<T, TContext>,
  context: TContext,
  logger: ILogger = {} as ILogger,
): void {
  let adapter!: AdapterContract<T, TContext>;

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

      for (const [, event] of events)
        expect(adapter.canHandle(event, context, logger)).toBe(false);
    });
  });
}
