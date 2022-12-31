<h1 align="center">
  🚀 Serverless Adapter
</h1>

<p align="center">
  <a href="#install">Install</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#support">Support</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#examples">Examples</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#benchmark">Benchmark</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
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

Run REST APIs and other web applications using your existing Node.js application framework (NestJS, Deepkit, Express, Koa, Hapi,
Fastify, tRPC and Apollo Server), on top of AWS Lambda, Azure, Digital Ocean and many other clouds.

This library was a refactored version of [@vendia/serverless-express](https://github.com/vendia/serverless-express), I
create a new way to interact and extend event sources by creating contracts to abstract the integrations between each
library layer.

Why you would use this libray instead of [@vendia/serverless-express](https://github.com/vendia/serverless-express)?

- Better APIs to extend library functionality.
  - You don't need me to release a new version to integrate with the new event source, you can create an adapter and
    just call the `addAdapter` method when building your handler.
- All code can be extended, if you want to modify the current behavior you can.
  - This is important because if you find a bug, you can quickly resolve it by extending the class, _and then you can
    submit a PR to fix the bug_.
- All code was written in Typescript.
- Well documented, any method, class, or interface has comments to explain the behavior.
- We have >99% coverage.

# Installing

To be able to use, first install the library:

```bash
npm i --save @h4ad/serverless-adapter
```

# Usage

To start to use, first you need to know what you need to import, let's start showing the [ServerlessAdapter](/docs/api/ServerlessAdapter).

```tsx
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
```

We need to pass to [Serverless Adapter](/docs/api/ServerlessAdapter) the instance of your api, let's look an example with:

- Framework: [Express](../frameworks/express).
- Adapters: [AWS Api Gateway V2 Adapter](../adapters/aws/api-gateway-v2).
- Handler: [Default Handler](../handlers/default).
- Resolver: [Promise Resolver](../resolvers/promise).

```ts
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';

const express = require('express');

const app = express();
export const handler = ServerlessAdapter.new(app)
  .setFramework(new ExpressFramework())
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  // if you need more adapters
  // just append more `addAdapter` calls
  .build();
```

# Documentation

See how to use this library [here](https://viniciusl.com.br/serverless-adapter/docs/category/getting-started).

# Examples

You can see some examples of how to use this library [here](https://github.com/H4ad/serverless-adapter-examples).

# Benchmark

See the speed comparison between other libraries that have the same purpose in the [Benchmark Section](./benchmark).

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
