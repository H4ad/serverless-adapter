import { OutgoingHttpHeaders } from 'http2';
import { ApolloServer, BaseContext, HeaderMap } from '@apollo/server';
import {
  ServerlessRequest,
  ServerlessResponse,
  getEventBodyAsBuffer,
  waitForStreamComplete,
} from '../../src';
import {
  ApolloServerContextArguments,
  ApolloServerFramework,
  DefaultServerlessApolloServerContext,
} from '../../src/frameworks/apollo-server';
import { JsonBodyParserFramework } from '../../src/frameworks/body-parser';
import { TestRouteBuilderMethods } from './utils';

export const frameworkTestOptions: [
  method: TestRouteBuilderMethods,
  path: string,
  query: string,
  statusCode: number,
  expectedValue: string,
  expectHeaderSet: boolean,
][] = [
  ['post', 'GetUser', 'message', 200, 'Joga10', true],
  ['post', 'ListUser', 'message', 200, 'Unkownn', true],
  ['post', 'UserCreated', 'message', 200, 'Created', true],
  ['post', 'WrongQuery', 'nonexist', 400, 'Cannot query field', false],
];

export function runApolloServerTests() {
  describe(ApolloServerFramework.name, () => {
    describe('test requests', () => {
      for (const [
        method,
        queryName,
        query,
        statusCode,
        expectedValue,
        expectHeaderSet,
      ] of frameworkTestOptions) {
        it(`${method}${queryName}: should forward request and receive response correctly`, async () => {
          const app = new ApolloServer<DefaultServerlessApolloServerContext>({
            typeDefs: 'type Query { message: String }',
            resolvers: {
              Query: {
                message: (_, __, context: ApolloServerContextArguments) => {
                  context.response.setHeader('response-header', 'true');

                  return expectedValue;
                },
              },
            },
          });

          app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

          const stringBody = JSON.stringify({
            query: `
            query Query {
              ${query}
            }
        `,
          });
          const [bufferBody, bodyLength] = stringBody
            ? getEventBodyAsBuffer(stringBody, false)
            : [undefined, 0];

          const framework = new JsonBodyParserFramework(
            new ApolloServerFramework<DefaultServerlessApolloServerContext>(),
          );

          const request = new ServerlessRequest({
            method: method.toUpperCase(),
            url: '/',
            headers: {
              'content-length': String(bodyLength),
              'request-header': 'true',
              'content-type': 'application/json',
            },
            body: bufferBody,
          });

          const response = new ServerlessResponse({
            method: method.toUpperCase(),
          });

          framework.sendRequest(app, request, response);

          await waitForStreamComplete(response);

          const resultBody = ServerlessResponse.body(response);

          expect(resultBody.toString('utf-8')).toContain(
            expectedValue !== undefined ? expectedValue : expectedValue,
          );
          if (expectHeaderSet) {
            expect(ServerlessResponse.headers(response)).toHaveProperty(
              'response-header',
              'true',
            );
          } else {
            expect(ServerlessResponse.headers(response)).not.toHaveProperty(
              'response-header',
              'true',
            );
          }
          expect(response.statusCode).toBe(statusCode);
        });
      }
    });

    describe('async iterator', () => {
      it('should handle well async iterator', async () => {
        const app = new ApolloServer<BaseContext>({
          typeDefs: 'type Query { message: String }',
          resolvers: {
            Query: {
              message: (_, __, context: ApolloServerContextArguments) => {
                context.response.setHeader('response-header', 'true');

                return 'ok';
              },
            },
          },
        });

        const asyncContent = ['hello', 'world', '!'];

        // eslint-disable-next-line @typescript-eslint/require-await
        async function* iterator(values) {
          for (let i = 0; i < values.length; i++) yield values[i];
        }

        jest.spyOn(app, 'executeHTTPGraphQLRequest').mockImplementation(() =>
          Promise.resolve({
            status: 200,
            headers: new HeaderMap(),
            body: {
              kind: 'chunked',
              asyncIterator: iterator(asyncContent),
            },
          }),
        );

        app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

        const stringBody = JSON.stringify({
          query: `
            query Query {
              message
            }
        `,
        });

        const [bufferBody, bodyLength] = stringBody
          ? getEventBodyAsBuffer(stringBody, false)
          : [undefined, 0];

        const framework = new JsonBodyParserFramework(
          new ApolloServerFramework(),
        );

        const request = new ServerlessRequest({
          method: 'POST',
          url: '/',
          headers: {
            'content-length': String(bodyLength),
            'request-header': 'true',
            'content-type': 'application/json',
          },
          body: bufferBody,
        });

        const response: ServerlessResponse & { flush?: () => void } =
          new ServerlessResponse({
            method: 'POST',
          });

        response.flush = jest.fn(() => void 0);

        framework.sendRequest(app, request, response);

        await waitForStreamComplete(response);

        const resultBody = ServerlessResponse.body(response);

        expect(resultBody.toString()).toEqual(asyncContent.join(''));
        expect(response.flush).toHaveBeenNthCalledWith(asyncContent.length);
      });
    });

    describe('possible headers', () => {
      it('should handle all types of OutgoingHttpHeaders', () => {
        const headers: OutgoingHttpHeaders = {
          test: 'test',
          foo: ['bar', 'boe'],
          bar: undefined,
          doe: 10,
        };

        const app = new ApolloServer<BaseContext>({
          typeDefs: 'type Query { doe: String }',
          resolvers: {},
        });

        jest
          .spyOn(app, 'executeHTTPGraphQLRequest')
          .mockImplementation(({ httpGraphQLRequest: { headers } }) => {
            const objHeaders = Object.fromEntries(headers.entries());

            expect(objHeaders).toHaveProperty('test', 'test');
            expect(objHeaders).toHaveProperty('foo', 'bar, boe');
            expect(objHeaders).toHaveProperty('doe', '10');
            expect(objHeaders).not.toHaveProperty('bar');

            return Promise.resolve({
              status: 200,
              body: { kind: 'complete', string: 'ok' },
              headers: new HeaderMap(),
            });
          });

        const request = new ServerlessRequest({
          method: 'POST',
          url: '/',
          headers: headers as any,
        });

        const response: ServerlessResponse = new ServerlessResponse({
          method: 'POST',
        });

        const framework = new ApolloServerFramework();

        framework.sendRequest(app, request, response);
      });
    });
  });
}
