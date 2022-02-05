async function sendHapiRequest({ app, request, response }) {
  app(request, response);
}

export default {
  sendRequest: sendHapiRequest,
};
