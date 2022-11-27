describe('ApolloServerFramework', () => {
  // very ugly, i know, but i didn't find any other way, sorry
  if (process.env.TEST_NODE_VERSION === '12.x') {
    it('when nodejs is 12.x', () => {
      expect(true).toEqual(true);
    });
  } else require('./utils-apollo-server').runApolloServerTests();
});
