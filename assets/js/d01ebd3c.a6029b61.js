"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7485],{9089:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>v,frontMatter:()=>t,metadata:()=>n,toc:()=>i});var l=r(4848),a=r(8453);const t={},o=void 0,n={id:"api/Resolvers/CallbackResolver/CallbackResolver",title:"CallbackResolver",description:"@h4ad/serverless-adapter &gt; CallbackResolver",source:"@site/docs/api/Resolvers/CallbackResolver/CallbackResolver.md",sourceDirName:"api/Resolvers/CallbackResolver",slug:"/api/Resolvers/CallbackResolver/",permalink:"/docs/api/Resolvers/CallbackResolver/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Resolvers/CallbackResolver/CallbackResolver.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"AwsContextResolver",permalink:"/docs/api/Resolvers/AwsContextResolver/"},next:{title:"ServerlessCallback",permalink:"/docs/api/Resolvers/CallbackResolver/ServerlessCallback"}},c={},i=[{value:"(class) CallbackResolver",id:"class-callbackresolver",level:2},{value:"Remarks",id:"remarks",level:2},{value:"(method) createResolver",id:"method-createresolver",level:2},{value:"Parameters",id:"parameters",level:3}];function d(e){const s={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,l.jsx)(s.a,{href:"/docs/api/Resolvers/CallbackResolver",children:"CallbackResolver"})]}),"\n",(0,l.jsx)(s.h2,{id:"class-callbackresolver",children:"(class) CallbackResolver"}),"\n",(0,l.jsx)(s.p,{children:"The class that implements the resolver using the callback function sent by serverless"}),"\n",(0,l.jsx)(s.p,{children:"Signature:"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-typescript",children:"export declare class CallbackResolver<TEvent, TContext, TResponse> implements ResolverContract<TEvent, TContext, ServerlessCallback<any>, TResponse, void> \n"})}),"\n",(0,l.jsxs)(s.p,{children:["Implements: ",(0,l.jsx)(s.a,{href:"/docs/api/Contracts/ResolverContract",children:"ResolverContract"})," <TEvent, TContext, ",(0,l.jsx)(s.a,{href:"/docs/api/Resolvers/CallbackResolver/ServerlessCallback",children:"ServerlessCallback"})," <any>, TResponse, void>"]}),"\n",(0,l.jsx)(s.h2,{id:"remarks",children:"Remarks"}),"\n",(0,l.jsxs)(s.p,{children:["To use this resolver on AWS, you MUST leave ",(0,l.jsx)(s.code,{children:"\\{@link https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html | callbackWaitsForEmptyEventLoop}"})," as true, otherwise, AWS will not wait for this resolver to resolve."]}),"\n",(0,l.jsx)(s.h2,{id:"method-createresolver",children:"(method) createResolver"}),"\n",(0,l.jsx)(s.p,{children:"Signature:"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-typescript",children:"createResolver(\\{ callback, event, log, respondWithErrors, adapter, }: ResolverProps<TEvent, TContext, ServerlessCallback<any>, TResponse>): Resolver<any, void>;\n"})}),"\n",(0,l.jsx)(s.h3,{id:"parameters",children:"Parameters"}),"\n",(0,l.jsxs)("table",{children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:(0,l.jsx)(s.p,{children:"Parameter"})}),(0,l.jsx)("th",{children:(0,l.jsx)(s.p,{children:"Type"})}),(0,l.jsx)("th",{children:(0,l.jsx)(s.p,{children:"Description"})})]})}),(0,l.jsx)("tbody",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:(0,l.jsx)(s.p,{children:"{ callback, event, log, respondWithErrors, adapter, }"})}),(0,l.jsx)("td",{children:(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.a,{href:"/docs/api/Contracts/ResolverContract/ResolverProps",children:"ResolverProps"})," <TEvent, TContext, ",(0,l.jsx)(s.a,{href:"/docs/api/Resolvers/CallbackResolver/ServerlessCallback",children:"ServerlessCallback"})," <any>, TResponse>"]})}),(0,l.jsx)("td",{})]})})]}),"\n",(0,l.jsx)(s.p,{children:"Returns:"}),"\n",(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.a,{href:"/docs/api/Contracts/ResolverContract/Resolver",children:"Resolver"})," <any, void>"]})]})}function v(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,l.jsx)(s,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},8453:(e,s,r)=>{r.d(s,{R:()=>o,x:()=>n});var l=r(6540);const a={},t=l.createContext(a);function o(e){const s=l.useContext(t);return l.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function n(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),l.createElement(t.Provider,{value:s},e.children)}}}]);