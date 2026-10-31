import { ServerlessAdapter } from '@h4ad/serverless-adapter';
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

// benchmark 2.x runs a suite synchronously unless the deferred flag is set, and
// all three handlers below only settle on a later tick. Without the flag the
// promises pile up for the whole sampling window and the process runs out of
// heap, so every entry reports back through the deferred object instead.
suite.add(
  '@h4ad/serverless-adapter',
  {
    defer: true,
    fn: deferred =>
      Promise.resolve(handler(eventV1ApiGateway, context, callback))
        .then(() => deferred.resolve())
        .catch(deferred.reject),
  },
);
suite.add(
  '@vendia/serverless-express',
  {
    defer: true,
    fn: deferred =>
      Promise.resolve(vendiaHandler(eventV1ApiGateway, context, callback))
        .then(() => deferred.resolve())
        .catch(deferred.reject),
  },
);
suite.add(
  'serverless-http',
  {
    defer: true,
    fn: deferred =>
      Promise.resolve(serverlessHttpHandler(eventV1ApiGateway, context))
        .then(() => deferred.resolve())
        .catch(deferred.reject),
  },
);

suite
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();
