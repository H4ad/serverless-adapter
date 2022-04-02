import {
  FrameworkContract,
  ServerlessRequest,
  ServerlessResponse,
  waitForStreamComplete,
} from '../../src';

export type TestRouteBuilderHandler<TApp> = (
  app: TApp,
  path: string,
  handler: (
    headers: any,
    body: any,
  ) => [statusCode: number, body: any, headers: any],
) => void;

export type TestRouteBuilderMethods = 'get' | 'post' | 'delete' | 'put';

export type TestRouteBuilder<TApp> = Record<
  TestRouteBuilderMethods,
  TestRouteBuilderHandler<TApp>
>;

export function createTestSuiteFor<TApp>(
  frameworkFactory: () => FrameworkContract<TApp>,
  appFactory: () => TApp,
  routeBuilder: TestRouteBuilder<TApp>,
): void {
  it('should forward request and receive response correctly', async () => {
    const options: [
      method: TestRouteBuilderMethods,
      path: string,
      statusCode: number,
      body: any,
      expectedValue?: string,
    ][] = [
      ['get', '/users', 200, [{ name: 'Joga10' }]],
      ['get', '/users/list', 200, []],
      ['get', '/users/1', 404, { didntFind: 'entity' }],
      ['get', '/users/2', 404, { notFound: true }],
      ['post', '/empty/route', 204, undefined, ''],
      ['post', '/users/error', 401, { unathorized: true }],
      ['post', '/users', 201, { success: true }],
      ['put', '/users/1', 201, { updated: true }],
      ['put', '/users/2', 404, { notFound: true }],
      ['put', '/users/3', 404, { didntFind: 'entity' }],
      ['delete', '/users/1', 200, { deleted: true }],
      ['delete', '/users/noreturn', 204, undefined, ''],
      ['delete', '/users/2', 401, { unathorized: true }],
      ['get', '/bad-gateway', 503, { error: true }],
    ];

    for (const [method, path, statusCode, body, expectedValue] of options) {
      const app = appFactory();

      routeBuilder[method](app, path, (requestHeaders, requestBody) => {
        expect(request.headers).toHaveProperty('request-header', 'true');
        expect(requestBody).toEqual(requestBody);

        return [statusCode, body, { 'response-header': 'true' }];
      });

      const framework = frameworkFactory();
      const request = new ServerlessRequest({
        method: method.toUpperCase(),
        url: path,
        headers: {
          'request-header': 'true',
        },
      });

      const response = new ServerlessResponse({
        method: method.toUpperCase(),
      });

      framework.sendRequest(app, request, response);

      await waitForStreamComplete(response);

      const resultBody = ServerlessResponse.body(response);

      expect(response.statusCode).toBe(statusCode);
      expect(ServerlessResponse.headers(response)).toHaveProperty(
        'response-header',
        'true',
      );
      expect(resultBody.toString('utf-8')).toEqual(
        expectedValue !== undefined ? expectedValue : JSON.stringify(body),
      );
    }
  });
}
