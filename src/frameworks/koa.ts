async function sendKoaRequest({ app, request, response }) {
  app.callback()(request, response);
}

export default {
  sendRequest: sendKoaRequest,
};
