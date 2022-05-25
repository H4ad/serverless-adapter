import { DummyResolver } from '../../src/resolvers/dummy/dummy.resolver';

describe(DummyResolver.name, () => {
  it('should do nothing when called and return undefined', () => {
    const resolver = new DummyResolver();

    const task = jest.fn();

    resolver.createResolver().run(task);

    expect(task).not.toHaveBeenCalled();
  });
});
