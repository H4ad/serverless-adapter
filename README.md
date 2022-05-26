<h1 align="center">
  🚀 Serverless Adapter
</h1>

<p align="center">
  <a href="#install">Install</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#support">Support</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#architecture">Architecture</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#credits">Credits</a>
</p>

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

Run REST APIs and other web applications using your existing Node.js application framework (Express, Koa, Hapi and
Fastify), on top of AWS Lambda, Huawei and many other clouds.

This library was a refactored version of [@vendia/serverless-express](https://github.com/vendia/serverless-express), I
created a new way to interact and extend event sources by creating contracts to abstract the integrations between each
library layer.

Why you would use this libray instead of [@vendia/serverless-express](https://github.com/vendia/serverless-express)?

- Better APIs to extend library functionality.
  - You don't need me to release a new version to integrate with the new event source, you can create an adapter and
    just call the `addAdapter` method when building your handler.
- All code can be extended, if you want to modify the current behavior you can.
  - This is important because if you find a bug, you can quickly resolve it by extending the class, _and then you can
    submit a PR to fix the bug_.
- All code was written in Typescript.
- We have >99% coverage.

# Install

Using NPM:

```bash
npm install --save @h4ad/serverless-adapter
```

Using Yarn:

```bash
yarn add @h4ad/serverless-adapter
```

# Usage

You can quickly use this library as follows:

```ts
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter, AlbAdapter, SQSAdapter, SNSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import app from './app';

export const handler = ServerlessAdapter.new(app)
  .setFramework(new ExpressFramework())
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new AlbAdapter())
  .addAdapter(new SQSAdapter())
  .addAdapter(new SNSAdapter())
  .build();
```

Too fast? Ok, I can explain.

First, you need to create an instance of the builder with `ServerlessAdapter.new(app)`. The variable `app` is the
instance of your framework (Express, Fastify, Koa, etc).

So you need to specify for this library which `framework` you will use to handle the `request` with `setFramework`, you
can only use one. If you use express in our backend, use [ExpressFramework](src/frameworks/express/express.framework.ts)
, see more in [support](#support).

Then you specify which `handler` you will use to interact with the serverless cloud with `setHandler`, currently we only
have one, the [DefaultHandler](src/handlers/default/default.handler.ts). In the next releases, maybe we will add support
for Azure, Huawei and others, for now, you can use this default.

Then you specify with `setResolver` which `resolver` you will use to wait for the library to forward the request to
your `framework`, and then get the `response` back to your cloud. I recommend you
use [PromiseResolver](src/resolvers/promise/promise.resolver.ts), it's the most cloud-agnostic `resolver`.

By now, you've already added the basic abstractions of this library, now, you can add the `adapters` that will add
support for receiving and processing different sources of `addAdapter` events. In the example I
added [AlbAdapter](./src/adapters/aws/alb.adapter.ts), [SQSAdapter](./src/adapters/aws/sqs.adapter.ts)
and [SNSAdapter](./src/adapters/aws/sns.adapter.ts). With these adapters you can connect your lambda to three different
event sources and you can add more if you wish.

Finally, we call `build` which will assemble your handler that you can expose directly to your cloud.

Final thoughts:

- You can set the `framework` only once.
- You can set the `handler` only once.
- You can set the `resolver` only once.
- You can have as many `adapters` as you like, use and extend as you wish.

# Support

> We are in beta, so some adapters may not work as expected, feel free to create an issue or provide feedback on current behavior.

By design we have these contracts that define the layers of the library: Frameworks, Adapters, Resolvers and Handlers.

> If you don't know what each thing means, see [Architecture](#architecture).

Currently, we support these frameworks:

- [Express](https://expressjs.com/) by using ([ExpressFramework](src/frameworks/express/express.framework.ts))
- [Fastify](https://www.fastify.io/) by using ([FastifyFramework](src/frameworks/fastify/fastify.framework.ts))
- [Hapi](https://hapi.dev/) by using ([HapiFramework](src/frameworks/hapi/hapi.framework.ts))
- [Koa](https://koajs.com/) by using ([KoaFramework](src/frameworks/koa/koa.framework.ts))

We support these event sources:

- AWS
  - [AWS Load Balancer](https://docs.aws.amazon.com/lambda/latest/dg/services-alb.html) by
    using ([AlbAdapter](./src/adapters/aws/alb.adapter.ts))
  - [AWS Api Gateway V1](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)
    by using ([ApiGatewayV1Adapter](./src/adapters/aws/api-gateway-v1.adapter.ts))
  - [AWS Api Gateway V2](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)
    by using ([ApiGatewayV2Adapter](./src/adapters/aws/api-gateway-v2.adapter.ts))
  - [AWS DynamoDB](https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html) by
    using ([DynamoDBAdapter](./src/adapters/aws/dynamodb.adapter.ts))
  - [AWS Event Bridge / CloudWatch Events](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html)
    by using ([EventBridgeAdapter](./src/adapters/aws/event-bridge.adapter.ts))
  - [AWS Lambda Edge](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html) by
    using ([LambdaEdgeAdapter](./src/adapters/aws/lambda-edge.adapter.ts))
  - [AWS SNS](https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sns.html) by
    using ([SNSAdapter](./src/adapters/aws/sns.adapter.ts))
  - [AWS SQS](https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sqs.html) by
    using ([SQSAdapter](./src/adapters/aws/sqs.adapter.ts))
- Huawei
  - [Http Function](https://support.huaweicloud.com/intl/en-us/usermanual-functiongraph/functiongraph_01_1442.html): Look [this section](#huawei-http-function) about Huawei support for Http Function.
  - [Event Function](https://support.huaweicloud.com/intl/en-us/usermanual-functiongraph/functiongraph_01_1441.html): 
    - [Api Gateway](https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0102.html#functiongraph_02_0102__li5178638110137) by using ([HuaweiApiGatewayAdapter](src/adapters/huawei/huawei-api-gateway.adapter.ts)).
- Azure
  - [The support is coming soon.](https://github.com/H4ad/serverless-adapter/issues/3)
- Firebase
  - The support is coming soon.
- GCP
  - The support is coming soon.

We support these resolvers:

- Promise by using ([PromiseResolver](src/resolvers/promise/promise.resolver.ts))
- Callback by using ([CallbackResolver](src/resolvers/callback/callback.resolver.ts))
- AWS Context by using ([AwsContextResolver](src/resolvers/aws-context/aws-context.resolver.ts))

We support these handlers:

- Default by using ([DefaultHandler](src/handlers/default/default.handler.ts))
- Huawei by using ([HttpHuaweiHandler](src/handlers/huawei/http-huawei.handler.ts)) and ([EventHuaweiHandler](#huawei-event-function))

## Huawei

In Huawei, we added support to FunctionGraphV2 with Http Function and Event Function.

The difference between Http Function and Event Function is that in Http Function you must expose port 8000 and Huawei will proxy Api Gateway requests to your application.
So, on implementation, this library will create an http server to listen on port 8000 and forward the request to your framework.

In Event Function, you will receive the event from event source in the same way you receive in AWS, an object with some structure, you can see the supported event sources [here](https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0102.html).

### Huawei Http Function

To integrate your app with Huawei FunctionGrapth with the Http Function type, you must do the following:

```ts
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { HttpHuaweiHandler } from '@h4ad/serverless-adapter/lib/handlers/huawei';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';
import app from './app';

// instead exposing handler, you have the dispose function
// this dispose function is never called
// but you can to close the http server created with him
const dispose = ServerlessAdapter.new(app)
    .setHandler(new HttpHuaweiHandler())
    .setFramework(new ExpressFramework())
    // dummy resolver and adapter is used because
    // they are necessary in the core of the library to build
    // but is optional to make huawei http function works.
    .setResolver(new DummyResolver())
    .addAdapter(new DummyAdapter())
    .build();
```

> You don't need to expose a variable called `handler` when you choose Http Function, you just need to call build to the library create a http server.

By the way of Huawei architecture in Http Function, they have no use for Resolvers and Adapters, so you need to use the dummy versions because the library requires it.

#### ONE IMPORTANT THING

You need to configure a file called `bootstrap` in the root of folder that you upload to Huawei, is like the file `Procfile` but for Huawei.

In my setup, I configure like:
```
node /opt/function/code/index.js
```

The path `/opt/function/code` is where your code is uploaded when you deploy something and `index.js` is the file that contains the `ServerlessAdapter`.

In the end, the structure of the zip file you upload looks like this:

- `bootstrap`
- `index.js`

### Huawei Event Function

With Http Function you need to use [HttpHuaweiHandler](src/handlers/huawei/http-huawei.handler.ts), 
but with Event Function you should use [DefaultHandler](src/handlers/default/default.handler.ts).

So, to add support to Api Gateway you do the following:

```ts
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { HuaweiApiGatewayAdapter } from '@h4ad/serverless-adapter/lib/adapters/huawei';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import app from './app';

export const handler = ServerlessAdapter.new(app)
  .setFramework(new ExpressFramework())
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new HuaweiApiGatewayAdapter())
  .build();
```

# Architecture

The main purpose of this library is to allow the developer to add support for any cloud and as many event sources as he
wants, without having to create an issue to request the feature or copy the library code because the library doesn't
expose good APIs for you to extend its functionality

So I refactored [@vendia/serverless-express](https://github.com/vendia/serverless-express) with 4 layers of abstraction:
Framework, Handler, Resolver and Adapter.

The [FrameworkContract](./src/contracts/framework.contract.ts) is responsible for forwarding
to [IncomingMessage](https://nodejs.org/api/http.html#class-httpincomingmessage)
and [ServerResponse](https://nodejs.org/api/http.html#class-httpserverresponse) for your application instance. With this
abstraction you can implement any framework you want, they just need to accept both parameters and
call [end](https://nodejs.org/api/http.html#class-httpserverresponse)
in [ServerResponse](https://nodejs.org/api/http.html#class-httpserverresponse), so the library knows when to continue
and return the response.

The [HandlerContract](./src/contracts/handler.contract.ts) is responsible to get the input from the serverless and then
manage to call each layer of abstraction to return a response. With this abstraction, you can implement different ways
to receive input from your serverless environment. They usually have the same structure, but if you need to deal with a
very different cloud, you can use this abstraction to add support for that cloud.

> Handler is a good choice for implementing (~~monsters~~) ways to receive input.
> For example, we can create an http server as its handler to test our serverless code without having to launch the framework. Because? I don't know, but you can.

The [ResolverContract](./src/contracts/resolver.contract.ts) is responsible for waiting for the framework to handle the
request and then returning the response to the cloud. Using AWS for example, you have three ways to wait for the
response: returning a promise, calling the callback, and ~~using in-context methods~~, each option has its own benefits,
but generally the promise option will be the better because any good cloud provider will support promises.

Finally, the masterpiece of this library, the [AdapterContract](./src/contracts/adapter.contract.ts) is responsible for
handling the received event, transforming the request in a way that your application can understand and then
transforming the response in a way your cloud can understand.

Well, with these four contracts, you'll be able to add support to any cloud that exists (no more excuses not to use
cloud X with NodeJS).

## Why you create this library?

The real reason I created this library was because I wanted to add API Gateway and SQS support at the same time to save
some money. But, [@vendia/serverless-express](https://github.com/vendia/serverless-express) was not supported, so
I [created a PR](https://github.com/vendia/serverless-express/pull/483), but until I finished this library, that PR was
never accepted.

So I build my own library based on that library with better APIs so I never have to wait for the maintainer to accept my
PR just to extend the library's functionality :)

# Credits

Honestly, I just refactored all the code that the @vendia team and many other contributors wrote, thanks so much to them
for existing and giving us a brilliant library that is the core of my current company.

# Sponsors

| <a href="https://liga.facens.br/"><img height="50" src="https://mlogu6g7z5ex.i.optimole.com/yEwfkqo-4R0ttNtd/w:auto/h:auto/q:mauto/f:avif/http://liga.facens.br/wp-content/uploads/2020/03/logo-1.png" title="The LIGA logo" width="100"/></a> |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|


[build-img]:https://github.com/H4ad/serverless-adapter/actions/workflows/release.yml/badge.svg

[build-url]:https://github.com/H4ad/serverless-adapter/actions/workflows/release.yml

[downloads-img]:https://img.shields.io/npm/dt/serverless-adapter

[downloads-url]:https://www.npmtrends.com/@h4ad/serverless-adapter

[npm-img]:https://img.shields.io/npm/v/@h4ad/serverless-adapter

[npm-url]:https://www.npmjs.com/package/@h4ad/serverless-adapter

[issues-img]:https://img.shields.io/github/issues/H4ad/serverless-adapter

[issues-url]:https://github.com/H4ad/serverless-adapter/issues

[codecov-img]:https://codecov.io/gh/H4ad/serverless-adapter/branch/main/graph/badge.svg

[codecov-url]:https://codecov.io/gh/H4ad/serverless-adapter

[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[semantic-release-url]:https://github.com/semantic-release/semantic-release

[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[commitizen-url]:http://commitizen.github.io/cz-cli/
