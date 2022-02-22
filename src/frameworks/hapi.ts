async function sendHapiRequest({ app, request, response }) {
  app(request, response);

  return Promise.resolve();
}

export default {
  sendRequest: sendHapiRequest,
};
