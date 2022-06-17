<h1 align="center">
  🚀 Serverless Adapter
</h1>

<p align="center">
  <a href="#install">Install</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#support">Support</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#examples">Examples</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
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

# Documentation

See how to use this library [here](https://serverless-adapter.viniciusl.com.br/docs/category/getting-started).

# Examples

You can see some examples of how to use this library [here](https://github.com/H4ad/serverless-adapter-examples).

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
