# Serverless Adapter

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> Serverless Adapter

In development.

## Install

```bash
npm install @h4ad/serverless-adapter
```

## Usage

```ts
import serverlessExpress from '@h4ad/serverless-adapter';
import app from 'app';

const handler = serverlessExpress({ app });

export { handler };
```

[build-img]:https://github.com/H4ad/serverless-adapter/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/H4ad/serverless-adapter/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/serverless-adapter
[downloads-url]:https://www.npmtrends.com/serverless-adapter
[npm-img]:https://img.shields.io/npm/v/serverless-adapter
[npm-url]:https://www.npmjs.com/package/serverless-adapter
[issues-img]:https://img.shields.io/github/issues/H4ad/serverless-adapter
[issues-url]:https://github.com/H4ad/serverless-adapter/issues
[codecov-img]:https://codecov.io/gh/H4ad/serverless-adapter/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/H4ad/serverless-adapter
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
