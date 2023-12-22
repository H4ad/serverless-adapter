"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6094],{9693:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(5893),t=r(1151);const a={title:"SNS",description:"See more about how to integrate with AWS SNS."},o=void 0,i={id:"main/adapters/aws/sns",title:"SNS",description:"See more about how to integrate with AWS SNS.",source:"@site/docs/main/adapters/aws/sns.mdx",sourceDirName:"main/adapters/aws",slug:"/main/adapters/aws/sns",permalink:"/docs/main/adapters/aws/sns",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/adapters/aws/sns.mdx",tags:[],version:"current",frontMatter:{title:"SNS",description:"See more about how to integrate with AWS SNS."},sidebar:"main",previous:{title:"S3",permalink:"/docs/main/adapters/aws/s3"},next:{title:"SQS",permalink:"/docs/main/adapters/aws/sqs"}},d={},c=[{value:"Typescript",id:"typescript",level:2},{value:"About the adapter",id:"about-the-adapter",level:2},{value:"Customizing",id:"customizing",level:2},{value:"Usage",id:"usage",level:2},{value:"Security",id:"security",level:2},{value:"What happens when my response status is different from 2xx or 3xx?",id:"what-happens-when-my-response-status-is-different-from-2xx-or-3xx",level:2}];function l(e){const s={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(s.p,{children:["The adapter to handle requests from ",(0,n.jsx)(s.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html",children:"AWS SNS"}),"."]}),"\n",(0,n.jsx)(s.admonition,{type:"info",children:(0,n.jsxs)(s.p,{children:["The option of ",(0,n.jsx)(s.code,{children:"responseWithErrors"})," is ignored by this adapter and we always call ",(0,n.jsx)(s.code,{children:"resolver.fail"})," with the error."]})}),"\n",(0,n.jsx)(s.h2,{id:"typescript",children:"Typescript"}),"\n",(0,n.jsxs)(s.p,{children:["To correctly type your ",(0,n.jsx)(s.code,{children:"body"})," when receiving the AWS SNS request, you must install ",(0,n.jsx)(s.code,{children:"aws-lambda"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"npm i --save-dev @types/aws-lambda\n"})}),"\n",(0,n.jsxs)(s.p,{children:["So when getting the ",(0,n.jsx)(s.code,{children:"body"})," you should use this type:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",metastring:'title="sns.controller.ts"',children:"import type { SNSEvent } from 'aws-lambda';\n"})}),"\n",(0,n.jsx)(s.h2,{id:"about-the-adapter",children:"About the adapter"}),"\n",(0,n.jsxs)(s.p,{children:["In AWS SNS, you don't have requests, you just receive the records in the ",(0,n.jsx)(s.code,{children:"event"})," property of the handler."]}),"\n",(0,n.jsxs)(s.p,{children:["So, to be able to handle this adapter, by default we create a ",(0,n.jsx)(s.code,{children:"POST"})," request to ",(0,n.jsx)(s.code,{children:"/sns"})," with the ",(0,n.jsx)(s.code,{children:"body"})," being the ",(0,n.jsx)(s.code,{children:"event"})," property as JSON."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-json",metastring:'title="sns-event-example.json"',children:'{\r\n  "Records": [\r\n    {\r\n      "EventVersion": "1.0",\r\n      "EventSubscriptionArn": "arn:aws:sns:us-east-2:123456789012:sns-lambda:21be56ed-a058-49f5-8c98-aedd2564c486",\r\n      "EventSource": "aws:sns",\r\n      "Sns": {\r\n        "SignatureVersion": "1",\r\n        "Timestamp": "2019-01-02T12:45:07.000Z",\r\n        "Signature": "tcc6faL2yUC6dgZdmrwh1Y4cGa/ebXEkAi6RibDsvpi+tE/1+82j...65r==",\r\n        "SigningCertUrl": "https://sns.us-east-2.amazonaws.com/SimpleNotificationService-ac565b8b1a6c5d002d285f9598aa1d9b.pem",\r\n        "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e",\r\n        "Message": "Hello from SNS!",\r\n        "MessageAttributes": {\r\n          "Test": {\r\n            "Type": "String",\r\n            "Value": "TestString"\r\n          },\r\n          "TestBinary": {\r\n            "Type": "Binary",\r\n            "Value": "TestBinary"\r\n          }\r\n        },\r\n        "Type": "Notification",\r\n        "UnsubscribeUrl": "https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&amp;SubscriptionArn=arn:aws:sns:us-east-2:123456789012:test-lambda:21be56ed-a058-49f5-8c98-aedd2564c486",\r\n        "TopicArn":"arn:aws:sns:us-east-2:123456789012:sns-lambda",\r\n        "Subject": "TestInvoke"\r\n      }\r\n    }\r\n  ]\r\n}\n'})}),"\n",(0,n.jsx)(s.p,{children:"Normally, your framework will parse this JSON and return the parsed values as javascript objects."}),"\n",(0,n.jsx)(s.h2,{id:"customizing",children:"Customizing"}),"\n",(0,n.jsxs)(s.p,{children:["You can change the HTTP Method and Path that will be used to create the request by sending ",(0,n.jsx)(s.code,{children:"snsForwardMethod"})," and ",(0,n.jsx)(s.code,{children:"snsForwardPath"})," inside ",(0,n.jsx)(s.a,{href:"/docs/api/Adapters/AWS/SNSAdapter/SNSAdapterOptions",children:"SNSAdapterOptions"}),"."]}),"\n",(0,n.jsx)(s.h2,{id:"usage",children:"Usage"}),"\n",(0,n.jsx)(s.p,{children:"To add support to AWS SNS you do the following:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",metastring:'title="index.ts"',children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { SNSAdapter } from '@h4ad/serverless-adapter/lib/adapters/aws';\r\nimport { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';\r\nimport app from './app';\r\n\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setHandler(new DefaultHandler())\r\n  // .setFramework(new ExpressFramework())\r\n  // .setResolver(new PromiseResolver())\r\n  .addAdapter(new SNSAdapter())\r\n  // customizing:\r\n  // .addAdapter(new SNSAdapter({ snsForwardMethod: '/prod/sns', snsForwardPath: 'PUT' }))\r\n  .build();\n"})}),"\n",(0,n.jsx)(s.admonition,{type:"caution",children:(0,n.jsxs)(s.p,{children:["When you configure your API with some ",(0,n.jsx)(s.code,{children:"basePath"})," like ",(0,n.jsx)(s.code,{children:"/prod"}),", you should set ",(0,n.jsx)(s.code,{children:"snsForwardPath"})," as ",(0,n.jsx)(s.code,{children:"/prod/sns"})," instead leave as default ",(0,n.jsx)(s.code,{children:"/sns"}),"."]})}),"\n",(0,n.jsx)(s.h2,{id:"security",children:"Security"}),"\n",(0,n.jsxs)(s.p,{children:["You ",(0,n.jsx)(s.strong,{children:"MUST"})," check if the header ",(0,n.jsx)(s.code,{children:"Host"})," contains the value of ",(0,n.jsx)(s.code,{children:"sns.amazonaws.com"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["Without checking this header, if you add this adapter and ",(0,n.jsx)(s.a,{href:"./api-gateway-v2",children:"AWS API Gateway V2"})," adapter, you will be vulnerable to attacks\r\nbecause anyone can create a ",(0,n.jsx)(s.code,{children:"POST"})," request to ",(0,n.jsx)(s.code,{children:"/sns"}),"."]}),"\n",(0,n.jsx)(s.h2,{id:"what-happens-when-my-response-status-is-different-from-2xx-or-3xx",children:"What happens when my response status is different from 2xx or 3xx?"}),"\n",(0,n.jsx)(s.p,{children:"Well, this library will throw an error.\r\nIn previous versions of this library, the behavior was different, but now we throw an error if the status does not indicate success."}),"\n",(0,n.jsx)(s.p,{children:"When it throws an error, the request will simply fail to process the event, and depending on how you set up your dead-letter queue or your retry police,\r\ncan be sent to dead-letter queue for you to check what happens or try again."})]})}function h(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,s,r)=>{r.d(s,{Z:()=>i,a:()=>o});var n=r(7294);const t={},a=n.createContext(t);function o(e){const s=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),n.createElement(a.Provider,{value:s},e.children)}}}]);