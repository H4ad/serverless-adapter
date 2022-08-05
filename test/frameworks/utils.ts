import {
  FrameworkContract,
  NO_OP,
  ServerlessRequest,
  ServerlessResponse,
  getEventBodyAsBuffer,
  waitForStreamComplete,
} from '../../src';

export type TestRouteBuilderHandler<TApp, TOutput = void> = (
  app: TApp,
  path: string,
  handler: (
    headers: any,
    body: any,
  ) => [statusCode: number, body: any, headers: any],
) => TOutput;

export type TestRouteBuilderMethods = 'get' | 'post' | 'delete' | 'put';

export type TestRouteBuilder<TApp> = Record<
  TestRouteBuilderMethods,
  TestRouteBuilderHandler<TApp>
>;

export const frameworkTestOptions: [
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
  ['post', '/users/error', 401, { unathorized: true }],
  ['post', '/users', 201, { success: true }],
  ['put', '/users/1', 201, { updated: true }],
  ['put', '/users/2', 404, { notFound: true }],
  ['put', '/users/3', 404, { didntFind: 'entity' }],
  ['delete', '/users/1', 200, { deleted: true }],
  ['delete', '/users/2', 401, { unathorized: true }],
  ['get', '/bad-gateway', 503, { error: true }],
];

export function createTestSuiteFor<TApp, TFrameworkApp = TApp>(
  frameworkFactory: () => FrameworkContract<TFrameworkApp>,
  appFactory: () => TApp | Promise<TApp>,
  routeBuilder: TestRouteBuilder<TApp>,
  appToFrameworkApp?: (TApp) => TFrameworkApp,
  tearDown?: (app: TApp) => Promise<void>,
  skip?: boolean,
): void {
  for (const [
    method,
    path,
    statusCode,
    body,
    expectedValue,
  ] of frameworkTestOptions) {
    const itFn = skip ? it.skip : it;

    itFn(
      `${method}${path}: should forward request and receive response correctly`,
      async () => {
        const app = await appFactory();

        routeBuilder[method](app, path, (requestHeaders, requestBody) => {
          expect(requestHeaders).toHaveProperty('request-header', 'true');

          if (
            (method === 'post' || method === 'put') &&
            requestBody !== NO_OP
          ) {
            const parsedRequestBody =
              requestBody instanceof Buffer
                ? JSON.parse(requestBody.toString('utf-8'))
                : requestBody;

            expect(parsedRequestBody || null).toEqual(body || null);
          }

          return [statusCode, body, { 'response-header': 'true' }];
        });

        const stringBody = body ? JSON.stringify(body) : body;
        const [bufferBody, bodyLength] = stringBody
          ? getEventBodyAsBuffer(stringBody, false)
          : [undefined, 0];

        const framework = frameworkFactory();
        const request = new ServerlessRequest({
          method: method.toUpperCase(),
          url: path,
          headers: {
            'content-length': String(bodyLength),
            'request-header': 'true',
            ...(body && {
              'content-type': 'application/json',
            }),
          },
          body: bufferBody,
        });

        const response = new ServerlessResponse({
          method: method.toUpperCase(),
        });

        const frameworkApp = appToFrameworkApp
          ? appToFrameworkApp(app)
          : (app as unknown as TFrameworkApp);

        framework.sendRequest(frameworkApp, request, response);

        await waitForStreamComplete(response);

        if (tearDown) await tearDown(app);

        const resultBody = ServerlessResponse.body(response);

        expect(resultBody.toString('utf-8')).toEqual(
          expectedValue !== undefined ? expectedValue : JSON.stringify(body),
        );
        expect(response.statusCode).toBe(statusCode);
        expect(ServerlessResponse.headers(response)).toHaveProperty(
          'response-header',
          'true',
        );
      },
    );
  }
}
