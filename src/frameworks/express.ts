async function sendExpressRequest({ app, request, response }) {
  app.handle(request, response);
}

export default {
  sendRequest: sendExpressRequest,
};
