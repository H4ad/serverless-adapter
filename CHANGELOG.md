CHANGES:

# [3.1.0](https://github.com/H4ad/serverless-adapter/compare/v3.0.0...v3.1.0) (2023-07-01)


### Bug Fixes

* **build:** disable minify identifiers ([0a285a6](https://github.com/H4ad/serverless-adapter/commit/0a285a6b2249d56ce39a762872bcc7cfb4515f8c))
* **package:** types not being emitted ([2bc1244](https://github.com/H4ad/serverless-adapter/commit/2bc124456f41855798ed7d5c4a132b2d83bf16fd))


### Features

* **aws:** added adapter for request lambda edge ([b8791da](https://github.com/H4ad/serverless-adapter/commit/b8791da9c4718a837d9ae01d89bba7b30067dc52))

# [3.0.0](https://github.com/H4ad/serverless-adapter/compare/v2.17.0...v3.0.0) (2023-06-09)


### Bug Fixes

* **api-gateway-v1:** probably missing query string value when multiple ([78b9f18](https://github.com/H4ad/serverless-adapter/commit/78b9f18dfb8a459f0c1557fdf702f68a078c098b))


* perf(api-gateway-v2)!: single pass when collecting headers and cookies on response ([3d65895](https://github.com/H4ad/serverless-adapter/commit/3d65895f174db00e2e45b3626223874a2d71f40a))
* refactor(core)!: removed support for regex on binary validation and case-sensitive headers ([4fb3a39](https://github.com/H4ad/serverless-adapter/commit/4fb3a39f0434d29d66b018f451698954ecbf3ed4))
* chore(nodejs)!: deprecate node 12.x, 14.x and 16.x ([4c734d4](https://github.com/H4ad/serverless-adapter/commit/4c734d4fed3bb9384b514ccf28d41f34c5360b76))


### Features

* **trpc:** bump support for 10.x ([5d3124a](https://github.com/H4ad/serverless-adapter/commit/5d3124a115dc44099fc681eec9592636374f85b8))


### Performance Improvements

* **api-gateway-v1:** faster getRequest ([70f7020](https://github.com/H4ad/serverless-adapter/commit/70f7020e347e57417920b32eb68d4456df7db246))
* **api-gateway-v2:** faster getRequest method ([3b08708](https://github.com/H4ad/serverless-adapter/commit/3b087087af1873414c85c8db09b5867c0752ab56))
* **aws:** optimized strip base path ([f72967a](https://github.com/H4ad/serverless-adapter/commit/f72967afaa1cdc4dbc95cc2298d560dc21b27884))
* **default-handler:** always log using fn ([36950b3](https://github.com/H4ad/serverless-adapter/commit/36950b36e246a43dc45d2d9ef2d989402eef916b))
* **headers:** use object.keys + reduce instead of entries ([41339c6](https://github.com/H4ad/serverless-adapter/commit/41339c681f52b05328097a8b4cbb9cf27e704a84))
* **logger:** faster logger ([103817c](https://github.com/H4ad/serverless-adapter/commit/103817c7a284dabedb78807d6db7fbf2ed42ed75))
* **optional:** use strict equal instead of typeof ([1fba12c](https://github.com/H4ad/serverless-adapter/commit/1fba12c6e22089376437a8976971ad30df1283e1))
* **tsconfig:** do not use define because is slower ([35ce7c7](https://github.com/H4ad/serverless-adapter/commit/35ce7c738b69a39b7179f1d8cae40924967ad0cd))


### Tests

* **vitest:** replaced jest for vitest ([7505fad](https://github.com/H4ad/serverless-adapter/commit/7505fad2b3078aabbc72c105033043c597842933))


### BREAKING CHANGES

* now we don't flatten the headers
* now regex is not support anymore due the slow performance and we don't lower case
all the headers, so the content-encoding and content-type must be lowercase
* **vitest:** removed support for fastify 3.0.0 & hapi 20.x & firebase-admin < 11
* Now we will no longer support old nodejs versions
