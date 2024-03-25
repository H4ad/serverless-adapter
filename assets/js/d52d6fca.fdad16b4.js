"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3309],{3342:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>s,metadata:()=>i,toc:()=>d});var n=r(5893),o=r(1151);const s={title:"Huawei",description:"See more about how to integrate with Huawei."},a=void 0,i={id:"main/handlers/huawei",title:"Huawei",description:"See more about how to integrate with Huawei.",source:"@site/docs/main/handlers/huawei.mdx",sourceDirName:"main/handlers",slug:"/main/handlers/huawei",permalink:"/docs/main/handlers/huawei",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/handlers/huawei.mdx",tags:[],version:"current",frontMatter:{title:"Huawei",description:"See more about how to integrate with Huawei."},sidebar:"main",previous:{title:"Google Cloud Functions",permalink:"/docs/main/handlers/gcp"},next:{title:"Resolvers",permalink:"/docs/category/resolvers"}},l={},d=[{value:"Http Function",id:"http-function",level:2},{value:"Event Function",id:"event-function",level:2},{value:"Examples",id:"examples",level:2},{value:"Sponsor",id:"sponsor",level:2}];function h(e){const t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",table:"table",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"In Huawei, we added support to FunctionGraphV2 with Http Function and Event Function."}),"\n",(0,n.jsx)(t.p,{children:"The difference between Http Function and Event Function is that in Http Function you must expose port 8000 and Huawei will proxy Api Gateway requests to your application.\r\nSo, on implementation, this library will create an http server to listen on port 8000 and forward the request to your framework."}),"\n",(0,n.jsxs)(t.p,{children:["In Event Function, you will receive the event from event source in the same way you receive in AWS, an object with some structure, you can see the supported event sources ",(0,n.jsx)(t.a,{href:"https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0102.html",children:"here"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"http-function",children:"Http Function"}),"\n",(0,n.jsx)(t.p,{children:"To integrate your app with Huawei FunctionGrapth with the Http Function type, you must do the following:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { ExpressFramework } from '@h4ad/serverless-adapter/frameworks/express';\r\nimport { HttpHuaweiHandler } from '@h4ad/serverless-adapter/handlers/huawei';\r\nimport { DummyResolver } from '@h4ad/serverless-adapter/resolvers/dummy';\r\nimport { DummyAdapter } from '@h4ad/serverless-adapter/adapters/dummy';\r\nimport app from './app';\r\n\r\n// instead exposing handler, you have the dispose function\r\n// this dispose function is never called\r\n// but you can to close the http server created with him\r\nconst dispose = ServerlessAdapter.new(app)\r\n    .setHandler(new HttpHuaweiHandler())\r\n    .setFramework(new ExpressFramework())\r\n    // dummy resolver and adapter is used because\r\n    // they are necessary in the core of the library to build\r\n    // but is optional to make huawei http function works.\r\n    .setResolver(new DummyResolver())\r\n    .addAdapter(new DummyAdapter())\r\n    .build();\n"})}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["You don't need to expose a variable called ",(0,n.jsx)(t.code,{children:"handler"})," when you choose Http Function, you just need to call build to the library create a http server."]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"By the way of Huawei architecture in Http Function, they have no use for Resolvers and Adapters, so you need to use the dummy versions because the library requires it."}),"\n",(0,n.jsxs)(t.admonition,{title:"ONE IMPORTANT THING",type:"info",children:[(0,n.jsxs)(t.p,{children:["You need to configure a file called ",(0,n.jsx)(t.code,{children:"bootstrap"})," in the root of folder that you upload to Huawei, is like the file ",(0,n.jsx)(t.code,{children:"Procfile"})," but for Huawei."]}),(0,n.jsx)(t.p,{children:"In my setup, I configure like:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"node /opt/function/code/index.js\n"})}),(0,n.jsxs)(t.p,{children:["The path ",(0,n.jsx)(t.code,{children:"/opt/function/code"})," is where your code is uploaded when you deploy something and ",(0,n.jsx)(t.code,{children:"index.js"})," is the file that contains the ",(0,n.jsx)(t.code,{children:"ServerlessAdapter"}),"."]}),(0,n.jsx)(t.p,{children:"In the end, the structure of the zip file you upload looks like this:"}),(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"bootstrap"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"index.js"})}),"\n"]})]}),"\n",(0,n.jsx)(t.h2,{id:"event-function",children:"Event Function"}),"\n",(0,n.jsxs)(t.p,{children:["With Http Function you need to use ",(0,n.jsx)(t.a,{href:"./huawei#http-function",children:"HttpHuaweiHandler"}),",\r\nbut with Event Function you should use ",(0,n.jsx)(t.a,{href:"./aws",children:"DefaultHandler"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"So, to add support to Api Gateway you do the following:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",metastring:'title="index.ts"',children:"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\r\nimport { HuaweiApiGatewayAdapter } from '@h4ad/serverless-adapter/adapters/huawei';\r\nimport { ExpressFramework } from '@h4ad/serverless-adapter/frameworks/express';\r\nimport { DefaultHandler } from '@h4ad/serverless-adapter/handlers/default';\r\nimport { CallbackResolver } from '@h4ad/serverless-adapter/resolvers/callback';\r\nimport app from './app';\r\n\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setFramework(new ExpressFramework())\r\n  .setHandler(new DefaultHandler())\r\n  .setResolver(new CallbackResolver())\r\n  .addAdapter(new HuaweiApiGatewayAdapter())\r\n  .build();\n"})}),"\n",(0,n.jsx)(t.admonition,{title:"One important thing",type:"caution",children:(0,n.jsx)(t.p,{children:"You must use the callback resolver because I couldn't get it to work with the PromiseResolver.\r\nMaybe it's a bug in the library or something specific in Huawei, if you have a hint please create an issue."})}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsxs)(t.p,{children:["You can see examples of how to use ",(0,n.jsx)(t.a,{href:"https://github.com/H4ad/serverless-adapter-examples",children:"here"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"sponsor",children:"Sponsor"}),"\n",(0,n.jsxs)(t.p,{children:["This handler was sponsored by ",(0,n.jsx)(t.a,{href:"https://liga.facens.br/",children:"Liga"}),", if you want to built an app, site or game (mobile, AR or VR), send an email to [",(0,n.jsx)(t.a,{href:"mailto:liga@facens.br",children:"liga@facens.br"}),"]."]}),"\n",(0,n.jsx)(t.table,{children:(0,n.jsx)(t.thead,{children:(0,n.jsx)(t.tr,{children:(0,n.jsx)(t.th,{children:(0,n.jsx)("a",{href:"https://liga.facens.br/",children:(0,n.jsx)("img",{height:"50",src:"https://mlogu6g7z5ex.i.optimole.com/yEwfkqo-4R0ttNtd/w:auto/h:auto/q:mauto/f:avif/http://liga.facens.br/wp-content/uploads/2020/03/logo-1.png",title:"The LIGA logo",width:"100"})})})})})})]})}function c(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},1151:(e,t,r)=>{r.d(t,{Z:()=>i,a:()=>a});var n=r(7294);const o={},s=n.createContext(o);function a(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);