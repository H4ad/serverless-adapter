describe('HttpDeepkitFramework', () => {
  // very ugly, i know, but i didn't find any other way, sorry
  if (process.env.SKIP_DEEPKIT === 'true') {
    it('when nodejs is 12.x', () => {
      expect(true).toEqual(true);
    });
  } else require('./utils-deepkit').runDeepkitTest();
});
