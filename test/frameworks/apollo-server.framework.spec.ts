import { IncomingMessage, ServerResponse } from 'http';
import { ApolloServer, BaseContext } from '@apollo/server';
import {
  ServerlessRequest,
  ServerlessResponse,
  getEventBodyAsBuffer,
  waitForStreamComplete,
} from '../../src';
import {
  ApolloServerContextArguments,
  ApolloServerFramework,
} from '../../src/frameworks/apollo-server/apollo-server.framework';
import { TestOptions } from './utils';

export const frameworkTestOptions: TestOptions[] = [
  ['post', 'GetUser', 200, 'Joga10'],
  ['post', 'ListUser', 200, 'Unkownn'],
  ['post', 'UserCreated', 200, 'Created'],
];

describe(ApolloServerFramework.name, () => {
  for (const [
    method,
    query,
    statusCode,
    message,
    expectedValue,
  ] of frameworkTestOptions) {
    it(`${method}${query}: should forward request and receive response correctly`, async () => {
      interface ApolloCustomContext extends BaseContext {
        request: IncomingMessage;
        response: ServerResponse;
      }

      const app = new ApolloServer<ApolloCustomContext>({
        typeDefs: 'type Query { message: String }',
        resolvers: {
          Query: {
            message: (_, __, context: ApolloServerContextArguments[0]) => {
              context.response.setHeader('response-header', 'true');

              return message;
            },
          },
        },
      });

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

      const framework = new ApolloServerFramework<ApolloCustomContext>({
        context: context => Promise.resolve(context),
      });

      const request = new ServerlessRequest({
        method: method.toUpperCase(),
        url: `/?query=${query}`,
        headers: {
          'content-length': String(bodyLength),
          'request-header': 'true',
          ...(message && {
            'content-type': 'application/json',
          }),
        },
        body: bufferBody,
      });

      const response = new ServerlessResponse({
        method: method.toUpperCase(),
      });

      framework.sendRequest(app, request, response);

      await waitForStreamComplete(response);

      const resultBody = ServerlessResponse.body(response);

      expect(resultBody.toString('utf-8')).toEqual(
        expectedValue !== undefined
          ? expectedValue
          : JSON.stringify({ data: { message: message } }) + '\n',
      );
      expect(ServerlessResponse.headers(response)).toHaveProperty(
        'response-header',
        'true',
      );
      expect(response.statusCode).toBe(statusCode);
    });
  }
});
