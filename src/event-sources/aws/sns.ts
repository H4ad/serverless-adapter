import { emptyResponseMapper } from '../utils';

const getRequestValuesFromSns = ({ event }) => {
  const method = 'POST';
  const headers = { host: 'sns.amazonaws.com' };
  const body = event;

  return {
    method,
    headers,
    body,
  };
};

export default {
  getRequest: getRequestValuesFromSns,
  getResponse: emptyResponseMapper,
};
