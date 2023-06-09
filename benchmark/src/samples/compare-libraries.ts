import { ServerlessAdapter } from '@h4ad/serverless-adapter/lib';
import { ApiGatewayV1Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import vendia from '@vendia/serverless-express';
import benchmark from 'benchmark';
import serverlessHttp from 'serverless-http';
import { createApiGatewayV1 } from '../events';
import { FrameworkMock } from '../framework.mock';

console.log('Running simply-forward.ts');

const framework = new FrameworkMock(200, { message: 'Hello world' });
const handler = ServerlessAdapter.new(null)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .setFramework(framework)
  .addAdapter(new ApiGatewayV1Adapter())
  .build();

const falseApp = (req, res) => framework.sendRequest(null, req, res);
const vendiaHandler = vendia({
  app: falseApp,
});

const serverlessHttpHandler = serverlessHttp(falseApp);

const context = {} as any;
const callback = {} as any;

const eventV1ApiGateway = createApiGatewayV1('GET', '/test');

const suite = new benchmark.Suite();

suite.add(
  '@h4ad/serverless-adapter',
  async () => await handler(eventV1ApiGateway, context, callback),
);
suite.add(
  '@vendia/serverless-express',
  async () => await vendiaHandler(eventV1ApiGateway, context, callback),
);
suite.add(
  'serverless-http',
  async () => await serverlessHttpHandler(eventV1ApiGateway, context),
);

suite
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({
    async: false,
  });
