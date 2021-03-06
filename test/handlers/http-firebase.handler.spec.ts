import {
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';
import { HttpFirebaseHandler } from '../../src/handlers/firebase';
import { FrameworkMock } from '../mocks/framework.mock';

jest.mock('firebase-admin', () => {
  const packages = {
    '12.x': 'firebase-admin-8',
    latest: 'firebase-admin',
  };
  const version = process.env.TEST_NODE_VERSION || 'latest';

  // Require the original module.
  const originalModule = jest.requireActual(packages[version]);

  return {
    __esModule: true,
    ...originalModule,
  };
});

describe(HttpFirebaseHandler.name, () => {
  it('should forward correctly the request to framework', async () => {
    const handlerFactory = new HttpFirebaseHandler();

    const method = 'POST';
    const url = '/users/batata';
    const headers = { 'Content-Type': 'application/json' };
    const remoteAddress = '168.16.0.1';
    const body = Buffer.from('{"test": true}', 'utf-8');

    const request = new ServerlessRequest({
      method,
      url,
      headers,
      remoteAddress,
      body,
    });

    const response = new ServerlessResponse({
      method,
    });

    const responseBody = { batata: true };
    const responseStatus = 200;
    const framework = new FrameworkMock(responseStatus, responseBody);

    const handler = handlerFactory.getHandler(null, framework);

    handler(request, response);

    await waitForStreamComplete(response);

    expect(response.statusCode).toBe(responseStatus);
    expect(ServerlessResponse.body(response).toString()).toStrictEqual(
      JSON.stringify(responseBody),
    );
  });
});
