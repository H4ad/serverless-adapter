"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7380],{6842:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>d,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=t(5893),s=t(1151);const a={title:"Fastify",description:"See more about how to integrate with Fastify."},o=void 0,i={id:"main/frameworks/fastify",title:"Fastify",description:"See more about how to integrate with Fastify.",source:"@site/docs/main/frameworks/fastify.mdx",sourceDirName:"main/frameworks",slug:"/main/frameworks/fastify",permalink:"/docs/main/frameworks/fastify",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/frameworks/fastify.mdx",tags:[],version:"current",frontMatter:{title:"Fastify",description:"See more about how to integrate with Fastify."},sidebar:"main",previous:{title:"Express",permalink:"/docs/main/frameworks/express"},next:{title:"Hapi",permalink:"/docs/main/frameworks/hapi"}},d={},c=[];function l(e){const r={a:"a",admonition:"admonition",code:"code",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:"First, you need to ensure you have the libs installed, so run this code:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-bash",children:"npm i --save fastify\n"})}),"\n",(0,n.jsxs)(r.p,{children:["Then, you need you just need to use the ",(0,n.jsx)(r.a,{href:"../../api/Frameworks/FastifyFramework",children:"FastifyFramework"})," when you create your adapter, like:"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",metastring:'title="index.ts"',children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';\r\n\r\nconst Fastify = require('fastify');\r\n\r\nconst app = Fastify({ logger: true });\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setFramework(new FastifyFramework())\r\n  // continue to set the other options here.\r\n  //.setHandler(new DefaultHandler())\r\n  //.setResolver(new PromiseResolver())\r\n  //.addAdapter(new AlbAdapter())\r\n  //.addAdapter(new SQSAdapter())\r\n  //.addAdapter(new SNSAdapter())\r\n  // after put all methods necessary, just call the build method.\r\n  .build();\n"})}),"\n",(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["Is your application instance creation asynchronous? Look the ",(0,n.jsx)(r.a,{href:"./helpers/lazy",children:"LazyFramework"})," which helps you in asynchronous startup."]})}),"\n",(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["Need to deal with CORS? See ",(0,n.jsx)(r.a,{href:"./helpers/cors",children:"CorsFramework"})," which helps you to add correct headers."]})})]})}function p(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>i,a:()=>o});var n=t(7294);const s={},a=n.createContext(s);function o(e){const r=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(a.Provider,{value:r},e.children)}}}]);