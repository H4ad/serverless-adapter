"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8258],{1518:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var n=t(5893),s=t(1151);const o={title:"Apollo Server",description:"See more about how to integrate with Apollo Server."},a=void 0,l={id:"main/frameworks/apollo-server",title:"Apollo Server",description:"See more about how to integrate with Apollo Server.",source:"@site/docs/main/frameworks/apollo-server.mdx",sourceDirName:"main/frameworks",slug:"/main/frameworks/apollo-server",permalink:"/docs/main/frameworks/apollo-server",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/frameworks/apollo-server.mdx",tags:[],version:"current",frontMatter:{title:"Apollo Server",description:"See more about how to integrate with Apollo Server."},sidebar:"main",previous:{title:"Frameworks",permalink:"/docs/category/frameworks"},next:{title:"Deepkit",permalink:"/docs/main/frameworks/deepkit"}},i={},d=[{value:"Requirements",id:"requirements",level:2},{value:"Usage",id:"usage",level:2},{value:"Support for AWS SQS, SNS and others.",id:"support-for-aws-sqs-sns-and-others",level:2},{value:"Customizing the Context",id:"customizing-the-context",level:2}];function p(e){const r={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:"In the following section, you will see how to integrate any cloud with your Apollo Server application."}),"\n",(0,n.jsxs)(r.blockquote,{children:["\n",(0,n.jsx)(r.p,{children:"We only support HTTP Requests, subscriptions is not supported yet."}),"\n"]}),"\n",(0,n.jsx)(r.h2,{id:"requirements",children:"Requirements"}),"\n",(0,n.jsx)(r.p,{children:"First, you need to ensure you have the libs installed, so run this code:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-bash",children:"npm i --save apollo-server\n"})}),"\n",(0,n.jsxs)(r.p,{children:["Also, to be able to handle JSON requests, we can use ",(0,n.jsx)(r.a,{href:"./helpers/body-parser",children:"JsonBodyParserFramework"}),", so let's install it:"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-bash",children:"npm i --save body-parser http-errors\r\nnpm i --save-dev @types/body-parser\n"})}),"\n",(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["Need to deal with CORS? See ",(0,n.jsx)(r.a,{href:"./helpers/cors",children:"CorsFramework"})," which helps you to add correct headers."]})}),"\n",(0,n.jsx)(r.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsxs)(r.p,{children:["Then, you just need to use the ",(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/ApolloServerFramework",children:"ApolloServerFramework"})," when you create your adapter, like:"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",metastring:'title="index.ts"',children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';\r\nimport { ApolloServerFramework } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';\r\nimport { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';\r\nimport { ApolloServer } from '@apollo/server';\r\n\r\nexport const app = new ApolloServer({\r\n  typeDefs: `type Query { message: String }`,\r\n  resolvers: {\r\n    Query: {\r\n      message: () => 'Hello World!',\r\n    }\r\n  },\r\n});\r\n\r\n// json-body is needed to handle JSON content type\r\nconst framework = new JsonBodyParserFramework(\r\n  new ApolloServerFramework(),\r\n);\r\n\r\n// you always need to start your application\r\napp.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();\r\n\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setFramework(framework)\r\n  // continue to set the other options here.\r\n  // .setHandler(new DefaultHandler())\r\n  // .setResolver(new PromiseResolver())\r\n  // .addAdapter(new ApiGatewayV1Adapter())\r\n  // .addAdapter(new ApiGatewayV2Adapter())\r\n  // after adding all the necessary methods, just call the build method.\r\n  .build();\n"})}),"\n",(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["Need more examples? See more examples ",(0,n.jsx)(r.a,{href:"https://github.com/H4ad/serverless-adapter-examples#apollo-server",children:"here"}),"."]})}),"\n",(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["Is your application instance creation an asynchronous process? If so, you might want to consider using the ",(0,n.jsx)(r.a,{href:"./helpers/lazy",children:"LazyFramework"}),", which can help with asynchronous startup."]})}),"\n",(0,n.jsx)(r.h2,{id:"support-for-aws-sqs-sns-and-others",children:"Support for AWS SQS, SNS and others."}),"\n",(0,n.jsxs)(r.p,{children:["Well, this framework will work great for adapters like ",(0,n.jsx)(r.a,{href:"../adapters/aws/api-gateway-v1",children:"ApiGatewayV1Adapter"}),", ",(0,n.jsx)(r.a,{href:"../adapters/aws/api-gateway-v2",children:"ApiGatewayV2Adapter"}),",\r\n",(0,n.jsx)(r.a,{href:"../adapters/azure/http-trigger-v4",children:"HttpTriggerV4Adapter"})," and others based on pure HTTP requests."]}),"\n",(0,n.jsxs)(r.p,{children:["But adapters like ",(0,n.jsx)(r.a,{href:"../adapters/aws/sqs",children:"SQSAdapter"}),", ",(0,n.jsx)(r.a,{href:"../adapters/aws/sns",children:"SNSAdapter"})," and others by default cannot send a request with the correct format that\r\nApollo Server understands, it's not in your control how the request is constructed, the adapter that construct the request to Apollo."]}),"\n",(0,n.jsxs)(r.p,{children:["To address this issue, i created the ",(0,n.jsx)(r.a,{href:"/docs/api/Adapters/Apollo%20Server/ApolloServerMutationAdapter",children:"ApolloServerMutationAdapter"}),", an adapter for other adapters.\r\nIt follows the same principle of helper frameworks, it wraps the adapter you are using and customize the behavior to support sending valid requests to Apollo."]}),"\n",(0,n.jsx)(r.p,{children:"Let's see how to integrate with AWS SQS and AWS SNS, first, let's create the schema."}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",children:"const schema = `\r\n  type Query { message: String }\r\n\r\n  type AWSResult {\r\n    result: String\r\n  }\r\n\r\n  type Mutation {\r\n    sqs (event: String): AWSResult\r\n    sns (event: String): AWSResult\r\n  }\r\n`;\n"})}),"\n",(0,n.jsxs)(r.p,{children:["In this schema, you define a mutation with the name you want to give to AWS SQS, I just put ",(0,n.jsx)(r.code,{children:"sqs"})," but you can put whatever you want."]}),"\n",(0,n.jsxs)(r.p,{children:["About the mutation parameters and the result, you ",(0,n.jsx)(r.code,{children:"MUST"})," define the parameter as ",(0,n.jsx)(r.code,{children:"event: String"}),", but you ",(0,n.jsx)(r.code,{children:"CAN"})," change the ",(0,n.jsx)(r.code,{children:"AWSResult"})," if you want.\r\nI explain further below about the decision to have this ",(0,n.jsx)(r.code,{children:"event: String"}),"."]}),"\n",(0,n.jsx)(r.p,{children:"Ok, after define the schema, let's create the apollo server instance."}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",children:"import { ApolloServer } from '@apollo/server';\r\nimport { GraphQLError } from 'graphql/error/GraphQLError';\r\nimport { DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';\r\nimport type { SNSEvent, SQSEvent } from 'aws-lambda';\r\n\r\nexport const app = new ApolloServer<DefaultServerlessApolloServerContext>({\r\n  typeDefs: schema,\r\n  resolvers: {\r\n    Query: {\r\n      message: () => 'Hello World!',\r\n    },\r\n    Mutation: {\r\n      sqs: (_, data, context) => {\r\n        // security measures: http://serverless-adapter.viniciusl.com.br/docs/main/adapters/aws/sqs#security\r\n        if (context.request.headers['host'] !== 'sqs.amazonaws.com')\r\n          throw new GraphQLError('Your host is not allowed to call this mutation.');\r\n\r\n        // here, you can manipulate the event data and do whatever you want with it.\r\n        const event = JSON.parse(data.event) as SQSEvent;\r\n\r\n        // I will just return the event data to better debugging\r\n        return ({\r\n          result: JSON.stringify(event),\r\n        });\r\n      },\r\n      sns: (_, data, context) => {\r\n        // security measures: http://serverless-adapter.viniciusl.com.br/docs/main/adapters/aws/sqs#security\r\n        if (context.request.headers['host'] !== 'sns.amazonaws.com')\r\n          throw new GraphQLError('Your host is not allowed to call this mutation.');\r\n\r\n        // here, you can manipulate the event data and do whatever you want with it.\r\n        const event = JSON.parse(data.event) as SNSEvent;\r\n\r\n        // I will just return the event data to better debugging\r\n        return ({\r\n          result: JSON.stringify(event),\r\n        });\r\n      },\r\n    },\r\n  },\r\n});\n"})}),"\n",(0,n.jsx)(r.p,{children:"In the code above, we created the Apollo Server Instance with the mutations that will handle the events from SQS and SNS."}),"\n",(0,n.jsxs)(r.p,{children:["Because of the nature of GraphQL, it is too hard to create strict schema definitions for each event source, so I just serialize in JSON the event and send it as string\r\ninside ",(0,n.jsx)(r.code,{children:"data"})," with the type of ",(0,n.jsx)(r.code,{children:"{ event: string }"}),"."]}),"\n",(0,n.jsxs)(r.p,{children:["About the result of each mutation (",(0,n.jsx)(r.code,{children:"AWSResult"}),"), you can customize it to return whatever you want, like the name, but you will need to specify the return inside ",(0,n.jsx)(r.code,{children:"ApolloServerMutationAdapter"}),",\r\nwe will see this configuration in next section."]}),"\n",(0,n.jsx)(r.p,{children:"Well, now we only need to expose the Apollo Server Instance using Serverless Adapter:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { ApolloServerMutationAdapter } from '@h4ad/serverless-adapter/lib/adapters/apollo-server';\r\nimport { ApiGatewayV2Adapter, SNSAdapter, SQSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';\r\nimport { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';\r\nimport { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';\r\nimport { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';\r\nimport { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';\r\nimport { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';\r\n\r\nconst framework = new ApolloServerFramework<DefaultServerlessApolloServerContext>();\r\nconst jsonBodyFramework = new JsonBodyParserFramework(framework);\r\n\r\n// optional: you can configure cors using this guy here, if you don't want, just erase\r\nconst corsFramework = new CorsFramework(jsonBodyFramework, {\r\n  origin: '*',\r\n  maxAge: 30,\r\n});\r\n\r\n// needed to start the application, without this, the apollo server will throw an error\r\napp.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();\r\n\r\n// let's add support for api gateway v2\r\nconst apiGatewayV2Adapter = new ApiGatewayV2Adapter();\r\n\r\n// let's add support for sqs\r\nconst sqsAdapter = new SQSAdapter();\r\nconst wrappedSqsAdapter = new ApolloServerMutationAdapter(\r\n  sqsAdapter,\r\n  {\r\n    mutationName: 'sqs', // remember the scheme? This is the name of the mutation\r\n    mutationResultQuery: '{ result }', // we specify the return as `AWSResult` and here we specify which properties we want to return of that type\r\n    // if we dont specify nothing, `{ __typename }` will be returned.\r\n  }\r\n);\r\n\r\n// let's add support for sns\r\nconst snsAdapter = new SNSAdapter();\r\nconst wrappedSnsAdapter = new ApolloServerMutationAdapter(\r\n  snsAdapter,\r\n  {\r\n    mutationName: 'sns', // remember the scheme? This is the name of the mutation\r\n    mutationResultQuery: '{ result }', // we specify the return as `AWSResult` and here we specify which properties we want to return of that type\r\n    // if we dont specify nothing, `{ __typename }` will be returned.\r\n  }\r\n);\r\n\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setFramework(corsFramework)\r\n  .setHandler(new DefaultHandler())\r\n  .setResolver(new PromiseResolver())\r\n  .addAdapter(apiGatewayV2Adapter)\r\n  .addAdapter(wrappedSqsAdapter)\r\n  .addAdapter(wrappedSnsAdapter)\r\n  .build();\n"})}),"\n",(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["Need more examples? See more examples ",(0,n.jsx)(r.a,{href:"https://github.com/H4ad/serverless-adapter-examples#apollo-server",children:"here"}),"."]})}),"\n",(0,n.jsxs)(r.p,{children:["That's it! Now you are able to receive ",(0,n.jsx)(r.code,{children:"API Gateway V2"})," requests and also integrate ",(0,n.jsx)(r.code,{children:"AWS SQS"})," and ",(0,n.jsx)(r.code,{children:"AWS SNS"})," into the same lambda function. Great, right?"]}),"\n",(0,n.jsx)(r.h2,{id:"customizing-the-context",children:"Customizing the Context"}),"\n",(0,n.jsxs)(r.p,{children:["By default, the context will be ",(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/ApolloServerFramework/DefaultServerlessApolloServerContext",children:"DefaultServerlessApolloServerContext"}),", but you can customize\r\nthe creation of the context by passing ",(0,n.jsx)(r.code,{children:"context"})," variable inside ",(0,n.jsx)(r.code,{children:"ApolloServerFramework"}),", like:"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",children:"import { ApolloServerFramework, DefaultServerlessApolloServerContext } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';\r\n\r\n// I want the date when it's started, and also, i always recommend including the default context\r\ntype MyCustomContext = { startedAt: Date } & DefaultServerlessApolloServerContext;\r\n\r\nconst framework = new ApolloServerFramework<MyCustomContext>({\r\n  context: async ({ request, response }) => {\r\n    return {\r\n      startedAt: new Date(),\r\n      request,\r\n      response,\r\n    };\r\n  },\r\n});\n"})})]})}function h(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>l,a:()=>a});var n=t(7294);const s={},o=n.createContext(s);function a(e){const r=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(o.Provider,{value:r},e.children)}}}]);