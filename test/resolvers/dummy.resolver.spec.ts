import { describe, expect, it, vitest } from 'vitest';
import { DummyResolver } from '../../src/resolvers/dummy';

describe(DummyResolver.name, () => {
  it('should do nothing when called and return undefined', () => {
    const resolver = new DummyResolver();

    const task = vitest.fn();

    resolver.createResolver().run(task);

    expect(task).not.toHaveBeenCalled();
  });
});
