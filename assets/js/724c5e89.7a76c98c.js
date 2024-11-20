"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[304],{94:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var n=s(4848),t=s(8453);const o={title:"Promise",position:1,description:"See more about the Promise Resolver."},a="Usage",i={id:"main/resolvers/promise",title:"Promise",description:"See more about the Promise Resolver.",source:"@site/docs/main/resolvers/promise.mdx",sourceDirName:"main/resolvers",slug:"/main/resolvers/promise",permalink:"/docs/main/resolvers/promise",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/resolvers/promise.mdx",tags:[],version:"current",frontMatter:{title:"Promise",position:1,description:"See more about the Promise Resolver."},sidebar:"main",previous:{title:"Callback",permalink:"/docs/main/resolvers/callback"},next:{title:"Frameworks",permalink:"/docs/category/frameworks"}},l={},d=[];function c(e){const r={a:"a",admonition:"admonition",code:"code",h1:"h1",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["Don't know what a resolver is? See the ",(0,n.jsx)(r.a,{href:"../architecture#resolver",children:"Architecture"})," section."]})}),"\n",(0,n.jsx)(r.p,{children:"The best and most agnostic resolver is using promise, generally every serverless environment supports asynchronous handlers."}),"\n",(0,n.jsxs)(r.p,{children:["When the handler is created with ",(0,n.jsx)(r.a,{href:"../../api/Contracts/HandlerContract#method-gethandler",children:"getHandler"}),", it will return an promise\r\nwhich is resolved when your framework send the response and the adapter transform the response in the way of your cloud can handle."]}),"\n",(0,n.jsx)(r.p,{children:"You can use this resolver with any cloud (except Huawei), with any framework or any adapter."}),"\n",(0,n.jsx)(r.admonition,{type:"caution",children:(0,n.jsxs)(r.p,{children:["Only Huawei doesn't support Promise, or it was buggy in my time, so I suggest you use ",(0,n.jsx)(r.a,{href:"./callback",children:"Callback Resolver"}),"."]})}),"\n",(0,n.jsx)(r.h1,{id:"usage",children:"Usage"}),"\n",(0,n.jsxs)(r.p,{children:["To use, you can import and call the method ",(0,n.jsx)(r.a,{href:"../../api/ServerlessAdapter#method-setresolver",children:"setResolver"}),", as per the code below:"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",metastring:'title="index.ts"',children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { PromiseResolver } from '@h4ad/serverless-adapter/resolvers/promise';\r\n\r\nconst express = require('express');\r\n\r\nconst app = express();\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setResolver(new PromiseResolver())\r\n  // continue to set the other options here.\r\n  //.setFramework(new ExpressFramework())\r\n  //.setHandler(new DefaultHandler())\r\n  //.addAdapter(new AlbAdapter())\r\n  //.addAdapter(new SQSAdapter())\r\n  //.addAdapter(new SNSAdapter())\r\n  // after put all methods necessary, just call the build method.\r\n  .build();\n"})}),"\n",(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["To know more about how AWS deals with async handlers, see ",(0,n.jsx)(r.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html",children:"NodeJS Handler"})," section."]})})]})}function p(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},8453:(e,r,s)=>{s.d(r,{R:()=>a,x:()=>i});var n=s(6540);const t={},o=n.createContext(t);function a(e){const r=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),n.createElement(o.Provider,{value:r},e.children)}}}]);