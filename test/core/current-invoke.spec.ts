import { getCurrentInvoke, setCurrentInvoke } from '../../src/v2/core';

describe('CurrentInvoke', () => {
  it('should initial values of getCurrentInvoke be null', () => {
    const initial = getCurrentInvoke();

    expect(initial).toBeDefined();

    expect(initial).toHaveProperty('event', null);
    expect(initial).toHaveProperty('context', null);
  });

  it('should set and get current invoke without problems', () => {
    const event = { batata: true };
    const context = { potato: true };

    expect(() => setCurrentInvoke({ event, context })).not.toThrowError();

    const currentInvoke = getCurrentInvoke();

    expect(currentInvoke).toHaveProperty('event', event);
    expect(currentInvoke).toHaveProperty('context', context);
  });
});
