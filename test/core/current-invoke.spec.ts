import { describe, expect, it } from 'vitest';
import { getCurrentInvoke, runWithCurrentInvoke } from '../../src';

const wait = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

describe('CurrentInvoke', () => {
  it('should initial values of getCurrentInvoke be null', () => {
    const initial = getCurrentInvoke();

    expect(initial).toBeDefined();

    expect(initial).toHaveProperty('event', null);
    expect(initial).toHaveProperty('context', null);
  });

  it('should get current invoke inside its async scope', async () => {
    const event = { batata: true };
    const context = { potato: true };

    const currentInvoke = await runWithCurrentInvoke(
      { event, context },
      async () => {
        await wait(0);

        return getCurrentInvoke();
      },
    );

    expect(currentInvoke).toHaveProperty('event', event);
    expect(currentInvoke).toHaveProperty('context', context);
  });

  it('should keep concurrent invokes isolated', async () => {
    const firstEvent = { id: 'first-event' };
    const firstContext = { id: 'first-context' };
    const secondEvent = { id: 'second-event' };
    const secondContext = { id: 'second-context' };

    const [firstInvoke, secondInvoke] = await Promise.all([
      runWithCurrentInvoke(
        { event: firstEvent, context: firstContext },
        async () => {
          await wait(5);

          return getCurrentInvoke();
        },
      ),
      runWithCurrentInvoke(
        { event: secondEvent, context: secondContext },
        async () => {
          await wait(0);

          return getCurrentInvoke();
        },
      ),
    ]);

    expect(firstInvoke).toHaveProperty('event', firstEvent);
    expect(firstInvoke).toHaveProperty('context', firstContext);
    expect(secondInvoke).toHaveProperty('event', secondEvent);
    expect(secondInvoke).toHaveProperty('context', secondContext);
    expect(getCurrentInvoke()).toEqual({ context: null, event: null });
  });

  it('should propagate synchronous errors thrown inside its scope', () => {
    const event = { id: 'event' };
    const context = { id: 'context' };
    const error = new Error('sync error');

    let thrownError: unknown;

    try {
      runWithCurrentInvoke({ event, context }, () => {
        expect(getCurrentInvoke()).toHaveProperty('event', event);
        expect(getCurrentInvoke()).toHaveProperty('context', context);

        throw error;
      });
    } catch (caughtError) {
      thrownError = caughtError;
    }

    expect(thrownError).toBe(error);
    expect(getCurrentInvoke()).toEqual({ context: null, event: null });
  });

  it('should propagate asynchronous errors rejected inside its scope', async () => {
    const event = { id: 'event' };
    const context = { id: 'context' };
    const error = new Error('async error');

    await expect(
      runWithCurrentInvoke({ event, context }, async () => {
        await wait(0);

        expect(getCurrentInvoke()).toHaveProperty('event', event);
        expect(getCurrentInvoke()).toHaveProperty('context', context);

        throw error;
      }),
    ).rejects.toBe(error);

    expect(getCurrentInvoke()).toEqual({ context: null, event: null });
  });
});
