import { ApolloServer } from '@apollo/server';
import { describe, expect, it, vitest } from 'vitest';
import type { SQSEvent } from 'aws-lambda';
import {
  type AdapterContract,
  EmptyResponse,
  type GetResponseAdapterProps,
  ServerlessRequest,
  ServerlessResponse,
  createDefaultLogger,
  waitForStreamComplete,
} from '../../../src';
import {
  ApolloServerMutationAdapter,
  type ApolloServerMutationAdapterOptions,
} from '../../../src/adapters/apollo-server';
import {
  DynamoDBAdapter,
  SNSAdapter,
  SQSAdapter,
} from '../../../src/adapters/aws';
import { ApolloServerFramework } from '../../../src/frameworks/apollo-server';
import { JsonBodyParserFramework } from '../../../src/frameworks/body-parser';
import { createDynamoDBEvent } from '../aws/utils/dynamodb';
import { createSNSEvent } from '../aws/utils/sns';
import { createSQSEvent } from '../aws/utils/sqs';

function createApolloServer({
  mutationName,
  queryDefinition,
}: {
  mutationName: string;
  queryDefinition: string;
}): ApolloServer {
  const schema = `
    type Query { message: String }

    type AWSResult ${queryDefinition}

    type Mutation {
      ${mutationName} (event: String): AWSResult
    }
  `;

  const app = new ApolloServer({
    typeDefs: schema,
    resolvers: {
      Query: {
        message: () => 'Hello World!',
      },
      Mutation: {
        [mutationName]: (_, data) => {
          return {
            result: data.event,
          };
        },
      },
    },
  });

  app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

  return app;
}

const options: [adapter: AdapterContract<any, any, any>, eventData: any][] = [
  [new SQSAdapter(), createSQSEvent()],
  [new SNSAdapter(), createSNSEvent()],
  [new DynamoDBAdapter(), createDynamoDBEvent()],
];

describe('integration: should be able to convert', () => {
  for (const [adapter, eventData] of options) {
    it(`${adapter.getAdapterName()}: should convert correctly`, async () => {
      const options: ApolloServerMutationAdapterOptions = {
        mutationName: 'aws',
        mutationResultQuery: '{ result }',
      };

      const app = createApolloServer({
        mutationName: 'aws',
        queryDefinition: '{ result: String }',
      });

      const mutationAdapter = new ApolloServerMutationAdapter(adapter, options);

      expect(
        mutationAdapter.canHandle(eventData, null, createDefaultLogger()),
      ).toEqual(true);

      const request = mutationAdapter.getRequest(
        eventData,
        null,
        createDefaultLogger(),
      );

      expect(request.method).toEqual('POST');

      const serverlessRequest = new ServerlessRequest({
        method: request.method,
        headers: request.headers,
        body: request.body,
        remoteAddress: request.remoteAddress,
        url: request.path,
      });

      const serverlessResponse = new ServerlessResponse({
        method: request.method,
      });

      const framework = new JsonBodyParserFramework(
        new ApolloServerFramework(),
      );

      framework.sendRequest(app, serverlessRequest, serverlessResponse);

      await waitForStreamComplete(serverlessResponse);

      expect(ServerlessResponse.body(serverlessResponse).toString()).toContain(
        JSON.stringify({
          data: {
            aws: {
              result: JSON.stringify(eventData),
            },
          },
        }),
      );

      const sqsAdapterSpy = vitest.spyOn(adapter, 'getResponse');

      const props = {
        response: serverlessResponse,
        body: ServerlessResponse.body(serverlessResponse).toString(),
        headers: ServerlessResponse.headers(serverlessResponse),
        log: createDefaultLogger(),
        event: eventData,
        statusCode: serverlessResponse.statusCode,
        isBase64Encoded: false,
      };
      const response = mutationAdapter.getResponse(props);

      expect(sqsAdapterSpy).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          ...props,
          body: JSON.stringify({
            result: JSON.stringify(eventData),
          }),
        }),
      );
      expect(response).toEqual(EmptyResponse);
    });
  }

  it('to __typename: when result query is not passed', async () => {
    const options: ApolloServerMutationAdapterOptions = {
      mutationName: 'aws',
    };

    const eventData = createSQSEvent();
    const adapter: AdapterContract<any, any, any> = new SQSAdapter();
    const app = createApolloServer({
      mutationName: 'aws',
      queryDefinition: '{_: Boolean}',
    });

    const mutationAdapter = new ApolloServerMutationAdapter(adapter, options);
    const request = mutationAdapter.getRequest(
      eventData,
      null,
      createDefaultLogger(),
    );
    const serverlessRequest = new ServerlessRequest({
      method: request.method,
      headers: request.headers,
      body: request.body,
      remoteAddress: request.remoteAddress,
      url: request.path,
    });

    const serverlessResponse = new ServerlessResponse({
      method: request.method,
    });
    const framework = new JsonBodyParserFramework(new ApolloServerFramework());

    framework.sendRequest(app, serverlessRequest, serverlessResponse);
    await waitForStreamComplete(serverlessResponse);

    const sqsAdapterSpy = vitest.spyOn(adapter, 'getResponse');

    const props = {
      response: serverlessResponse,
      body: ServerlessResponse.body(serverlessResponse).toString(),
      headers: ServerlessResponse.headers(serverlessResponse),
      log: createDefaultLogger(),
      event: eventData,
      statusCode: serverlessResponse.statusCode,
      isBase64Encoded: false,
    };
    const response = mutationAdapter.getResponse(props);

    expect(sqsAdapterSpy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        ...props,
        body: JSON.stringify({ __typename: 'AWSResult' }),
      }),
    );
    expect(response).toEqual(EmptyResponse);
  });

  it('to base adapter: when mutation does not exist', async () => {
    const options: ApolloServerMutationAdapterOptions = {
      mutationName: 'aws',
    };

    const eventData = createSQSEvent();
    const adapter: AdapterContract<any, any, any> = new SQSAdapter();
    const app = createApolloServer({
      mutationName: 'potato',
      queryDefinition: '{_: Boolean}',
    });

    const mutationAdapter = new ApolloServerMutationAdapter(adapter, options);
    const request = mutationAdapter.getRequest(
      eventData,
      null,
      createDefaultLogger(),
    );
    const serverlessRequest = new ServerlessRequest({
      method: request.method,
      headers: request.headers,
      body: request.body,
      remoteAddress: request.remoteAddress,
      url: request.path,
    });

    const serverlessResponse = new ServerlessResponse({
      method: request.method,
    });
    const framework = new JsonBodyParserFramework(new ApolloServerFramework());

    framework.sendRequest(app, serverlessRequest, serverlessResponse);
    await waitForStreamComplete(serverlessResponse);

    const sqsAdapterSpy = vitest.spyOn(adapter, 'getResponse');

    const props = {
      response: serverlessResponse,
      body: ServerlessResponse.body(serverlessResponse).toString(),
      headers: ServerlessResponse.headers(serverlessResponse),
      log: createDefaultLogger(),
      event: eventData,
      statusCode: serverlessResponse.statusCode,
      isBase64Encoded: false,
    };

    expect(() => mutationAdapter.getResponse(props)).toThrow(
      'Cannot query field',
    );
    expect(sqsAdapterSpy).toHaveBeenNthCalledWith(1, props);
  });
});

it('getAdapterName: should mutate the name of adapter', () => {
  const sqs = new SQSAdapter();
  const mutation = new ApolloServerMutationAdapter(sqs, {
    mutationName: 'aws',
  });

  expect(mutation.getAdapterName()).toEqual(`${sqs.getAdapterName()}Mutation`);
});

it('onErrorWhileForwarding: should forward error dealing to base adapter', () => {
  const sqs = new SQSAdapter();
  const spyedOnError = vitest.spyOn(sqs, 'onErrorWhileForwarding');

  const mutation = new ApolloServerMutationAdapter(sqs, {
    mutationName: 'aws',
  });

  const props = {
    event: {} as SQSEvent,
    log: createDefaultLogger(),
    error: new Error(),
    delegatedResolver: { fail: vitest.fn(), succeed: vitest.fn() },
    respondWithErrors: true,
  };

  mutation.onErrorWhileForwarding(props);

  expect(spyedOnError).toHaveBeenNthCalledWith(1, props);
});

it('getResponse: should forward props to base adapter when response has errors', () => {
  const sqs = new SQSAdapter();
  const spyedOnError = vitest.spyOn(sqs, 'getResponse');

  const mutation = new ApolloServerMutationAdapter(sqs, {
    mutationName: 'aws',
  });

  const props: GetResponseAdapterProps<any> = {
    log: createDefaultLogger(),
    event: {},
    body: JSON.stringify({ errors: { message: 'Wrong data' }, data: {} }),
    isBase64Encoded: false,
    statusCode: 400,
    headers: {},
  };

  expect(() => mutation.getResponse(props)).toThrow('"statusCode":400');
  expect(spyedOnError).toHaveBeenNthCalledWith(1, props);
});
