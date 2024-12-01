"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4435],{750:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>d,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var t=s(4848),n=s(8453);const o={title:"Express (v4 and v5)",description:"See more about how to integrate with Express."},a=void 0,i={id:"main/frameworks/express",title:"Express (v4 and v5)",description:"See more about how to integrate with Express.",source:"@site/docs/main/frameworks/express.mdx",sourceDirName:"main/frameworks",slug:"/main/frameworks/express",permalink:"/docs/main/frameworks/express",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/frameworks/express.mdx",tags:[],version:"current",frontMatter:{title:"Express (v4 and v5)",description:"See more about how to integrate with Express."},sidebar:"main",previous:{title:"Deepkit",permalink:"/docs/main/frameworks/deepkit"},next:{title:"Fastify",permalink:"/docs/main/frameworks/fastify"}},d={},p=[];function c(e){const r={a:"a",admonition:"admonition",code:"code",p:"p",pre:"pre",...(0,n.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.p,{children:"First, you need to ensure you have the libs installed, so run this code:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"npm i --save express\r\nnpm i --save-dev @types/express\n"})}),"\n",(0,t.jsxs)(r.p,{children:["Then, you need you just need to use the ",(0,t.jsx)(r.a,{href:"../../api/Frameworks/ExpressFramework",children:"ExpressFramework"})," when you create your adapter, like:"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",metastring:'title="index.ts"',children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { ExpressFramework } from '@h4ad/serverless-adapter/frameworks/express';\r\n\r\nconst express = require('express');\r\n\r\nconst app = express();\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setFramework(new ExpressFramework())\r\n  // continue to set the other options here.\r\n  //.setHandler(new DefaultHandler())\r\n  //.setResolver(new PromiseResolver())\r\n  //.addAdapter(new AlbAdapter())\r\n  //.addAdapter(new SQSAdapter())\r\n  //.addAdapter(new SNSAdapter())\r\n  // after put all methods necessary, just call the build method.\r\n  .build();\n"})}),"\n",(0,t.jsx)(r.admonition,{type:"tip",children:(0,t.jsxs)(r.p,{children:["Is your application instance creation asynchronous? Look the ",(0,t.jsx)(r.a,{href:"./helpers/lazy",children:"LazyFramework"})," which helps you in asynchronous startup."]})}),"\n",(0,t.jsx)(r.admonition,{type:"tip",children:(0,t.jsxs)(r.p,{children:["Need to deal with CORS? See ",(0,t.jsx)(r.a,{href:"./helpers/cors",children:"CorsFramework"})," which helps you to add correct headers."]})})]})}function l(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,r,s)=>{s.d(r,{R:()=>a,x:()=>i});var t=s(6540);const n={},o=t.createContext(n);function a(e){const r=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),t.createElement(o.Provider,{value:r},e.children)}}}]);