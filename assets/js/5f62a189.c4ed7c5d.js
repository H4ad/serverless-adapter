"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4153],{18:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>r,default:()=>l,frontMatter:()=>d,metadata:()=>o,toc:()=>c});var s=a(4848),n=a(8453);const d={title:"Lambda@Edge",description:"See more about how to integrate with AWS Lambda@Edge."},r=void 0,o={id:"main/adapters/aws/lambda-edge",title:"Lambda@Edge",description:"See more about how to integrate with AWS Lambda@Edge.",source:"@site/docs/main/adapters/aws/lambda-edge.mdx",sourceDirName:"main/adapters/aws",slug:"/main/adapters/aws/lambda-edge",permalink:"/docs/main/adapters/aws/lambda-edge",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/adapters/aws/lambda-edge.mdx",tags:[],version:"current",frontMatter:{title:"Lambda@Edge",description:"See more about how to integrate with AWS Lambda@Edge."},sidebar:"main",previous:{title:"Function URLs",permalink:"/docs/main/adapters/aws/function-url"},next:{title:"S3",permalink:"/docs/main/adapters/aws/s3"}},i={},c=[{value:"RequestLambdaEdgeAdapter",id:"requestlambdaedgeadapter",level:2},{value:"Customizing",id:"customizing",level:3},{value:"How to use",id:"how-to-use",level:3},{value:"Caution with limits",id:"caution-with-limits",level:3},{value:"<code>viewer request</code> or <code>source request</code>?",id:"viewer-request-or-source-request",level:3},{value:"Cache",id:"cache",level:3},{value:"LambdaEdgeAdapter",id:"lambdaedgeadapter",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["The adapter to handle requests from ",(0,s.jsx)(t.a,{href:"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html",children:"AWS Lambda@Edge"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"We have two implementations that works with Lambda@Edge:"}),"\n",(0,s.jsx)(t.h2,{id:"requestlambdaedgeadapter",children:"RequestLambdaEdgeAdapter"}),"\n",(0,s.jsxs)(t.p,{children:["This is the most useful implementation as it allows you to return a response during ",(0,s.jsx)(t.code,{children:"viewer-request"})," and ",(0,s.jsx)(t.code,{children:"origin-request"})," events.\r\nAlso, this means that you cannot use this adapter to handle ",(0,s.jsx)(t.code,{children:"viewer-response"})," and ",(0,s.jsx)(t.code,{children:"origin-response"})," events."]}),"\n",(0,s.jsxs)(t.p,{children:["In short, it works like when you deploy your code using Vercel and you have an ",(0,s.jsx)(t.code,{children:"api"})," folder, but instead of being deployed to Vercel, it is deployed to Lambda@Edge."]}),"\n",(0,s.jsx)(t.h3,{id:"customizing",children:"Customizing"}),"\n",(0,s.jsxs)(t.p,{children:["You can remove the base path with the ",(0,s.jsx)(t.code,{children:"stripBasePath"})," option inside ",(0,s.jsx)(t.a,{href:"/docs/api/Adapters/AWS/RequestLambdaEdgeAdapter/RequestLambdaEdgeAdapterOptions",children:"RequestLambdaEdgeAdapterOptions"}),"."]}),"\n",(0,s.jsx)(t.admonition,{type:"caution",children:(0,s.jsxs)(t.p,{children:["When configuring your API with some ",(0,s.jsx)(t.code,{children:"basePath"})," such as ",(0,s.jsx)(t.code,{children:"/api"}),", you must send the request on path ",(0,s.jsx)(t.code,{children:"/api/my/path"})," or set ",(0,s.jsx)(t.code,{children:"stripBasePath"})," to ",(0,s.jsx)(t.code,{children:"/api"}),"."]})}),"\n",(0,s.jsx)(t.h3,{id:"how-to-use",children:"How to use"}),"\n",(0,s.jsx)(t.p,{children:"To add support to AWS Lambda@Edge you do the following:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",metastring:'title="index.ts"',children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { RequestLambdaEdgeAdapter } from '@h4ad/serverless-adapter/adapters/aws';\r\nimport { DefaultHandler } from '@h4ad/serverless-adapter/handlers/default';\r\nimport app from './app';\r\n\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setHandler(new DefaultHandler())\r\n  // .setFramework(new ExpressFramework())\r\n  // .setResolver(new PromiseResolver())\r\n  .addAdapter(new RequestLambdaEdgeAdapter())\r\n  // customizing:\r\n  // .addAdapter(new RequestLambdaEdgeAdapter({ stripBasePath: '/api' }))\r\n  .build();\n"})}),"\n",(0,s.jsx)(t.h3,{id:"caution-with-limits",children:"Caution with limits"}),"\n",(0,s.jsxs)(t.p,{children:["AWS Lambda@Edge has some limits, and one of them is response size, which is 1MB for ",(0,s.jsx)(t.code,{children:"origin-request"})," and 40KB for ",(0,s.jsx)(t.code,{children:"viewer-request"}),", ",(0,s.jsx)(t.a,{href:"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html",children:"see more here"}),"."]}),"\n",(0,s.jsxs)(t.h3,{id:"viewer-request-or-source-request",children:[(0,s.jsx)(t.code,{children:"viewer request"})," or ",(0,s.jsx)(t.code,{children:"source request"}),"?"]}),"\n",(0,s.jsxs)(t.p,{children:["I personally prefer using ",(0,s.jsx)(t.code,{children:"origin-request"})," because it can return a larger response, plus you can configure the cache behavior to cache the response, which is not possible with ",(0,s.jsx)(t.code,{children:"viewer-request"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"cache",children:"Cache"}),"\n",(0,s.jsxs)(t.p,{children:["As I mentioned above, you can cache the response when using ",(0,s.jsx)(t.code,{children:"origin-request"}),", the only problem if you set the default cache option it will cache everything!"]}),"\n",(0,s.jsxs)(t.p,{children:["You can control the cache timing by setting the ",(0,s.jsx)(t.code,{children:"cache-control"})," header, but for ",(0,s.jsx)(t.code,{children:"GET"})," and ",(0,s.jsx)(t.code,{children:"HEAD"})," requests, even with ",(0,s.jsx)(t.code,{children:"no-store"})," or ",(0,s.jsx)(t.code,{children:"no-cache"})," set in ",(0,s.jsx)(t.code,{children:"cache-control"}),", if you send the request fast enough it will return the value from the cache."]}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"POST"}),", ",(0,s.jsx)(t.code,{children:"DELETE"}),", etc... methods are not cached, so don't worry about them."]}),"\n",(0,s.jsxs)(t.p,{children:["In resume, you can cache the response, but you need to know what you want to do and also understand how to set the cache switch correctly, so ",(0,s.jsx)(t.a,{href:"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ConfiguringCaching.html",children:"read the docs"}),"."]}),"\n",(0,s.jsx)(t.h2,{id:"lambdaedgeadapter",children:"LambdaEdgeAdapter"}),"\n",(0,s.jsx)(t.p,{children:"Honestly, I added this adapter because @vendia/serverless-adapter had already added support for Lambda Edge, but reading my implementation and @vendia's implementation, I never knew if it actually worked because I didn't test it on AWS."}),"\n",(0,s.jsx)(t.p,{children:"So at the moment I'm not going to create any documentation and feel free to test this adapter and see how it behaves."}),"\n",(0,s.jsxs)(t.p,{children:["You can read the ",(0,s.jsx)(t.a,{href:"https://github.com/H4ad/serverless-adapter/blob/main/src/adapters/aws/lambda-edge.adapter.ts",children:"source code here"})," to see how the request and response are being assembled, as well as take a look at ",(0,s.jsx)(t.a,{href:"/docs/api/Adapters/AWS/LambdaEdgeAdapter/LambdaEdgeAdapterOptions",children:"LambdaEdgeAdapterOptions"})," to see what options you can pass."]}),"\n",(0,s.jsx)(t.p,{children:"Despite being lazy to create Lambda Edge documentation, in the code I tried to add as many comments as possible to explain each option."})]})}function l(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>o});var s=a(6540);const n={},d=s.createContext(n);function r(e){const t=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),s.createElement(d.Provider,{value:t},e.children)}}}]);