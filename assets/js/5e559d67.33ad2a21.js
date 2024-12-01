"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9817],{330:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>p,frontMatter:()=>t,metadata:()=>l,toc:()=>c});var s=n(4848),d=n(8453);const t={},a=void 0,l={id:"api/Handlers/GCPHandler/GCPHandler",title:"GCPHandler",description:"@h4ad/serverless-adapter &gt; GCPHandler",source:"@site/docs/api/Handlers/GCPHandler/GCPHandler.md",sourceDirName:"api/Handlers/GCPHandler",slug:"/api/Handlers/GCPHandler/",permalink:"/docs/api/Handlers/GCPHandler/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Handlers/GCPHandler/GCPHandler.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"DigitalOceanHandler",permalink:"/docs/api/Handlers/DigitalOceanHandler/"},next:{title:"HttpFirebaseHandler",permalink:"/docs/api/Handlers/HttpFirebaseHandler/"}},i={},c=[{value:"(class) GCPHandler",id:"class-gcphandler",level:2},{value:"Remarks",id:"remarks",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) getHandler",id:"method-gethandler",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(property) name",id:"property-name",level:2}];function o(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,d.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,s.jsx)(r.a,{href:"/docs/api/Handlers/GCPHandler",children:"GCPHandler"})]}),"\n",(0,s.jsx)(r.h2,{id:"class-gcphandler",children:"(class) GCPHandler"}),"\n",(0,s.jsx)(r.p,{children:"The class that implements a handler for GCP Http Functions"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"export declare class GCPHandler<TApp> extends RawRequest<TApp> implements HandlerContract<TApp, never, never, never, void, void | Promise<void>> \n"})}),"\n",(0,s.jsxs)(r.p,{children:["Extends: ",(0,s.jsx)(r.a,{href:"/docs/api/Handlers/Base/RawRequest",children:"RawRequest"})," <TApp>"]}),"\n",(0,s.jsxs)(r.p,{children:["Implements: ",(0,s.jsx)(r.a,{href:"/docs/api/Contracts/HandlerContract",children:"HandlerContract"})," <TApp, never, never, never, void, void | Promise<void>>"]}),"\n",(0,s.jsx)(r.h2,{id:"remarks",children:"Remarks"}),"\n",(0,s.jsxs)(r.p,{children:["Read more about Http Cloud Function ",(0,s.jsx)(r.a,{href:"https://cloud.google.com/functions/docs/create-deploy-http-nodejs",children:"here"})]}),"\n",(0,s.jsx)(r.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,s.jsx)(r.p,{children:"Default Constructor"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"constructor(name: string);\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:(0,s.jsx)(r.p,{children:"Parameter"})}),(0,s.jsx)("th",{children:(0,s.jsx)(r.p,{children:"Type"})}),(0,s.jsx)("th",{children:(0,s.jsx)(r.p,{children:"Description"})})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"name"})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"string"})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"The name of this function, should be the during deploy."})})]})})]}),"\n",(0,s.jsx)(r.h2,{id:"method-gethandler",children:"(method) getHandler"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"getHandler(app: TApp, framework: FrameworkContract<TApp>): (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:(0,s.jsx)(r.p,{children:"Parameter"})}),(0,s.jsx)("th",{children:(0,s.jsx)(r.p,{children:"Type"})}),(0,s.jsx)("th",{children:(0,s.jsx)(r.p,{children:"Description"})})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"app"})}),(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"TApp"})}),(0,s.jsx)("td",{})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(r.p,{children:"framework"})}),(0,s.jsx)("td",{children:(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Contracts/FrameworkContract",children:"FrameworkContract"})," <TApp>"]})}),(0,s.jsx)("td",{})]})]})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"(req: IncomingMessage, res: ServerResponse) => void | Promise<void>"}),"\n",(0,s.jsx)(r.h2,{id:"property-name",children:"(property) name"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected readonly name: string;\n"})})]})}function p(e={}){const{wrapper:r}={...(0,d.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>a,x:()=>l});var s=n(6540);const d={},t=s.createContext(d);function a(e){const r=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:a(e.components),s.createElement(t.Provider,{value:r},e.children)}}}]);