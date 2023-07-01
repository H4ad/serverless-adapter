"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8258],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>h});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),i=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},d=function(e){var t=i(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=i(r),c=n,h=u["".concat(p,".").concat(c)]||u[c]||m[c]||o;return r?a.createElement(h,s(s({ref:t},d),{},{components:r})):a.createElement(h,s({ref:t},d))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:n,s[1]=l;for(var i=2;i<o;i++)s[i]=r[i];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},8797:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>i});var a=r(7462),n=(r(7294),r(3905));const o={title:"Apollo Server",description:"See more about how to integrate with Apollo Server."},s=void 0,l={unversionedId:"main/frameworks/apollo-server",id:"main/frameworks/apollo-server",title:"Apollo Server",description:"See more about how to integrate with Apollo Server.",source:"@site/docs/main/frameworks/apollo-server.mdx",sourceDirName:"main/frameworks",slug:"/main/frameworks/apollo-server",permalink:"/docs/main/frameworks/apollo-server",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/frameworks/apollo-server.mdx",tags:[],version:"current",frontMatter:{title:"Apollo Server",description:"See more about how to integrate with Apollo Server."},sidebar:"main",previous:{title:"Frameworks",permalink:"/docs/category/frameworks"},next:{title:"Deepkit",permalink:"/docs/main/frameworks/deepkit"}},p={},i=[{value:"Requirements",id:"requirements",level:2},{value:"Usage",id:"usage",level:2},{value:"Support for AWS SQS, SNS and others.",id:"support-for-aws-sqs-sns-and-others",level:2},{value:"Customizing the Context",id:"customizing-the-context",level:2}],d={toc:i},u="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"In the following section, you will see how to integrate any cloud with your Apollo Server application."),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"We only support HTTP Requests, subscriptions is not supported yet.")),(0,n.kt)("h2",{id:"requirements"},"Requirements"),(0,n.kt)("p",null,"First, you need to ensure you have the libs installed, so run this code:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"npm i --save apollo-server\n")),(0,n.kt)("p",null,"Also, to be able to handle JSON requests, we can use ",(0,n.kt)("a",{parentName:"p",href:"./helpers/body-parser"},"JsonBodyParserFramework"),", so let's install it:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"npm i --save body-parser http-errors\nnpm i --save-dev @types/body-parser\n")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Need to deal with CORS? See ",(0,n.kt)("a",{parentName:"p",href:"./helpers/cors"},"CorsFramework")," which helps you to add correct headers.")),(0,n.kt)("h2",{id:"usage"},"Usage"),(0,n.kt)("p",null,"Then, you just need to use the ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/ApolloServerFramework"},"ApolloServerFramework")," when you create your adapter, like:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="index.ts"',title:'"index.ts"'},"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\nimport { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';\nimport { ApolloServerFramework } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';\nimport { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';\nimport { ApolloServer } from '@apollo/server';\n\nexport const app = new ApolloServer({\n  typeDefs: `type Query { message: String }`,\n  resolvers: {\n    Query: {\n      message: () => 'Hello World!',\n    }\n  },\n});\n\n// json-body is needed to handle JSON content type\nconst framework = new JsonBodyParserFramework(\n  new ApolloServerFramework(),\n);\n\n// you always need to start your application\napp.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();\n\nexport const handler = ServerlessAdapter.new(app)\n  .setFramework(framework)\n  // continue to set the other options here.\n  // .setHandler(new DefaultHandler())\n  // .setResolver(new PromiseResolver())\n  // .addAdapter(new ApiGatewayV1Adapter())\n  // .addAdapter(new ApiGatewayV2Adapter())\n  // after adding all the necessary methods, just call the build method.\n  .build();\n")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Need more examples? See more examples ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/H4ad/serverless-adapter-examples#apollo-server"},"here"),".")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Is your application instance creation an asynchronous process? If so, you might want to consider using the ",(0,n.kt)("a",{parentName:"p",href:"./helpers/lazy"},"LazyFramework"),", which can help with asynchronous startup.")),(0,n.kt)("h2",{id:"support-for-aws-sqs-sns-and-others"},"Support for AWS SQS, SNS and others."),(0,n.kt)("p",null,"Well, this framework will work great for adapters like ",(0,n.kt)("a",{parentName:"p",href:"../adapters/aws/api-gateway-v1"},"ApiGatewayV1Adapter"),", ",(0,n.kt)("a",{parentName:"p",href:"../adapters/aws/api-gateway-v2"},"ApiGatewayV2Adapter"),",\n",(0,n.kt)("a",{parentName:"p",href:"../adapters/azure/http-trigger-v4"},"HttpTriggerV4Adapter")," and others based on pure HTTP requests."),(0,n.kt)("p",null,"But adapters like ",(0,n.kt)("a",{parentName:"p",href:"../adapters/aws/sqs"},"SQSAdapter"),", ",(0,n.kt)("a",{parentName:"p",href:"../adapters/aws/sns"},"SNSAdapter")," and others by default cannot send a request with the correct format that\nApollo Server understands, it's not in your control how the request is constructed, the adapter that construct the request to Apollo."),(0,n.kt)("p",null,"To address this issue, i created the ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Adapters/Apollo%20Server/ApolloServerMutationAdapter"},"ApolloServerMutationAdapter"),", an adapter for other adapters.\nIt follows the same principle of helper frameworks, it wraps the adapter you are using and customize the behavior to support sending valid requests to Apollo."),(0,n.kt)("p",null,"Let's see how to integrate with AWS SQS and AWS SNS, first, let's create the schema."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"const schema = `\n  type Query { message: String }\n\n  type AWSResult {\n    result: String\n  }\n\n  type Mutation {\n    sqs (event: String): AWSResult\n    sns (event: String): AWSResult\n  }\n`;\n")),(0,n.kt)("p",null,"In this schema, you define a mutation with the name you want to give to AWS SQS, I just put ",(0,n.kt)("inlineCode",{parentName:"p"},"sqs")," but you can put whatever you want."),(0,n.kt)("p",null,"About the mutation parameters and the result, you ",(0,n.kt)("inlineCode",{parentName:"p"},"MUST")," define the parameter as ",(0,n.kt)("inlineCode",{parentName:"p"},"event: String"),", but you ",(0,n.kt)("inlineCode",{parentName:"p"},"CAN")," change the ",(0,n.kt)("inlineCode",{parentName:"p"},"AWSResult")," if you want.\nI explain further below about the decision to have this ",(0,n.kt)("inlineCode",{parentName:"p"},"event: String"),"."),(0,n.kt)("p",null,"Ok, after define the schema, let's create the apollo server instance."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"import { ApolloServer } from '@apollo/server';\nimport { GraphQLError } from 'graphql/error/GraphQLError';\nimport { DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';\nimport type { SNSEvent, SQSEvent } from 'aws-lambda';\n\nexport const app = new ApolloServer<DefaultServerlessApolloServerContext>({\n  typeDefs: schema,\n  resolvers: {\n    Query: {\n      message: () => 'Hello World!',\n    },\n    Mutation: {\n      sqs: (_, data, context) => {\n        // security measures: http://serverless-adapter.viniciusl.com.br/docs/main/adapters/aws/sqs#security\n        if (context.request.headers['host'] !== 'sqs.amazonaws.com')\n          throw new GraphQLError('Your host is not allowed to call this mutation.');\n\n        // here, you can manipulate the event data and do whatever you want with it.\n        const event = JSON.parse(data.event) as SQSEvent;\n\n        // I will just return the event data to better debugging\n        return ({\n          result: JSON.stringify(event),\n        });\n      },\n      sns: (_, data, context) => {\n        // security measures: http://serverless-adapter.viniciusl.com.br/docs/main/adapters/aws/sqs#security\n        if (context.request.headers['host'] !== 'sns.amazonaws.com')\n          throw new GraphQLError('Your host is not allowed to call this mutation.');\n\n        // here, you can manipulate the event data and do whatever you want with it.\n        const event = JSON.parse(data.event) as SNSEvent;\n\n        // I will just return the event data to better debugging\n        return ({\n          result: JSON.stringify(event),\n        });\n      },\n    },\n  },\n});\n")),(0,n.kt)("p",null,"In the code above, we created the Apollo Server Instance with the mutations that will handle the events from SQS and SNS."),(0,n.kt)("p",null,"Because of the nature of GraphQL, it is too hard to create strict schema definitions for each event source, so I just serialize in JSON the event and send it as string\ninside ",(0,n.kt)("inlineCode",{parentName:"p"},"data")," with the type of ",(0,n.kt)("inlineCode",{parentName:"p"},"{ event: string }"),"."),(0,n.kt)("p",null,"About the result of each mutation (",(0,n.kt)("inlineCode",{parentName:"p"},"AWSResult"),"), you can customize it to return whatever you want, like the name, but you will need to specify the return inside ",(0,n.kt)("inlineCode",{parentName:"p"},"ApolloServerMutationAdapter"),",\nwe will see this configuration in next section."),(0,n.kt)("p",null,"Well, now we only need to expose the Apollo Server Instance using Serverless Adapter:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\nimport { ApolloServerMutationAdapter } from '@h4ad/serverless-adapter/lib/adapters/apollo-server';\nimport { ApiGatewayV2Adapter, SNSAdapter, SQSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';\nimport { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';\nimport { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';\nimport { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';\nimport { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';\nimport { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';\n\nconst framework = new ApolloServerFramework<DefaultServerlessApolloServerContext>();\nconst jsonBodyFramework = new JsonBodyParserFramework(framework);\n\n// optional: you can configure cors using this guy here, if you don't want, just erase\nconst corsFramework = new CorsFramework(jsonBodyFramework, {\n  origin: '*',\n  maxAge: 30,\n});\n\n// needed to start the application, without this, the apollo server will throw an error\napp.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();\n\n// let's add support for api gateway v2\nconst apiGatewayV2Adapter = new ApiGatewayV2Adapter();\n\n// let's add support for sqs\nconst sqsAdapter = new SQSAdapter();\nconst wrappedSqsAdapter = new ApolloServerMutationAdapter(\n  sqsAdapter,\n  {\n    mutationName: 'sqs', // remember the scheme? This is the name of the mutation\n    mutationResultQuery: '{ result }', // we specify the return as `AWSResult` and here we specify which properties we want to return of that type\n    // if we dont specify nothing, `{ __typename }` will be returned.\n  }\n);\n\n// let's add support for sns\nconst snsAdapter = new SNSAdapter();\nconst wrappedSnsAdapter = new ApolloServerMutationAdapter(\n  snsAdapter,\n  {\n    mutationName: 'sns', // remember the scheme? This is the name of the mutation\n    mutationResultQuery: '{ result }', // we specify the return as `AWSResult` and here we specify which properties we want to return of that type\n    // if we dont specify nothing, `{ __typename }` will be returned.\n  }\n);\n\nexport const handler = ServerlessAdapter.new(app)\n  .setFramework(corsFramework)\n  .setHandler(new DefaultHandler())\n  .setResolver(new PromiseResolver())\n  .addAdapter(apiGatewayV2Adapter)\n  .addAdapter(wrappedSqsAdapter)\n  .addAdapter(wrappedSnsAdapter)\n  .build();\n")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Need more examples? See more examples ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/H4ad/serverless-adapter-examples#apollo-server"},"here"),".")),(0,n.kt)("p",null,"That's it! Now you are able to receive ",(0,n.kt)("inlineCode",{parentName:"p"},"API Gateway V2")," requests and also integrate ",(0,n.kt)("inlineCode",{parentName:"p"},"AWS SQS")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"AWS SNS")," into the same lambda function. Great, right?"),(0,n.kt)("h2",{id:"customizing-the-context"},"Customizing the Context"),(0,n.kt)("p",null,"By default, the context will be ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/ApolloServerFramework/DefaultServerlessApolloServerContext"},"DefaultServerlessApolloServerContext"),", but you can customize\nthe creation of the context by passing ",(0,n.kt)("inlineCode",{parentName:"p"},"context")," variable inside ",(0,n.kt)("inlineCode",{parentName:"p"},"ApolloServerFramework"),", like:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"import { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';\n\n// I want the date when it's started, and also, i always recommend including the default context\ntype MyCustomContext = { startedAt: Date } & DefaultServerlessApolloServerContext;\n\nconst framework = new ApolloServerFramework<MyCustomContext>({\n  context: async ({ request, response }) => {\n    return {\n      startedAt: new Date(),\n      request,\n      response,\n    };\n  },\n});\n")))}m.isMDXComponent=!0}}]);