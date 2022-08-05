// very ugly, i know, but i didn't find any other way, sorry
if (process.env.SKIP_DEEPKIT !== 'true')
  require('./utils-deepkit').runDeepkitTest();
else {
  it.skip('when nodejs is 12.x', () => {
    expect(true).toEqual(true);
  });
}
