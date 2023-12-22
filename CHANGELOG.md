# Changelog

## [4.0.0](https://github.com/H4ad/serverless-adapter/compare/serverless-adapter-v3.1.0...serverless-adapter-v4.0.0) (2023-12-22)


### ⚠ BREAKING CHANGES

* **api-gateway-v2:** now we don't flatten the headers
* **core:** now regex is not support anymore due the slow performance and we don't lower case all the headers, so the content-encoding and content-type must be lowercase
* **vitest:** removed support for fastify 3.0.0 & hapi 20.x & firebase-admin < 11
* **nodejs:** Now we will no longer support old nodejs versions
* **library-structure:** New path to export handlers, frameworks, adapters and resolvers.

### Features

* **adapters:** added apollo server mutation adapter ([aa7e3e3](https://github.com/H4ad/serverless-adapter/commit/aa7e3e396ca8835b1c51ef0afbfb5166a7793aee))
* **adapters:** added dummy adapter to be used by clouds that don't require adapter to work ([d59890a](https://github.com/H4ad/serverless-adapter/commit/d59890adf8380b5404e87de054811a705b5f3d84))
* **adapters:** added some aws adapters ([744d73f](https://github.com/H4ad/serverless-adapter/commit/744d73ffd97821496f7a96fbe3c4d2ee0c4a8fd0))
* **adapters:** added support to api gateway ([6726c0e](https://github.com/H4ad/serverless-adapter/commit/6726c0e86ed1eee6266b7aa7f45a5323291e40b4))
* **all:** added support to typescript ([6a93747](https://github.com/H4ad/serverless-adapter/commit/6a93747370cdb0a8d689499441d4f588fa94c3ec))
* **apollo-server:** added support for apollo server ([4d6f35b](https://github.com/H4ad/serverless-adapter/commit/4d6f35ba7cfdfdc16fbb1184ebb3743893a598ef))
* **aws-stream:** added support for aws lambda stream ([6782563](https://github.com/H4ad/serverless-adapter/commit/67825633db4c0fcc502ca0e4340802c8ced98454))
* **aws:** added adapter for request lambda edge ([b8791da](https://github.com/H4ad/serverless-adapter/commit/b8791da9c4718a837d9ae01d89bba7b30067dc52))
* **azure:** added adapter to http trigger v4 ([15c1473](https://github.com/H4ad/serverless-adapter/commit/15c14736c8dc23e0952a63f0ee3246cffd9da158))
* **azure:** added handler to receive events from azure functions ([0310e15](https://github.com/H4ad/serverless-adapter/commit/0310e15dab621052cb930f3ebe69646d80291ac1))
* **batch-support:** added aws simple adapter to abstract batch support to simple aws adapters ([e6c17bb](https://github.com/H4ad/serverless-adapter/commit/e6c17bbd7828b1f984a7f03cd490909cdd1253c0))
* **body-parser:** added body-parsers frameworks ([69b746a](https://github.com/H4ad/serverless-adapter/commit/69b746afba5f4b3806ef7b9ab3b15338d2396f52))
* **cors:** added cors framework ([8bf3425](https://github.com/H4ad/serverless-adapter/commit/8bf34257dc8de6fbed1d3a5127c1f4d8e75d1c9f))
* **deepkit:** try to add support to deepkit ([6cc40fa](https://github.com/H4ad/serverless-adapter/commit/6cc40fa1d9fc0fc97f8c1bab218544df7ea6efc5))
* **digital-ocean:** added handler and adapter to add support for digital ocean ([0a29085](https://github.com/H4ad/serverless-adapter/commit/0a2908522d6eda9b89568b4c13135640cee88410))
* **draft-apollo-server:** added initial implementation for apollo server ([c2f2f11](https://github.com/H4ad/serverless-adapter/commit/c2f2f112d44fd917f110d11123f7b4817e7a4f82))
* **eslint & tools-version:** added better rules to eslint and added tools version for nodejs ([86f790f](https://github.com/H4ad/serverless-adapter/commit/86f790fc52bea611cb1368d1e3b8839bfbc5d551))
* **firebase-v2:** added support for gen2 of firebase functions ([90eba3f](https://github.com/H4ad/serverless-adapter/commit/90eba3f2f6f516f617eed0d96c082e5fbe462fa2))
* **firebase:** added handler for firebase ([9a4d9a7](https://github.com/H4ad/serverless-adapter/commit/9a4d9a78736669a9a1db4de97ec9e1ecbeeddcd2))
* **firebase:** bump supported firebase functions to 4.x ([b717240](https://github.com/H4ad/serverless-adapter/commit/b717240a808d7d81905745347b17969e7caaf6f5))
* **frameworks:** added lazy framework to enable users to create instance of the app asynchronously ([be61c22](https://github.com/H4ad/serverless-adapter/commit/be61c222d24c0cc35382b6aebb553d5092a535f8))
* **gcp:** added gcp handler ([eef1183](https://github.com/H4ad/serverless-adapter/commit/eef11837aad7a32672be6a4e0ecdc0141adbb6d2))
* **http-trigger-v4:** make the adapter more flexible to v3 ([96a5c15](https://github.com/H4ad/serverless-adapter/commit/96a5c151e9a5b4a13dd5870c9c327aa7245fe1ce))
* **huawei:** added support to event function with api gateway adapter ([a92254a](https://github.com/H4ad/serverless-adapter/commit/a92254ad73f893048fbda71c11f6610a2a81202e))
* **huawei:** added support to functiongraph of type http function on huawei ([697c6dd](https://github.com/H4ad/serverless-adapter/commit/697c6dd813b674abf3baa662e609176cb3792d66))
* **husky:** added npm run test before each commit ([f6becdb](https://github.com/H4ad/serverless-adapter/commit/f6becdb4ac7195d1f124e2484e0d2142e02fe9fa))
* **library-structure:** rewrite exports to not broke with peer dependencies ([b7fa0fa](https://github.com/H4ad/serverless-adapter/commit/b7fa0fa96e8e54318f60f86d5048d7b41eb60cd6)), closes [#4](https://github.com/H4ad/serverless-adapter/issues/4)
* **resolvers:** added dummy resolver to clouds that don't require resolvers to work ([d3e0840](https://github.com/H4ad/serverless-adapter/commit/d3e08405b6fdea1c8ba6ad0f1fc078771fadb35b))
* **response:** added support for next.js ssr response data in Uint8Array ([9202ed0](https://github.com/H4ad/serverless-adapter/commit/9202ed01bee8f3843f69f6c4b85fc17a3c6fa883))
* **s3:** added s3 adapter to aws ([1c0ceb3](https://github.com/H4ad/serverless-adapter/commit/1c0ceb36d9d0f66a20e07664fa6e7ea6e9b1f6fd))
* **stream:** expose method to validate if stream is ended ([ea6ca68](https://github.com/H4ad/serverless-adapter/commit/ea6ca689d14555f284b72920f8fc07786d2b6c7e))
* **trpc:** added support to framework trpc ([2c0168c](https://github.com/H4ad/serverless-adapter/commit/2c0168c5019a03ddc169540f102843260764a377))
* **trpc:** bump support for 10.x ([5d3124a](https://github.com/H4ad/serverless-adapter/commit/5d3124a115dc44099fc681eec9592636374f85b8))
* **tsconfig:** set tsconfig to es2019 because nodejs is set to 12.x ([7925fbb](https://github.com/H4ad/serverless-adapter/commit/7925fbbe4196fd8505d65902f304164c619a6d07))
* **v2:** added initial implementation of v2 ([91680fe](https://github.com/H4ad/serverless-adapter/commit/91680fe366fd47e5c03052def2649c581eb76eb2))


### Bug Fixes

* **alb:** alb not working when header value is not string ([10d72ac](https://github.com/H4ad/serverless-adapter/commit/10d72acb1dba9f5f1203a40299fb3a2f42591c43))
* **api-gateway-v1:** force headers to lower case ([4a271db](https://github.com/H4ad/serverless-adapter/commit/4a271db16ad1ec3a2646042603725d93e264721e))
* **api-gateway-v1:** force lower case for headers ([4a271db](https://github.com/H4ad/serverless-adapter/commit/4a271db16ad1ec3a2646042603725d93e264721e))
* **api-gateway-v1:** probably missing query string value when multiple ([78b9f18](https://github.com/H4ad/serverless-adapter/commit/78b9f18dfb8a459f0c1557fdf702f68a078c098b))
* **api-gateway-v2:** not returning correctly the cookies when they came with set-cookies ([3f58cdd](https://github.com/H4ad/serverless-adapter/commit/3f58cddbf266c9a2346bb4e4f3e3683dfa480696)), closes [#8](https://github.com/H4ad/serverless-adapter/issues/8)
* **build:** disable minify identifiers ([0a285a6](https://github.com/H4ad/serverless-adapter/commit/0a285a6b2249d56ce39a762872bcc7cfb4515f8c))
* **docs:** simple adapters now throw error when status is different than success ([2cf72e5](https://github.com/H4ad/serverless-adapter/commit/2cf72e5a1fc1d5785fea8aed5ab00cc5ae9dde7e))
* **firebase-handler:** issue when firebase send body as object instead buffer ([a20ca99](https://github.com/H4ad/serverless-adapter/commit/a20ca99e40f3615eec03b8ec959125a4cdad7c29)), closes [#40](https://github.com/H4ad/serverless-adapter/issues/40)
* **firebase:** issue with body-parser internally in firebase environment ([3ec9a6f](https://github.com/H4ad/serverless-adapter/commit/3ec9a6ff7ba452193eada36372dc1f496acc03a8))
* **http-firebase:** wrong path on import inside test file ([7f1cb7d](https://github.com/H4ad/serverless-adapter/commit/7f1cb7d13d840278f075501a22c1b56d0e3ad500))
* **http-trigger-v4:** issue after upgrade typescript ([b047b56](https://github.com/H4ad/serverless-adapter/commit/b047b566fc3b1657e5efa2e0e7027234f02497f5))
* **http-trigger-v4:** make the parseCookie function be case sensitive ([0092124](https://github.com/H4ad/serverless-adapter/commit/00921241b4c4905efcaaae7c0a71cf7954c5a7ee))
* **lazy:** added correct export in index.ts ([71016b2](https://github.com/H4ad/serverless-adapter/commit/71016b2805354381f056ff3f2dfbca6f334528b5))
* **network:** overriding _readableState causes weird bugs of process exiting in deadlock ([e3c46bc](https://github.com/H4ad/serverless-adapter/commit/e3c46bc7ede4b4aba3304221485c5e0a763eecce))
* **network:** writeHead broken on nodejs 14.x ([252dfbe](https://github.com/H4ad/serverless-adapter/commit/252dfbe293904a30151aaa4b7ea05d1e399b8ef1))
* **package:** added missing publish access to semantic release ([6655d97](https://github.com/H4ad/serverless-adapter/commit/6655d97f9a393c0dbdfa1b4a840758e2a823f15a))
* **package:** removed resolutions because they break when using with peers ([2922600](https://github.com/H4ad/serverless-adapter/commit/29226004bb787d42c205487e7c0ac83a23ab4531))
* **package:** types not being emitted ([2bc1244](https://github.com/H4ad/serverless-adapter/commit/2bc124456f41855798ed7d5c4a132b2d83bf16fd))
* **readme:** broken links in readme ([c049498](https://github.com/H4ad/serverless-adapter/commit/c049498f9099d64a57366bc2f6b05088177b43a9))
* **serverless-adapter:** passing wrong constant to binary settings content types property ([1d121eb](https://github.com/H4ad/serverless-adapter/commit/1d121eb372c808e68ce51d9a437047b6456c5f44)), closes [#12](https://github.com/H4ad/serverless-adapter/issues/12)
* **test-adapters & husky:** run command of build before commit & fix problem with resolver type ([f1f39fc](https://github.com/H4ad/serverless-adapter/commit/f1f39fcf85bd79b34172cd0a8c13147d95f87795))
* **tsconfig:** created build config that excludes test folder ([23952db](https://github.com/H4ad/serverless-adapter/commit/23952dba710f9326c25d5bb2edd440f6fea885a6))


### Documentation

* **.github:** added more steps inside pull request template ([68cc956](https://github.com/H4ad/serverless-adapter/commit/68cc95695a550ccdb93964ab859cb7451ce3108c))
* **adapter-contract:** added deprecation notice for host and hostname ([3461ebc](https://github.com/H4ad/serverless-adapter/commit/3461ebccd8cfb4554beaf02aab2fcbdc315ce8db))
* **adapter:** added final version of creating an adapter doc ([9dd6d30](https://github.com/H4ad/serverless-adapter/commit/9dd6d30616d6cbd5fa34150d50e84c007c0df01a))
* **adapters-aws:** added docs about alb and lambda edge & fixed some docs in other adapters ([f69a663](https://github.com/H4ad/serverless-adapter/commit/f69a6632714c016f9ff9f6fe7c6a9e71c864342f))
* **adapters:** added docs for huawei, sqs, sns and dynamodb ([1acb9d6](https://github.com/H4ad/serverless-adapter/commit/1acb9d6ea63fc20d2d78a350c72ba02ecc6d434d))
* **adapters:** continue to work on adapters documentation ([772363f](https://github.com/H4ad/serverless-adapter/commit/772363f8a7a645f6f5d8a5fc088f4736bdb88bfa))
* **algolia:** added support to algolia ([0e6eae4](https://github.com/H4ad/serverless-adapter/commit/0e6eae4f95b92d36cfe608e51b1bf8540d656ac6))
* **apollo server:** fixing some typos and redirect links ([95645e0](https://github.com/H4ad/serverless-adapter/commit/95645e0593f0b08980f8c0df08df02a2df2a4b9c))
* **apollo-server:** added documentation for apollo server ([56c4a74](https://github.com/H4ad/serverless-adapter/commit/56c4a7479d52e728499235f8840d3b98cd70556f))
* **aws-adapters:** added docs about api gateway v1/v2 and event bridge & fixed issues in other docs ([49b1bc6](https://github.com/H4ad/serverless-adapter/commit/49b1bc619bd1aa0f13957aae21e051b74c1cc525))
* **aws-lambda-response-streaming:** added docs about the new handler ([c05b035](https://github.com/H4ad/serverless-adapter/commit/c05b035695f4e4f6110e7871b5a0b21c6085576d))
* **azure:** added documentation about how to integrate with azure ([4cbbfaa](https://github.com/H4ad/serverless-adapter/commit/4cbbfaa0aa9c9e66a88d3d98e4506b51bae9e8ed))
* **base-body-parser:** added correct docs description to mount api section ([6edb996](https://github.com/H4ad/serverless-adapter/commit/6edb996f0545e53f04f38e47f1258c11f1e28e7b))
* **benchmark:** added benchmark documentation ([c4c8dea](https://github.com/H4ad/serverless-adapter/commit/c4c8dea84667976ad453c102d3aec43d6a1734a8))
* **benchmark:** update benchmark information ([1ba7fa0](https://github.com/H4ad/serverless-adapter/commit/1ba7fa0e1ad4ece3ecc0943ec783597d2318e586))
* **blog:** added new article to the blog ([72f07d9](https://github.com/H4ad/serverless-adapter/commit/72f07d9fd4154d1ec1a7fa5a0493ceeae80b8ed0))
* **blog:** fixed issue with broken link ([6761974](https://github.com/H4ad/serverless-adapter/commit/67619741eefe78decd36f46de4a25e65c4cd9c10))
* **body-parser:** added documentation to body-parser ([5295cbb](https://github.com/H4ad/serverless-adapter/commit/5295cbb529731fbe25841e356f328e52baa520a9))
* **breadcrumb:** fixed missing breadcrumbs ([2aa8823](https://github.com/H4ad/serverless-adapter/commit/2aa8823e9d0a1525e0f824388d2ff7accc984041))
* **breadcrumb:** fixed typo issue with breadcrumb ([59b8ec6](https://github.com/H4ad/serverless-adapter/commit/59b8ec6305e48cb51c8131749af403b72f7de367))
* **cname:** try to fix issue with cname everytime I deploy ([af44840](https://github.com/H4ad/serverless-adapter/commit/af448400118b28a76b422e4d6a99d8fdbd64a24d))
* **contracts:** added missing documentation for adapter contract ([4ed9e46](https://github.com/H4ad/serverless-adapter/commit/4ed9e4616e014a8a66f470ab6a594599e2643589))
* correct typo ([2209a66](https://github.com/H4ad/serverless-adapter/commit/2209a66ebf334879c760a321fd5a697eba135fd2))
* **cors:** added docs about cors ([01d1a35](https://github.com/H4ad/serverless-adapter/commit/01d1a35cb732e7960cdf0e25fbb7dbca0eba41d6))
* **custom-css:** added scroll behaviour smooth ([3fe089e](https://github.com/H4ad/serverless-adapter/commit/3fe089e7c3102d1765b30238f0e73e0cb04d1b47))
* **deepkit:** added docs for deepkit ([69c484a](https://github.com/H4ad/serverless-adapter/commit/69c484a50915ef37a07b5170072ef71b181bde4e))
* **deepkit:** added more instructions to use deepkit in aws ([d401a8d](https://github.com/H4ad/serverless-adapter/commit/d401a8dca0b43036831b5228a0cf4b5b19cec66c))
* **default.handler:** removed unused jsdoc parameter ([e26219e](https://github.com/H4ad/serverless-adapter/commit/e26219e4bb408b66a7f64dc704aec1c0dbb3921f))
* **digital-ocean:** added docs about cli ([45e54de](https://github.com/H4ad/serverless-adapter/commit/45e54de0f34685927347740927fe64988ffb7c45))
* **digital-ocean:** added docs about how to integrate with digital ocean ([0a88847](https://github.com/H4ad/serverless-adapter/commit/0a88847eb53ca024b9b06f776910622a046dd858))
* **docs & readme:** added many fixes and update docs & changed readme to point to docs site ([ae7b1c7](https://github.com/H4ad/serverless-adapter/commit/ae7b1c7c5f6722cf282566c8600d07140fd49eef))
* **docsearch:** added support for docsearch crawler ([d673cef](https://github.com/H4ad/serverless-adapter/commit/d673cefed4e65b51e88d1ebb57e774c8c01eb15f))
* **docusaurus:** added initial version of website built with docusaurus ([e7d18cd](https://github.com/H4ad/serverless-adapter/commit/e7d18cd0a0d2e5b5330ecb9b4e5814fae22b34cd))
* **docusaurus:** added more info about maintainer ([edaa5da](https://github.com/H4ad/serverless-adapter/commit/edaa5dab81025e1c186d195667c450e96407ac2d))
* **eslint & build:** issue with build docs and eslint ([195c397](https://github.com/H4ad/serverless-adapter/commit/195c397809704b6cb4732bafae46a46420619ba1))
* **eslint & index.doc:** fixed eslint & added more files inside index.doc ([7ee1a1b](https://github.com/H4ad/serverless-adapter/commit/7ee1a1b0b9c16df67b11b3f90acfc9bb755ba3aa))
* **etc:** added back this folder just to not get errors when generate docs ([355e49d](https://github.com/H4ad/serverless-adapter/commit/355e49d69151e8a7a8e905f8a9442d6b7e48dad6))
* **event-bridge:** added better documentation of schedule expression ([dfd1fed](https://github.com/H4ad/serverless-adapter/commit/dfd1feda4fc18773c6e060fd64201ed404fcf725))
* **files:** moved files from docs to www folder ([1995515](https://github.com/H4ad/serverless-adapter/commit/1995515ae751ee6f19fec092f302e54513446934))
* **firebase:** added docs about firebase v2 ([3a74353](https://github.com/H4ad/serverless-adapter/commit/3a74353a0a281575ba800642f7195112a1806270))
* **firebase:** added documentation to use firebase ([2f4dbcf](https://github.com/H4ad/serverless-adapter/commit/2f4dbcf5839d45207b05691d57f1da68d82fbb82))
* **frameworks:** added documentation about all frameworks ([42a50a0](https://github.com/H4ad/serverless-adapter/commit/42a50a06b3f028af61e33d7524640b458b1e724e))
* **gcp:** added docs about how to use ([a9c209c](https://github.com/H4ad/serverless-adapter/commit/a9c209cefd66bf2f0685cd7b2696139b08f918de))
* **getting-started & adapters:** continue to add more documenation to start and adapters ([c2bd60f](https://github.com/H4ad/serverless-adapter/commit/c2bd60f965612286e853fca3bf4d94550906403e))
* **getting-started:** added version 16.x and 18.x to the docs ([3b00431](https://github.com/H4ad/serverless-adapter/commit/3b004315cd37dab5f19c98d2d2b5534de3eccea3))
* **handlers:** added documentation about default and huawei handlers ([2233d64](https://github.com/H4ad/serverless-adapter/commit/2233d640b4bc56f2982153fc374f46fa2ef8cf96))
* **helpers/lazy.mdx:** fixing a small typo ([8513089](https://github.com/H4ad/serverless-adapter/commit/8513089e93ef4646939223a6ecf2e20e568b471e))
* **http-trigger-v4:** fixed broken link ([0f8f35b](https://github.com/H4ad/serverless-adapter/commit/0f8f35b49e689407362b326980a4756762f1171d))
* **huawei & dummy:** added missing descriptions and fixed breadcrumbs ([e6baee9](https://github.com/H4ad/serverless-adapter/commit/e6baee9be903fa581b637deaacd83249946d303e))
* **installation:** removed support doc for older nodejs versions ([5e02fcd](https://github.com/H4ad/serverless-adapter/commit/5e02fcda08fa4863facd1a9a308c41030f32f033))
* **intro:** added missing azure handler ([cc71587](https://github.com/H4ad/serverless-adapter/commit/cc71587e84ea25db2810f72ba9e2d3e3338f9602))
* **intro:** fixed align mistake in huawei api gateway ([2a7680b](https://github.com/H4ad/serverless-adapter/commit/2a7680b00c6925c7d26614131181b0e6d2957d13))
* **intro:** fixed usage of wrong adapter ([ed96726](https://github.com/H4ad/serverless-adapter/commit/ed967269189c41816d9f6fbcde0b794fda2da113))
* **intro:** removed beta banner ([2e2dea2](https://github.com/H4ad/serverless-adapter/commit/2e2dea216dbd7506274d0179525fc34df3a8cbfd))
* **lambda-edge:** added docs about request lambda edge ([455e881](https://github.com/H4ad/serverless-adapter/commit/455e881b4edcef8e88cf384055bd2c1d9fe61a99))
* **lazy:** added missing import and removed unused import ([2ec822e](https://github.com/H4ad/serverless-adapter/commit/2ec822ef402dfb3566cf2146de6342f7b472dcd2))
* **lazy:** fixed issue of passing app instead null for adapter ([fa42ee0](https://github.com/H4ad/serverless-adapter/commit/fa42ee00691cead326a7a7b0e2c631a261efdcab))
* **mdx.description:** added description to resolvers, frameworks and getting started blocks ([5e78ec0](https://github.com/H4ad/serverless-adapter/commit/5e78ec041861b4f6b9fe3306b4ea83e42f6eb949))
* **nestjs:** fixed issue with lazy framework integration ([b433f1c](https://github.com/H4ad/serverless-adapter/commit/b433f1cdf8e022accade082325fb954f93297e13))
* **package & www:** updated some old texts and descriptions ([88eb123](https://github.com/H4ad/serverless-adapter/commit/88eb123817d4210ee6ac53453323909c0c93988f))
* **pages:** restructure all pages ([05bdff8](https://github.com/H4ad/serverless-adapter/commit/05bdff85ed264cb2508cbb885fb27e5020c7c5d0))
* **pr:** added support to test in nodejs 16.x and 18.x ([db94cfb](https://github.com/H4ad/serverless-adapter/commit/db94cfb535d5ba8a815a80062945a6f5df270d73))
* **pt_br:** removed any reference to pt_br docs ([b1deea9](https://github.com/H4ad/serverless-adapter/commit/b1deea9068f8af10834fda8d61b69d120d7a805e))
* **pull-request-template:** fixed path of main docs ([0c2af01](https://github.com/H4ad/serverless-adapter/commit/0c2af013dd43eeb5a653f09e17951157b74fbeae))
* **readme & intro:** fixed typo issue with breaking change and pin ([5221f8c](https://github.com/H4ad/serverless-adapter/commit/5221f8ceb07c8f39ab11dbc399d21a266c4587fd))
* **readme & intro:** improved documentation of readme and intro ([5d2ceb7](https://github.com/H4ad/serverless-adapter/commit/5d2ceb75ce4ef66c7699e047aaea3168bc22eedd))
* **readme & www:** added some fixes and better description for azure ([682b406](https://github.com/H4ad/serverless-adapter/commit/682b406ca66f69bf11397fa0e3069585f16ded22))
* **readme:** added benchmark section in the readme ([e25c31c](https://github.com/H4ad/serverless-adapter/commit/e25c31c9d730e4fd1cce63734444317ef1278022))
* **readme:** added docs about breaking changes ([d15fdff](https://github.com/H4ad/serverless-adapter/commit/d15fdff43d53bcd3cda4173d634132fab2d66320))
* **readme:** added docs about the library ([8b8603e](https://github.com/H4ad/serverless-adapter/commit/8b8603e0868b30c7874d6b450f1a74dcbe2fa90b))
* **readme:** added documentation about how to use huawei ([6e33f44](https://github.com/H4ad/serverless-adapter/commit/6e33f448003d59b99b3a8591b1fe5b040d536091))
* **readme:** added examples section to link with example repository ([28c488c](https://github.com/H4ad/serverless-adapter/commit/28c488cb3add4a73616f5b000d13b807a8a939f5))
* **readme:** added imports in the usage example ([0e4d660](https://github.com/H4ad/serverless-adapter/commit/0e4d660bb8d9ce37ce12fa47272847a5a6cc36aa))
* **readme:** added plans to support firebase and gcp ([677c0d9](https://github.com/H4ad/serverless-adapter/commit/677c0d9643edb8bf6d7a68a2b74580628c8c7e84))
* **readme:** fixed broken link of documentation ([9450ec6](https://github.com/H4ad/serverless-adapter/commit/9450ec6cbcc7fe53878b78fa4da78d71eda2becd))
* **readme:** fixed typo in support section - event sources ([1813ec1](https://github.com/H4ad/serverless-adapter/commit/1813ec16040add918c21e861ed601040c0dfc154))
* **readme:** fixed url of the docs ([20f1676](https://github.com/H4ad/serverless-adapter/commit/20f1676e8be429320837574e9a1e39083b315b56))
* **readme:** removed semantic release badge ([fe85304](https://github.com/H4ad/serverless-adapter/commit/fe8530439df4ed48d3542127227ae98954fd84a5))
* **resolver.contract:** added missing documentation for run method in resolver ([b31f153](https://github.com/H4ad/serverless-adapter/commit/b31f15370479b3839218d24040b0adfee9096dab))
* **resolvers:** added better explanation about callbackWaitsForEmptyEventLoop ([ff20236](https://github.com/H4ad/serverless-adapter/commit/ff202368f1234c51c345b1ae85dc3368c61347a7))
* **resolvers:** added documentation about all resolvers ([8e51268](https://github.com/H4ad/serverless-adapter/commit/8e51268f00d6b384c47f834687a3729795cae0c4))
* **scripts:** added scripts to generate markdown, api pages and other stuffs using tsdoc ([6bacee7](https://github.com/H4ad/serverless-adapter/commit/6bacee7dbf203182629d6705ef0bbf1a85866679))
* **sidebars:** changed order and collapse some sections ([abbd86f](https://github.com/H4ad/serverless-adapter/commit/abbd86f0415fca2f58812f97eaecc33af23620e8))
* **sqs & dynamodb:** added documentation about batch support ([fd802aa](https://github.com/H4ad/serverless-adapter/commit/fd802aa693c130e2f56dec38895897293f77ac95))
* **src:** better comments to the code ([7e47a50](https://github.com/H4ad/serverless-adapter/commit/7e47a50566eac8d20a6f6637b50759cff3e0d6e3))
* **trpc:** add check of header for sqs and be more explicit about security flaw ([bca0b28](https://github.com/H4ad/serverless-adapter/commit/bca0b2871ac04f33521fb7730669f58ce4d91cab))
* **trpc:** added documentation about new framework ([49577a3](https://github.com/H4ad/serverless-adapter/commit/49577a3c1c4e55a51b64051023b39b86abf0ad78))
* **trpc:** fixed broken link to sqs ([18826cd](https://github.com/H4ad/serverless-adapter/commit/18826cdc5009e6b8e4f28b52e95fbd7d0aeced69))
* **trpc:** fixed typo mistake ([0739679](https://github.com/H4ad/serverless-adapter/commit/0739679c34b2cbbb4cfca9ef5858356b755e4fd3))
* **tsdoc:** added better namig strategy to files ([4136094](https://github.com/H4ad/serverless-adapter/commit/41360942b9467a2a5b3fd8cbddd71e7f8cf6d3fa))
* **www:** added missing digital ocean adapter docs on sidebars ([c968211](https://github.com/H4ad/serverless-adapter/commit/c9682118e0a359505acbc45b7ece1f686fd641c9))
* **www:** changed base url of sitemap ([8e3e72f](https://github.com/H4ad/serverless-adapter/commit/8e3e72f76a47b58dbab9c8a19e52793b425409a9))
* **www:** update documentation for trpc 10.x ([ab6c62b](https://github.com/H4ad/serverless-adapter/commit/ab6c62b04140284356591ee09e6dd3fcaef6f33a))


### Chores

* **.tools-versions:** changed default node version to 14.18.2 ([a763a59](https://github.com/H4ad/serverless-adapter/commit/a763a594c76f5ae7a53b66f93718959f005e9e58))
* **benchmark:** added cpuprofile to gitignore ([b81f372](https://github.com/H4ad/serverless-adapter/commit/b81f372ca9d9ad598b398b96b6b59d403eb42066))
* **benchmark:** bump package versions ([b6aa539](https://github.com/H4ad/serverless-adapter/commit/b6aa539bb499fcadd2393c7bf010dfe6d726f2d5))
* **benchmark:** improved benchmarks ([09e12ee](https://github.com/H4ad/serverless-adapter/commit/09e12ee922c8b1728f4b3b2a8f7ec10df1c82664))
* **benchmark:** set default nodejs to 18.x ([fff380b](https://github.com/H4ad/serverless-adapter/commit/fff380bd82ebb8c40647a05519bd46b4bad74296))
* bootstrap releases for path: . ([e68506e](https://github.com/H4ad/serverless-adapter/commit/e68506ea9c5a5fb8492b7cc7bb03400c95700668))
* bump @apollo/server from 4.7.1 to 4.7.4 ([cb25f1b](https://github.com/H4ad/serverless-adapter/commit/cb25f1bf00eac4112ebe456a9aa5ede9e7c1756d))
* bump @apollo/server from 4.7.4 to 4.9.3 ([52c8b83](https://github.com/H4ad/serverless-adapter/commit/52c8b83db4d8b80120aea6ccb32e8b4580466168))
* bump semver from 5.7.1 to 5.7.2 in /benchmark ([0a6a3e0](https://github.com/H4ad/serverless-adapter/commit/0a6a3e0a0e536f43e2c61f307f955b01a97e1169))
* bump semver from 5.7.1 to 5.7.2 in /www ([49c7baf](https://github.com/H4ad/serverless-adapter/commit/49c7baf364e251d78da4349ab35c6b69837a003d))
* bump vite from 4.3.5 to 4.4.9 ([ecd1252](https://github.com/H4ad/serverless-adapter/commit/ecd125253229ed032f21606238fbc27fc74d5e95))
* bump vite from 4.4.9 to 5.0.10 ([8eadf40](https://github.com/H4ad/serverless-adapter/commit/8eadf405eea86facff1268b9fb4d5d153a873fbb))
* bump word-wrap from 1.2.3 to 1.2.4 ([218d3a9](https://github.com/H4ad/serverless-adapter/commit/218d3a906c0b18156110c4c8fe155d0f183fca29))
* **contributing:** added CONTRIBUTING.md ([1a077af](https://github.com/H4ad/serverless-adapter/commit/1a077af6ab965d440d2aad2eda8d05bef0a6d963))
* **default.handler:** merged two imports ([84f73ee](https://github.com/H4ad/serverless-adapter/commit/84f73eed13508cfa5560e2182d00c3707230b821))
* **deps-dev:** bump ejs from 3.1.6 to 3.1.7 ([b084258](https://github.com/H4ad/serverless-adapter/commit/b084258d5bf5d112a1a12641dc694a239090e4ee))
* **deps-dev:** bump fastify from 4.3.0 to 4.8.1 ([7e6b419](https://github.com/H4ad/serverless-adapter/commit/7e6b419d734c135e1cce2e8e058a2e063ea0686b))
* **deps-dev:** bump fastify from 4.8.1 to 4.10.2 ([66bbf28](https://github.com/H4ad/serverless-adapter/commit/66bbf281eedb77962d07e950b3ee08977add3412))
* **deps-dev:** bump semantic-release from 19.0.2 to 19.0.3 ([712f46e](https://github.com/H4ad/serverless-adapter/commit/712f46ef39461e89e0e9a0bed938800a8098b653))
* **deps:** bump jose from 2.0.5 to 2.0.6 ([5f6998b](https://github.com/H4ad/serverless-adapter/commit/5f6998bb6b7edd1bd584c28e1946203a448c2011))
* **deps:** bump loader-utils from 2.0.2 to 2.0.4 in /www ([6ce799e](https://github.com/H4ad/serverless-adapter/commit/6ce799e6de60eb9e8b40159f5be7e991c135f3ae))
* **deps:** bump minimatch, recursive-readdir and serve-handler in /www ([438e662](https://github.com/H4ad/serverless-adapter/commit/438e662b681d9b8fd591b31ee727bae89577b41d))
* **deps:** bump minimist and minimist ([6804e27](https://github.com/H4ad/serverless-adapter/commit/6804e27f92f205efa2026879fbc74d5b396de72b))
* **deps:** bump npm from 8.4.0 to 8.12.0 ([7472376](https://github.com/H4ad/serverless-adapter/commit/747237660b89419fe31cc852c0f4f25d7fc7937e))
* **deps:** bump qs and formidable ([086a0c5](https://github.com/H4ad/serverless-adapter/commit/086a0c56027cf1f91d724b5555ce484ee89b44e0))
* **deps:** bump semver-regex from 3.1.3 to 3.1.4 ([b92d3f4](https://github.com/H4ad/serverless-adapter/commit/b92d3f410f954de3a720a8610476d21606b8c2c0))
* **deps:** bump terser from 5.12.1 to 5.14.2 in /www ([f6d0c2b](https://github.com/H4ad/serverless-adapter/commit/f6d0c2b8dac019affc1a47d9e3996425c23bf46e))
* **deps:** bump xml2js and aws-sdk in /benchmark ([664ea9b](https://github.com/H4ad/serverless-adapter/commit/664ea9bb7cb0bcf588dbada4e5645a2ad41ab96c))
* **docs:** try added docs with tsdoc ([f3e6864](https://github.com/H4ad/serverless-adapter/commit/f3e6864779100f04951fb230a879182873be62eb))
* **docs:** update to docusaurus v3 ([51a104e](https://github.com/H4ad/serverless-adapter/commit/51a104e000e867ae3601a70408cec8d0ab2d8cc3))
* **docusaurus:** changed base url domain ([d8cbf0f](https://github.com/H4ad/serverless-adapter/commit/d8cbf0f76e3b92eb25977c81e817d4e0c465cd80))
* **docusaurus:** changed url of docs ([a5c25c3](https://github.com/H4ad/serverless-adapter/commit/a5c25c3a839f9d3e283b401c2328c88c92ef06f8))
* **env:** removed unused env variables ([2f91886](https://github.com/H4ad/serverless-adapter/commit/2f918866175ebe6fc7af81c9539ee2156c39df3c))
* **jest:** removed index.doc from coverage ([62795d0](https://github.com/H4ad/serverless-adapter/commit/62795d09cb8a6bdffc510e4e5dad347cf11b650c))
* **nodejs:** deprecate node 12.x, 14.x and 16.x ([4c734d4](https://github.com/H4ad/serverless-adapter/commit/4c734d4fed3bb9384b514ccf28d41f34c5360b76))
* **package & tools-versions:** changed nodejs to develop to 16.x & sync package-lock with nodejs16 ([cdb8393](https://github.com/H4ad/serverless-adapter/commit/cdb8393d1158020d49b0b9225dcf919e3e812f92))
* **package:** added missing peer dependencies in dev dependencies ([b73fb10](https://github.com/H4ad/serverless-adapter/commit/b73fb1009f3dedd5540069399194c756b6a6c8db))
* **package:** added more keywords ([ff5a9dc](https://github.com/H4ad/serverless-adapter/commit/ff5a9dcfb9479ac7e8e941cd2429d26efda9daa1))
* **package:** better description to this package ([53541f3](https://github.com/H4ad/serverless-adapter/commit/53541f3bac0f43ca20dd6b07dc1bab17b74bfeb2))
* **package:** bump package versions ([fe0a0fc](https://github.com/H4ad/serverless-adapter/commit/fe0a0fc35c687037dfa172dbb667c4451d539ad8))
* **package:** bump package versions ([dfd0b4e](https://github.com/H4ad/serverless-adapter/commit/dfd0b4ed8a258fe41b97b72375930b0ec227250b))
* **package:** bump versions of microsoft packages to the same version ([d2554ec](https://github.com/H4ad/serverless-adapter/commit/d2554ecb200b05fe69720b8c51e76778872402e8))
* **package:** fix missing apollo server as peer ([b5718f7](https://github.com/H4ad/serverless-adapter/commit/b5718f76c968270d6a008d99977ed0f49747cd9c))
* **package:** make cors and reflect-metadata optional to not be installed on npm i ([087b37b](https://github.com/H4ad/serverless-adapter/commit/087b37b061644506fd2a99ee1f1db3151ecb77c9))
* **package:** moved some dev dependencies to peer dependencies and marked as optional ([ce44879](https://github.com/H4ad/serverless-adapter/commit/ce448798f37f0b7f8c65b0d90f38845d032d9628))
* **package:** removed unused peer dependency ([d09fc59](https://github.com/H4ad/serverless-adapter/commit/d09fc5968f81a6723159e0d81ff34054e461bcfd))
* **package:** upgrade dependencies, added more keywords & added command to install peers deps ([ad2a341](https://github.com/H4ad/serverless-adapter/commit/ad2a3416ef5cf57af0ffb5a4034219ffc8ad15bc))
* **package:** upgrade tsdocs packages to fix build ([757133c](https://github.com/H4ad/serverless-adapter/commit/757133ce8d3ed8ebfd2ddcdfaa272a6e1049703c))
* **release-please:** set latest version ([69110ec](https://github.com/H4ad/serverless-adapter/commit/69110ec1f418831ac4a49545d1bf40c291212293))
* **release:** 3.0.0 [skip ci] ([84ff718](https://github.com/H4ad/serverless-adapter/commit/84ff718503fb1b86c5c79a85f81e68f132b52067))
* **release:** 3.1.0 [skip ci] ([2ce2729](https://github.com/H4ad/serverless-adapter/commit/2ce27291c58ef2cd06535cfbcc528e8bef21eb2e))
* **scripts:** added another script and renamed parse to generate:parsing ([d9eb7c3](https://github.com/H4ad/serverless-adapter/commit/d9eb7c3653f675378a8c839d7403f854904e2a53))
* **scripts:** fixed script on typescript 4.7 ([968c963](https://github.com/H4ad/serverless-adapter/commit/968c963f31d9557e2c0bde1f054cc6f55ba1edd2))
* **scripts:** fixed some issues with sidebar and links ([3027bda](https://github.com/H4ad/serverless-adapter/commit/3027bda904968867bd3393d416241615cad73cd1))
* **semantic-release:** removed unused package ([2c60275](https://github.com/H4ad/serverless-adapter/commit/2c602753ecd3fcdff23567ec8a77e317ebd7f9fe))
* **tmuxinator:** changed organization of panes and windows ([1d6289d](https://github.com/H4ad/serverless-adapter/commit/1d6289d5cba0ea73494148e390de852e74fd789e))
* **tmuxinator:** fixed path for docs website ([6ee5bf1](https://github.com/H4ad/serverless-adapter/commit/6ee5bf16b4e2ff4befdd9920cc548a5b19eefc99))
* **tools-versions:** added file to define which version of nodejs to use during development ([597f1c1](https://github.com/H4ad/serverless-adapter/commit/597f1c182c9fbb34577c62f84c52d7b0e003eb97))
* **tsconfig:** enable go to source definition ([483856e](https://github.com/H4ad/serverless-adapter/commit/483856e2248293d4b6c0bc03a82535c3ea958f54))
* **tsconfig:** reduce lib size by removing declaration map ([cdbae6e](https://github.com/H4ad/serverless-adapter/commit/cdbae6ed7783ab3d9cdfe0e2a8a4f6eddb532ba1))
* **www:** bump versions ([153e6e6](https://github.com/H4ad/serverless-adapter/commit/153e6e643e504e07bec6b36ae0fd5e56b3dac5a7))


### Performance Improvements

* **api-gateway-v1:** faster getRequest ([70f7020](https://github.com/H4ad/serverless-adapter/commit/70f7020e347e57417920b32eb68d4456df7db246))
* **api-gateway-v2:** faster getRequest method ([3b08708](https://github.com/H4ad/serverless-adapter/commit/3b087087af1873414c85c8db09b5867c0752ab56))
* **api-gateway-v2:** single pass when collecting headers and cookies on response ([3d65895](https://github.com/H4ad/serverless-adapter/commit/3d65895f174db00e2e45b3626223874a2d71f40a))
* **aws:** optimized strip base path ([f72967a](https://github.com/H4ad/serverless-adapter/commit/f72967afaa1cdc4dbc95cc2298d560dc21b27884))
* **default-handler:** always log using fn ([36950b3](https://github.com/H4ad/serverless-adapter/commit/36950b36e246a43dc45d2d9ef2d989402eef916b))
* **headers:** use object.keys + reduce instead of entries ([41339c6](https://github.com/H4ad/serverless-adapter/commit/41339c681f52b05328097a8b4cbb9cf27e704a84))
* **logger:** faster logger ([103817c](https://github.com/H4ad/serverless-adapter/commit/103817c7a284dabedb78807d6db7fbf2ed42ed75))
* **logging:** add defer log for util inspect ([2a7389e](https://github.com/H4ad/serverless-adapter/commit/2a7389ea7e56a73fcf0c29a7d3570cc4cb5dbdfb))
* **optional:** use strict equal instead of typeof ([1fba12c](https://github.com/H4ad/serverless-adapter/commit/1fba12c6e22089376437a8976971ad30df1283e1))
* **tsconfig:** do not use define because is slower ([35ce7c7](https://github.com/H4ad/serverless-adapter/commit/35ce7c738b69a39b7179f1d8cae40924967ad0cd))


### CI

* **codeql:** added typescript as language ([73f8c04](https://github.com/H4ad/serverless-adapter/commit/73f8c04f287b56adaf59f05f5363b617a9e0f300))
* **codeql:** run only when changing code files ([93d8f1c](https://github.com/H4ad/serverless-adapter/commit/93d8f1c029e2c84e5c4b1366ecddc9b1b11c6fa5))
* **codeql:** updated configuration ([9ffa3e8](https://github.com/H4ad/serverless-adapter/commit/9ffa3e8b5f4c7df8772cd64ef8640646879f713f))
* **docs:** added command to install peer dependencies ([591e65c](https://github.com/H4ad/serverless-adapter/commit/591e65c0f6c2219a86fee59793d0d24ed067fab1))
* **docs:** added docs action to deploy docs when merge ([84ec8a0](https://github.com/H4ad/serverless-adapter/commit/84ec8a088278316d7cbbd52c98d93d1ade965d55))
* **docs:** added missing build commands to generate API pages ([4380dc2](https://github.com/H4ad/serverless-adapter/commit/4380dc259af1b42384f3c41854f5be83773a62ca))
* **docs:** changed nodejs version to 16.x after upgrade docusaurus ([43ff776](https://github.com/H4ad/serverless-adapter/commit/43ff776b69176e0598bd82094b11545d52358699))
* **docs:** fixed issue with build folder ([e1bb970](https://github.com/H4ad/serverless-adapter/commit/e1bb9705886f34aaec757f8c3257c5663e886dc2))
* **docs:** fixed issue with not deploying docs ([edc3cd3](https://github.com/H4ad/serverless-adapter/commit/edc3cd3f50886b740e28c84f0370c317268fc888))
* **docs:** include scripts folder to diff paths ([d754a8f](https://github.com/H4ad/serverless-adapter/commit/d754a8f03041c1084af57e61090a628046392c36))
* **docs:** only trigger when update workflows of docs ([c1e7f8a](https://github.com/H4ad/serverless-adapter/commit/c1e7f8aefdaf18a12f5a26c2b0cbc94f4c830322))
* **docs:** removed deploy for each pull request and added deploy by manual trigger ([5f3a220](https://github.com/H4ad/serverless-adapter/commit/5f3a2202831347a0fe7fc4a74cc372ded9e0d013))
* **docs:** removed install peers command ([ca483c5](https://github.com/H4ad/serverless-adapter/commit/ca483c5adc03af53e38b9bfcd38b3da7d247413d))
* **docs:** removed step to notify crawler ([0c4a0fa](https://github.com/H4ad/serverless-adapter/commit/0c4a0fa42d7826560ea636f8867b37b70ab5ada1))
* **pr & firebase:** fixed test firebase on nodejs 12.x ([df2ecf1](https://github.com/H4ad/serverless-adapter/commit/df2ecf1b51a7d30741a38bbf8bdb8b1eaac1c14e))
* **pr & release:** added command to install peer dependencies ([1e9b603](https://github.com/H4ad/serverless-adapter/commit/1e9b603a54dc30dbcbe85d32c4a2cfc2da3e1dfb))
* **pr & release:** fixed install latest npm on nodejs and fixed nodejs version in release ([9e450df](https://github.com/H4ad/serverless-adapter/commit/9e450dfbd3f15a36273c76c1f45df68281ad6f81))
* **pr:** added command to update npm ([ec02429](https://github.com/H4ad/serverless-adapter/commit/ec024293bbe1d9801d4934f921f0f767e008190d))
* **pr:** added job to build docs ([f4ef684](https://github.com/H4ad/serverless-adapter/commit/f4ef684f379f8b64ec49739d463750a4302ba39d))
* **pr:** fixed wrong cache key when restore for docs ([a1e2c4d](https://github.com/H4ad/serverless-adapter/commit/a1e2c4db5af6e5089885efe4121bc0667bc6cbf6))
* **pr:** only run when update specific files ([0085520](https://github.com/H4ad/serverless-adapter/commit/0085520b20edb0a33111bdb7780195805d31b0af))
* **pr:** removed install peers because already have the dependency in dev ([7ed9148](https://github.com/H4ad/serverless-adapter/commit/7ed9148483b018a82edac9d36284f88273e95edc))
* **pr:** removed nodejs 10.x from tests ([7c96d4c](https://github.com/H4ad/serverless-adapter/commit/7c96d4ca20803c2ff65817876c094d5cab60d516))
* **pr:** stop running the pr on main ([7c7a05a](https://github.com/H4ad/serverless-adapter/commit/7c7a05a78928a2ef96d67dae38f6f56b25361575))
* **release:** added coverage ([57f1e09](https://github.com/H4ad/serverless-adapter/commit/57f1e09d63936546764708880e5dd5e799c332b6))
* **release:** added provenance during publish ([1161e42](https://github.com/H4ad/serverless-adapter/commit/1161e4227fb63ad272ba740ba186de63d40955c3))
* **release:** fixed issue with nodejs version ([fc02f57](https://github.com/H4ad/serverless-adapter/commit/fc02f57fc8e3c79383466ed7f251a185ac1153a3))
* **release:** fixed issue with release ci ([8e5588f](https://github.com/H4ad/serverless-adapter/commit/8e5588fa4240869b29148d65458904d40915e4f9))
* **release:** include all commits on release ([9185a0b](https://github.com/H4ad/serverless-adapter/commit/9185a0b6ab34174905669cfdd084b2cc9afe54bb))
* **release:** moved configuration to the correct place ([b8c6156](https://github.com/H4ad/serverless-adapter/commit/b8c6156eb3d7df06f1c370965e91abc850217adc))
* **release:** use release manager instead of merge-and-release ([ef278e6](https://github.com/H4ad/serverless-adapter/commit/ef278e6efc2732e5e21d2e3ae9d32fb96ac1edc2))
* **tests:** skip apollo server on nodejs 12.x & changed verification for deepkit ([0e069ab](https://github.com/H4ad/serverless-adapter/commit/0e069abb735e3c5450faa05451465d386a73c37f))
* **workflows:** bump action versions ([647e694](https://github.com/H4ad/serverless-adapter/commit/647e694ce6919925c5df4188450e49faa5ec3fc8))
* **workflows:** just some improvements on ci of release ([6961feb](https://github.com/H4ad/serverless-adapter/commit/6961feb9abe665a601a9c6d890bb1337b5178859))


### Refactoring

* **core:** removed support for regex on binary validation and case-sensitive headers ([4fb3a39](https://github.com/H4ad/serverless-adapter/commit/4fb3a39f0434d29d66b018f451698954ecbf3ed4))
* **digital-ocean:** event based on correct option and removed args parser strategy ([38c61c4](https://github.com/H4ad/serverless-adapter/commit/38c61c483dcce8117e5c2ca2c7a19b060c709cfd))
* **digital-ocean:** force uppercase of http method ([9119579](https://github.com/H4ad/serverless-adapter/commit/9119579b5c721ed5a658032f17bf76ed0e6af004))
* **docs & exporting:** added new handler and adapter to docs & fixed issue with exporting handler ([ca15263](https://github.com/H4ad/serverless-adapter/commit/ca15263d98b19504cfa76bd5a8d72b7adf528a59))
* **dummy.resolver:** added index file to short import path ([0b61a24](https://github.com/H4ad/serverless-adapter/commit/0b61a24d5fe65f34288a46a8f8b4ba7796302f27))
* **framework.contract:** added better types to framework contract ([caace98](https://github.com/H4ad/serverless-adapter/commit/caace98b6d7d2bcbb1fc76585000f493f474e51f))
* **generic:** removed default any from generics to better typing & added tests for handlers ([5ace6ba](https://github.com/H4ad/serverless-adapter/commit/5ace6ba33f2b83e8d92fca7c189da8dd357a56e2))
* **huawei:** removed unused folder types, it's not necessary without event function support ([c3d20f2](https://github.com/H4ad/serverless-adapter/commit/c3d20f2968773e700ac2ac90d046be79baae2984))
* **network-request:** removed object.assign and set property directly ([654d5ce](https://github.com/H4ad/serverless-adapter/commit/654d5ceda4e4cfeab6750afff5364e5483fe2be2))
* **resolvers:** rewrite resolver contract to expose better api ([3c87d0a](https://github.com/H4ad/serverless-adapter/commit/3c87d0a3f9bc53a62c56cf1e8f89684657f31c17))
* **serverless-builder:** renamed to serverless adapter ([f084d17](https://github.com/H4ad/serverless-adapter/commit/f084d177e6ac129baca4ec153692bec4f07aab4b))
* **trpc:** deprecate BufferToJSObjectTransformer to promote body-parser ([760d2e1](https://github.com/H4ad/serverless-adapter/commit/760d2e1834a455ca4332cb2f10bef453294250aa))
* **v2:** removed old files and only leave the v2 version ([d0fd44e](https://github.com/H4ad/serverless-adapter/commit/d0fd44e63a9a1657218f7c153fa8e5a3ca59e972))


### Tests

* **alb-event & api-gateway:** added tests for alb adapter & added event source api gateway v1 ([120e791](https://github.com/H4ad/serverless-adapter/commit/120e79139f088b2e60c03408b982ccb26441538a))
* **api-gateway-v1:** added tests and fixed some issues during the tests ([ebee2a1](https://github.com/H4ad/serverless-adapter/commit/ebee2a12035253579b0cc8384c4931c0ea5fe398))
* **api-gateway-v2:** added tests to api gateway v2 adapter ([49c8633](https://github.com/H4ad/serverless-adapter/commit/49c8633e0bae90360641126f238b2f8023acf030))
* **aws & core:** wrong tests after bump jest ([9bda83d](https://github.com/H4ad/serverless-adapter/commit/9bda83d88a38eb611f0f700796dd88f5f18c8fef))
* **azure:** added test when useContextLogWhenInternalLogger is false ([9664f6b](https://github.com/H4ad/serverless-adapter/commit/9664f6bbf5317ac7e72f6ccb20fdff7fe5c258b1))
* **core:** added test for event body methods ([bb5ea6e](https://github.com/H4ad/serverless-adapter/commit/bb5ea6e56fe8a66569439daf856c9bb8897fbe13))
* **core:** added tests for headers file ([5dac5a9](https://github.com/H4ad/serverless-adapter/commit/5dac5a946cb247378a66e71026325fb8ced54525))
* **core:** added tests for logger file ([b309444](https://github.com/H4ad/serverless-adapter/commit/b30944443be4cbe3e181ef0d071f9ae2ca34f953))
* **core:** added tests for path file ([6fd4c7a](https://github.com/H4ad/serverless-adapter/commit/6fd4c7aa0315593eb7597892429ecf6573dfe98c))
* **core:** added tests for stream file ([00860ad](https://github.com/H4ad/serverless-adapter/commit/00860ad700ab97fecbffb00f4b37b0892ee78cce))
* **core:** added tests to is binary file ([1ad531f](https://github.com/H4ad/serverless-adapter/commit/1ad531fadd8c5ad85265d64107963f9a4cdd71a8))
* **core:** added tests to no-op file ([c651a64](https://github.com/H4ad/serverless-adapter/commit/c651a648a56c1ae5f79666973c653920ff95b72c))
* **core:** added tests to optional file ([e72baf4](https://github.com/H4ad/serverless-adapter/commit/e72baf4b65534c31ec581eae8633de1fac66fb47))
* **core:** added tests to the current-invoke file ([cabe88e](https://github.com/H4ad/serverless-adapter/commit/cabe88e24fbeab064b14fc49213113ba84287c72))
* **deepkit:** added missing tests for deepkit ([89b3b50](https://github.com/H4ad/serverless-adapter/commit/89b3b50f3e0bf8cf1ecb1fe70edd5d4bb2a64f86))
* **deepkit:** added tests for deepkit ([3661ab8](https://github.com/H4ad/serverless-adapter/commit/3661ab8d8ef6799d1205ca70801d3ec3f3d2b0e1))
* **deepkit:** fixed issues with local testing of deepkit ([7fe122b](https://github.com/H4ad/serverless-adapter/commit/7fe122bcc3cb483eb517ab95e6f199efb2cfe8da))
* **deepkit:** skip tests for deepkit in node 12.x ([8c2af8c](https://github.com/H4ad/serverless-adapter/commit/8c2af8ca1df43faa0586969a9f45fcfce7d40572))
* **deepkit:** try to skip in nodejs 12.x ([6308317](https://github.com/H4ad/serverless-adapter/commit/630831725edbcb5a5b82f6669aa35a44f5d48b79))
* **dynamodb:** added tests for dynamo db adapter and improved other tests ([1bffb81](https://github.com/H4ad/serverless-adapter/commit/1bffb8116d5e38b5c30b5ec3b782da0f6a24dd71))
* **event-bridge:** added tests to event bridge ([de8c3a8](https://github.com/H4ad/serverless-adapter/commit/de8c3a83963e5595b8c7dfe405fd0dae81c4f4eb))
* **fastify & cors:** added missing mock fn in nodejs 12.x for cors framework tests ([46acb15](https://github.com/H4ad/serverless-adapter/commit/46acb15001e385c87060724f77567cee8eb7a93a))
* **fastify:** fixed issue with test of fastify & added support to test fastify@3.x on nodejs12 ([b1b73f4](https://github.com/H4ad/serverless-adapter/commit/b1b73f43372d30db865cda1615318e403f6c7431))
* **framework.mock:** added content type in headers to fix response when fetch from mock ([eb50a45](https://github.com/H4ad/serverless-adapter/commit/eb50a457d9ba2e926f3802bcfc854b6a9cfd7f44))
* **frameworks:** added tests to all frameworks ([ad42027](https://github.com/H4ad/serverless-adapter/commit/ad42027129e0e644ceb4a1621007840850531775))
* **huawei:** removed .only tests ([f78160f](https://github.com/H4ad/serverless-adapter/commit/f78160f5c5f49b864f3b71e654e262e2f2692044))
* **lambda-edge:** added tests to lambda edge adapter ([247630e](https://github.com/H4ad/serverless-adapter/commit/247630edd922317af82f4468e6ad2572bb67b5eb))
* **network-response:** added tests to response file ([333eb7a](https://github.com/H4ad/serverless-adapter/commit/333eb7a31c0c73508f834358c6d5e1206c7fcff8))
* **network:** added tests to request ([60f8524](https://github.com/H4ad/serverless-adapter/commit/60f85245ee449777259b726e94c1f493df7e533f))
* **request-lambda-edge:** added tests for the adapter ([c033ea9](https://github.com/H4ad/serverless-adapter/commit/c033ea9c42524a3b85021fbb02dc0fe2ea580dd1))
* **resolvers:** added aws context resolver tests ([9c6ccbd](https://github.com/H4ad/serverless-adapter/commit/9c6ccbdf52782d850491d398d5d009e23e4c654c))
* **resolvers:** added callback resolver tests ([936eb55](https://github.com/H4ad/serverless-adapter/commit/936eb55806ee5e5ef0252dcc22308bb6941490c3))
* **resolvers:** added tests for promise resolver ([064a2ac](https://github.com/H4ad/serverless-adapter/commit/064a2acbecca19c0945878b8ba297d96ee2afeb7))
* **response:** added tests to missing coverage and better organization to test ([90d7f29](https://github.com/H4ad/serverless-adapter/commit/90d7f2997f4f370670c5d093cdccb14f6b7ef3c3))
* **serverless-builder:** added tests to serverless builder ([d44e5bf](https://github.com/H4ad/serverless-adapter/commit/d44e5bf9494466937ee14de816f13911e409a09d))
* **sns:** added tests to sns ([32e2a33](https://github.com/H4ad/serverless-adapter/commit/32e2a338cdbb30916808548e94ef796cdb717e41))
* **sqs:** added tests for sqs ([003b075](https://github.com/H4ad/serverless-adapter/commit/003b075a15220d38651a983ec3129cafa681386f))
* **trpc:** issue with 204 on nodejs 20.x ([f2637f7](https://github.com/H4ad/serverless-adapter/commit/f2637f7056e2066975556e4d158039d2125956d6))
* **vitest:** replaced jest for vitest ([7505fad](https://github.com/H4ad/serverless-adapter/commit/7505fad2b3078aabbc72c105033043c597842933))

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
