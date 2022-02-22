async function sendExpressRequest({ app, request, response }) {
  app.handle(request, response);

  return Promise.resolve();
}

export default {
  sendRequest: sendExpressRequest,
};
