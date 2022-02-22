async function sendKoaRequest({ app, request, response }) {
  app.callback()(request, response);

  return Promise.resolve();
}

export default {
  sendRequest: sendKoaRequest,
};
