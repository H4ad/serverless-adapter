# Changelog

## [4.3.1](https://github.com/H4ad/serverless-adapter/compare/v4.3.0...v4.3.1) (2024-11-09)


### Miscellaneous Chores

* bump cookie and express in /www ([22d850f](https://github.com/H4ad/serverless-adapter/commit/22d850fab96240c110ee6fbc75473c8bbefd11c2))
* bump serve-static and express in /benchmark ([249af0c](https://github.com/H4ad/serverless-adapter/commit/249af0c9d3dfa1f5fda23f8a49f720f3c96c4f07))
* **codecov:** fix issues with upload coverage ([4b5b39e](https://github.com/H4ad/serverless-adapter/commit/4b5b39e7c54d5b37913a9d7866a626515b8c06b6))
* **reflect-metadata:** allow more general versions for reflect metadata ([816cc51](https://github.com/H4ad/serverless-adapter/commit/816cc51afee8024907eb399ed9fe625f828c98ad))

## [4.3.0](https://github.com/H4ad/serverless-adapter/compare/v4.2.3...v4.3.0) (2024-09-18)


### Features

* **aws-stream-handler:** add flag to customize callbackWaitsForEmptyEventLoop ([#264](https://github.com/H4ad/serverless-adapter/issues/264)) ([30a59f9](https://github.com/H4ad/serverless-adapter/commit/30a59f99e83cd16f5a7c37bc4296f7501f59fd36))

## [4.2.3](https://github.com/H4ad/serverless-adapter/compare/v4.2.2...v4.2.3) (2024-09-09)


### Bug Fixes

* **response-stream:** improve chunk identification (fixes [#260](https://github.com/H4ad/serverless-adapter/issues/260)) ([2aa474e](https://github.com/H4ad/serverless-adapter/commit/2aa474e02c533d31b5086866a78afdedd3058f04))


### Documentation

* **response-stream:** add comments and references explaining implementation ([d39db53](https://github.com/H4ad/serverless-adapter/commit/d39db532a2ca9ebd7754dd364f88cf8bf0ed0a18))


### Tests

* **response-stream:** test eagerly flushed headers ([0f33c29](https://github.com/H4ad/serverless-adapter/commit/0f33c29e2bfc99194c61887bb908763625e357b7))

## [4.2.2](https://github.com/H4ad/serverless-adapter/compare/v4.2.1...v4.2.2) (2024-09-06)


### Bug Fixes

* **apig-v1-adapter:** lowercase request headers ([4fbb588](https://github.com/H4ad/serverless-adapter/commit/4fbb5880283ba0fad54374baeb572ca706b804e6))


### Documentation

* fix Apollo Server package name in npm command ([4d4cece](https://github.com/H4ad/serverless-adapter/commit/4d4ceced9d2f882f7431830134d293c187aff4f3))
* **getting-started:** update npm install command ([ee4661f](https://github.com/H4ad/serverless-adapter/commit/ee4661fc3a7a3d518d4ff3f4ff033ce5a01066ba))


### Miscellaneous Chores

* bump express from 4.18.2 to 4.19.2 in /benchmark ([98e84d1](https://github.com/H4ad/serverless-adapter/commit/98e84d1a6cb7d05bab6506bf2225573c8bd6e50d))

## [4.2.1](https://github.com/H4ad/serverless-adapter/compare/v4.2.0...v4.2.1) (2024-02-29)


### Bug Fixes

* **response-stream:** fix response with no content doesn't correctly end the writable stream ([bded8cf](https://github.com/H4ad/serverless-adapter/commit/bded8cfe32a853529fea7334658709b12b2971e1))


### Code Refactoring

* **apollo-server-mutation:** better types for adapter ([79f3383](https://github.com/H4ad/serverless-adapter/commit/79f33833c4368282d421495b6f7a70a700bd06bb))
* **response-stream:** avoid creating object on log while parsing headers ([1effcae](https://github.com/H4ad/serverless-adapter/commit/1effcaebf23e83188d4836693428f1953d0403be))


### Tests

* **all:** cleaning tests and fixing ts issues ([c3dcfff](https://github.com/H4ad/serverless-adapter/commit/c3dcfff58ac3bc29294337abd074c567724a8198))
* **aws-stream:** add tests to cover [#206](https://github.com/H4ad/serverless-adapter/issues/206) ([c853149](https://github.com/H4ad/serverless-adapter/commit/c853149a6295f015b467825f20a60790cb346f65))

## [4.2.0](https://github.com/H4ad/serverless-adapter/compare/v4.1.0...v4.2.0) (2024-01-08)


### Features

* **frameworks:** added support for polka ([39377cb](https://github.com/H4ad/serverless-adapter/commit/39377cb16b20bdba7b724663b8076a6a394851a6))


### Miscellaneous Chores

* bump @apollo/server from 4.9.5 to 4.10.0 ([cf4e1d9](https://github.com/H4ad/serverless-adapter/commit/cf4e1d9485fe174c68ae1b70dc2c6d6e7a220c02))
* bump @rushstack/node-core-library from 3.62.0 to 3.63.0 ([19c88e0](https://github.com/H4ad/serverless-adapter/commit/19c88e01c74a8e4735ba66f6b5b77b2cbd579897))
* bump @vitest/coverage-v8 from 1.1.0 to 1.1.3 ([3e67b23](https://github.com/H4ad/serverless-adapter/commit/3e67b23dba80b00c65667c312578f07d39111919))
* bump eslint-plugin-prettier from 5.1.1 to 5.1.2 ([83fc5e5](https://github.com/H4ad/serverless-adapter/commit/83fc5e5cac5a08701815a6c73563a51866fdcbf9))
* bump fastify from 4.25.1 to 4.25.2 ([e048b11](https://github.com/H4ad/serverless-adapter/commit/e048b117034c2f4e7f3b25467dd24fa3b754e684))
* bump follow-redirects from 1.15.3 to 1.15.4 in /www ([af12bbd](https://github.com/H4ad/serverless-adapter/commit/af12bbd55d264dc2be668e24cb1f551e333f33ba))
* bump koa from 2.14.2 to 2.15.0 ([164c97b](https://github.com/H4ad/serverless-adapter/commit/164c97ba10e6d0ee4661bc980d279262f4a982c1))
* bump vite from 5.0.10 to 5.0.11 ([0478492](https://github.com/H4ad/serverless-adapter/commit/04784922a49429a57f9bbbd4773e42c069ce2cca))

## [4.1.0](https://github.com/H4ad/serverless-adapter/compare/v4.0.1...v4.1.0) (2024-01-03)


### Features

* **network:** support buffering transfer-encoding: chunked ([f19ffd1](https://github.com/H4ad/serverless-adapter/commit/f19ffd1f6b2da4cccbd2be6e48429c566719ade6))

## [4.0.1](https://github.com/H4ad/serverless-adapter/compare/v4.0.0...v4.0.1) (2023-12-26)


### Bug Fixes

* **ci:** missing build part while releasing new version ([5b7d184](https://github.com/H4ad/serverless-adapter/commit/5b7d18410acdc0aa547de2db63cf6347a5715b58))


### Documentation

* **blog:** added note about bug related to missing package files ([1d75d91](https://github.com/H4ad/serverless-adapter/commit/1d75d91fe8863c45ae2a7abe44aec6d51d96e44d))

## [4.0.0](https://github.com/H4ad/serverless-adapter/compare/v3.2.0...v4.0.0) (2023-12-26)


### ⚠ BREAKING CHANGES

* Now we support dual package publish, and the import can fail.

### Features

* added support for dual package publish ([dd0803f](https://github.com/H4ad/serverless-adapter/commit/dd0803ff5ebcabf22120da88b74a720c3661f846))


### Bug Fixes

* **dual-package-publish:** issue with imports lib when moduleResolution is node ([4dac8aa](https://github.com/H4ad/serverless-adapter/commit/4dac8aa07ef015f3b0fd8f8d766705271e93c111))


### Documentation

* **blog:** added blogpost about dual package publish ([006e8a9](https://github.com/H4ad/serverless-adapter/commit/006e8a94b02152e4857cda7951e285ff2b449430))
* updated documentation for dual package publish ([03ee217](https://github.com/H4ad/serverless-adapter/commit/03ee21746bee785d840ab26a1ec5ddf2bd6dea90))


### Continuous Integration

* **release:** fixed issue with release-please skipping release ([8dfb582](https://github.com/H4ad/serverless-adapter/commit/8dfb582742481f7e37e076f00c51d32907f401fd))

## [3.2.0](https://github.com/H4ad/serverless-adapter/compare/v3.1.0...v3.2.0) (2023-12-22)


### Features

* **firebase:** bump supported firebase functions to 4.x ([b717240](https://github.com/H4ad/serverless-adapter/commit/b717240a808d7d81905745347b17969e7caaf6f5))


### Documentation

* **readme:** removed semantic release badge ([fe85304](https://github.com/H4ad/serverless-adapter/commit/fe8530439df4ed48d3542127227ae98954fd84a5))


### Miscellaneous Chores

* **benchmark:** bump package versions ([b6aa539](https://github.com/H4ad/serverless-adapter/commit/b6aa539bb499fcadd2393c7bf010dfe6d726f2d5))
* bootstrap releases for path: . ([e68506e](https://github.com/H4ad/serverless-adapter/commit/e68506ea9c5a5fb8492b7cc7bb03400c95700668))
* bump @apollo/server from 4.7.4 to 4.9.3 ([52c8b83](https://github.com/H4ad/serverless-adapter/commit/52c8b83db4d8b80120aea6ccb32e8b4580466168))
* bump semver from 5.7.1 to 5.7.2 in /benchmark ([0a6a3e0](https://github.com/H4ad/serverless-adapter/commit/0a6a3e0a0e536f43e2c61f307f955b01a97e1169))
* bump semver from 5.7.1 to 5.7.2 in /www ([49c7baf](https://github.com/H4ad/serverless-adapter/commit/49c7baf364e251d78da4349ab35c6b69837a003d))
* bump vite from 4.3.5 to 4.4.9 ([ecd1252](https://github.com/H4ad/serverless-adapter/commit/ecd125253229ed032f21606238fbc27fc74d5e95))
* bump vite from 4.4.9 to 5.0.10 ([8eadf40](https://github.com/H4ad/serverless-adapter/commit/8eadf405eea86facff1268b9fb4d5d153a873fbb))
* bump word-wrap from 1.2.3 to 1.2.4 ([218d3a9](https://github.com/H4ad/serverless-adapter/commit/218d3a906c0b18156110c4c8fe155d0f183fca29))
* **docs:** update to docusaurus v3 ([51a104e](https://github.com/H4ad/serverless-adapter/commit/51a104e000e867ae3601a70408cec8d0ab2d8cc3))
* **package:** bump package versions ([fe0a0fc](https://github.com/H4ad/serverless-adapter/commit/fe0a0fc35c687037dfa172dbb667c4451d539ad8))
* **release-please:** set latest version ([69110ec](https://github.com/H4ad/serverless-adapter/commit/69110ec1f418831ac4a49545d1bf40c291212293))
* **semantic-release:** removed unused package ([2c60275](https://github.com/H4ad/serverless-adapter/commit/2c602753ecd3fcdff23567ec8a77e317ebd7f9fe))


### Continuous Integration

* **codeql:** run only when changing code files ([93d8f1c](https://github.com/H4ad/serverless-adapter/commit/93d8f1c029e2c84e5c4b1366ecddc9b1b11c6fa5))
* **codeql:** updated configuration ([9ffa3e8](https://github.com/H4ad/serverless-adapter/commit/9ffa3e8b5f4c7df8772cd64ef8640646879f713f))
* **docs:** only trigger when update workflows of docs ([c1e7f8a](https://github.com/H4ad/serverless-adapter/commit/c1e7f8aefdaf18a12f5a26c2b0cbc94f4c830322))
* **pr:** only run when update specific files ([0085520](https://github.com/H4ad/serverless-adapter/commit/0085520b20edb0a33111bdb7780195805d31b0af))
* **pr:** stop running the pr on main ([7c7a05a](https://github.com/H4ad/serverless-adapter/commit/7c7a05a78928a2ef96d67dae38f6f56b25361575))
* **release-please:** try fix issues with release please config ([46577f2](https://github.com/H4ad/serverless-adapter/commit/46577f2c79bcc9f20b9925f6fa629f534d63a4f9))
* **release:** added coverage ([57f1e09](https://github.com/H4ad/serverless-adapter/commit/57f1e09d63936546764708880e5dd5e799c332b6))
* **release:** added provenance during publish ([1161e42](https://github.com/H4ad/serverless-adapter/commit/1161e4227fb63ad272ba740ba186de63d40955c3))
* **release:** include all commits on release ([9185a0b](https://github.com/H4ad/serverless-adapter/commit/9185a0b6ab34174905669cfdd084b2cc9afe54bb))
* **release:** moved configuration to the correct place ([b8c6156](https://github.com/H4ad/serverless-adapter/commit/b8c6156eb3d7df06f1c370965e91abc850217adc))
* **release:** use release manager instead of merge-and-release ([ef278e6](https://github.com/H4ad/serverless-adapter/commit/ef278e6efc2732e5e21d2e3ae9d32fb96ac1edc2))
* **workflows:** bump action versions ([647e694](https://github.com/H4ad/serverless-adapter/commit/647e694ce6919925c5df4188450e49faa5ec3fc8))

CHANGES:

## [3.1.0](https://github.com/H4ad/serverless-adapter/compare/v3.0.0...v3.1.0) (2023-07-01)


### Bug Fixes

* **build:** disable minify identifiers ([0a285a6](https://github.com/H4ad/serverless-adapter/commit/0a285a6b2249d56ce39a762872bcc7cfb4515f8c))
* **package:** types not being emitted ([2bc1244](https://github.com/H4ad/serverless-adapter/commit/2bc124456f41855798ed7d5c4a132b2d83bf16fd))


### Features

* **aws:** added adapter for request lambda edge ([b8791da](https://github.com/H4ad/serverless-adapter/commit/b8791da9c4718a837d9ae01d89bba7b30067dc52))

## [3.0.0](https://github.com/H4ad/serverless-adapter/compare/v2.17.0...v3.0.0) (2023-06-09)


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
