"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4977],{3571:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>i,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>d,toc:()=>c});var t=n(5893),s=n(1151);const a={title:"S3",description:"See more about how to integrate with AWS S3."},o=void 0,d={id:"main/adapters/aws/s3",title:"S3",description:"See more about how to integrate with AWS S3.",source:"@site/docs/main/adapters/aws/s3.mdx",sourceDirName:"main/adapters/aws",slug:"/main/adapters/aws/s3",permalink:"/docs/main/adapters/aws/s3",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/adapters/aws/s3.mdx",tags:[],version:"current",frontMatter:{title:"S3",description:"See more about how to integrate with AWS S3."},sidebar:"main",previous:{title:"Lambda@Edge",permalink:"/docs/main/adapters/aws/lambda-edge"},next:{title:"SNS",permalink:"/docs/main/adapters/aws/sns"}},i={},c=[{value:"Typescript",id:"typescript",level:2},{value:"About the adapter",id:"about-the-adapter",level:2},{value:"Customizing",id:"customizing",level:2},{value:"Usage",id:"usage",level:2},{value:"Security",id:"security",level:2},{value:"What happens when my response status is different from 2xx or 3xx?",id:"what-happens-when-my-response-status-is-different-from-2xx-or-3xx",level:2}];function l(e){const r={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(r.p,{children:["The adapter to handle requests from ",(0,t.jsx)(r.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html",children:"AWS S3"}),"."]}),"\n",(0,t.jsx)(r.admonition,{type:"info",children:(0,t.jsxs)(r.p,{children:["The option of ",(0,t.jsx)(r.code,{children:"responseWithErrors"})," is ignored by this adapter and we always call ",(0,t.jsx)(r.code,{children:"resolver.fail"})," with the error."]})}),"\n",(0,t.jsx)(r.h2,{id:"typescript",children:"Typescript"}),"\n",(0,t.jsxs)(r.p,{children:["To correctly type your ",(0,t.jsx)(r.code,{children:"body"})," when receiving the AWS S3 request, you must install ",(0,t.jsx)(r.code,{children:"aws-lambda"}),":"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"npm i --save-dev @types/aws-lambda\n"})}),"\n",(0,t.jsxs)(r.p,{children:["So when getting the ",(0,t.jsx)(r.code,{children:"body"})," you should use this type:"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",metastring:'title="s3.controller.ts"',children:"import type { S3Event } from 'aws-lambda';\n"})}),"\n",(0,t.jsx)(r.h2,{id:"about-the-adapter",children:"About the adapter"}),"\n",(0,t.jsxs)(r.p,{children:["In AWS S3, you don't have requests, you just receive the records from the queue in the ",(0,t.jsx)(r.code,{children:"event"})," property of the handler."]}),"\n",(0,t.jsxs)(r.p,{children:["So, in order to handle this adapter, by default we create a ",(0,t.jsx)(r.code,{children:"POST"})," request to ",(0,t.jsx)(r.code,{children:"/s3"})," with the ",(0,t.jsx)(r.code,{children:"body"})," being the ",(0,t.jsx)(r.code,{children:"event"})," property as JSON."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-json",metastring:'title="s3-event-example.json"',children:'{\r\n  "Records": [\r\n    {\r\n      "eventVersion": "2.1",\r\n      "eventSource": "aws:s3",\r\n      "awsRegion": "us-east-2",\r\n      "eventTime": "2019-09-03T19:37:27.192Z",\r\n      "eventName": "ObjectCreated:Put",\r\n      "userIdentity": {\r\n        "principalId": "AWS:AIDAINPONIXQXHT3IKHL2"\r\n      },\r\n      "requestParameters": {\r\n        "sourceIPAddress": "205.255.255.255"\r\n      },\r\n      "responseElements": {\r\n        "x-amz-request-id": "D82B88E5F771F645",\r\n        "x-amz-id-2": "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo="\r\n      },\r\n      "s3": {\r\n        "s3SchemaVersion": "1.0",\r\n        "configurationId": "828aa6fc-f7b5-4305-8584-487c791949c1",\r\n        "bucket": {\r\n          "name": "DOC-EXAMPLE-BUCKET",\r\n          "ownerIdentity": {\r\n            "principalId": "A3I5XTEXAMAI3E"\r\n          },\r\n          "arn": "arn:aws:s3:::lambda-artifacts-deafc19498e3f2df"\r\n        },\r\n        "object": {\r\n          "key": "b21b84d653bb07b05b1e6b33684dc11b",\r\n          "size": 1305107,\r\n          "eTag": "b21b84d653bb07b05b1e6b33684dc11b",\r\n          "sequencer": "0C0F6F405D6ED209E1"\r\n        }\r\n      }\r\n    }\r\n  ]\r\n}\n'})}),"\n",(0,t.jsx)(r.p,{children:"Normally, your framework will parse this JSON and return the parsed values as javascript objects."}),"\n",(0,t.jsx)(r.h2,{id:"customizing",children:"Customizing"}),"\n",(0,t.jsxs)(r.p,{children:["You can change the HTTP Method and Path that will be used to create the request by sending ",(0,t.jsx)(r.code,{children:"s3ForwardMethod"})," and ",(0,t.jsx)(r.code,{children:"s3ForwardPath"})," inside ",(0,t.jsx)(r.a,{href:"/docs/api/Adapters/AWS/S3Adapter/S3AdapterOptions",children:"S3AdapterOptions"}),"."]}),"\n",(0,t.jsx)(r.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(r.p,{children:"To add support to AWS S3 you do the following:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",metastring:'title="index.ts"',children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { S3Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';\r\nimport { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';\r\nimport app from './app';\r\n\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setHandler(new DefaultHandler())\r\n  // .setFramework(new ExpressFramework())\r\n  // .setResolver(new PromiseResolver())\r\n  .addAdapter(new S3Adapter())\r\n  // customizing:\r\n  // .addAdapter(new S3Adapter({ s3ForwardPath: '/prod/s3', s3ForwardMethod: 'PUT' }))\r\n  .build();\n"})}),"\n",(0,t.jsx)(r.admonition,{type:"caution",children:(0,t.jsxs)(r.p,{children:["When you configure your API with some ",(0,t.jsx)(r.code,{children:"basePath"})," like ",(0,t.jsx)(r.code,{children:"/prod"}),", you should set ",(0,t.jsx)(r.code,{children:"s3ForwardPath"})," as ",(0,t.jsx)(r.code,{children:"/prod/s3"})," instead leave as default ",(0,t.jsx)(r.code,{children:"/s3"}),"."]})}),"\n",(0,t.jsx)(r.h2,{id:"security",children:"Security"}),"\n",(0,t.jsxs)(r.p,{children:["You ",(0,t.jsx)(r.strong,{children:"MUST"})," check if the header ",(0,t.jsx)(r.code,{children:"Host"})," contains the value of ",(0,t.jsx)(r.code,{children:"s3.amazonaws.com"}),"."]}),"\n",(0,t.jsxs)(r.p,{children:["Without checking this header, if you add this adapter and ",(0,t.jsx)(r.a,{href:"./api-gateway-v2",children:"AWS API Gateway V2"})," adapter, you will be vulnerable to attacks\r\nbecause anyone can create a ",(0,t.jsx)(r.code,{children:"POST"})," request to ",(0,t.jsx)(r.code,{children:"/s3"}),"."]}),"\n",(0,t.jsx)(r.h2,{id:"what-happens-when-my-response-status-is-different-from-2xx-or-3xx",children:"What happens when my response status is different from 2xx or 3xx?"}),"\n",(0,t.jsx)(r.p,{children:"Well, this library will throw an error.\r\nIn previous versions of this library, the behavior was different, but now we throw an error if the status does not indicate success."}),"\n",(0,t.jsx)(r.p,{children:"When it throws an error, the request will simply fail to process the event, and depending on how you set up your dead-letter queue or your retry police,\r\ncan be sent to dead-letter queue for you to check what happens or try again."})]})}function h(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>d,a:()=>o});var t=n(7294);const s={},a=t.createContext(s);function o(e){const r=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(a.Provider,{value:r},e.children)}}}]);