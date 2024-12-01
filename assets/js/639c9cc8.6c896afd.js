"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8399],{5024:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>d,default:()=>p,frontMatter:()=>c,metadata:()=>o,toc:()=>a});var n=t(4848),s=t(8453);const c={},d=void 0,o={id:"api/Frameworks/TrpcFramework/TrpcFramework",title:"TrpcFramework",description:"@h4ad/serverless-adapter &gt; TrpcFramework",source:"@site/docs/api/Frameworks/TrpcFramework/TrpcFramework.md",sourceDirName:"api/Frameworks/TrpcFramework",slug:"/api/Frameworks/TrpcFramework/",permalink:"/docs/api/Frameworks/TrpcFramework/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Frameworks/TrpcFramework/TrpcFramework.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"PolkaFramework",permalink:"/docs/api/Frameworks/PolkaFramework/"},next:{title:"BufferToJSObjectTransformer",permalink:"/docs/api/Frameworks/TrpcFramework/BufferToJSObjectTransformer"}},i={},a=[{value:"(class) TrpcFramework",id:"class-trpcframework",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) getSafeUrlForTrpc",id:"method-getsafeurlfortrpc",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"Example",id:"example",level:2},{value:"(method) mergeDefaultContextWithOptionsContext",id:"method-mergedefaultcontextwithoptionscontext",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(property) options",id:"property-options",level:2},{value:"(method) sendRequest",id:"method-sendrequest",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) wrapResolvedContextWithDefaultContext",id:"method-wrapresolvedcontextwithdefaultcontext",level:2},{value:"Parameters",id:"parameters-4",level:3}];function l(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/TrpcFramework",children:"TrpcFramework"})]}),"\n",(0,n.jsx)(r.h2,{id:"class-trpcframework",children:"(class) TrpcFramework"}),"\n",(0,n.jsx)(r.p,{children:"The framework that forwards requests to TRPC handler"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"export declare class TrpcFramework<TContext extends TrpcAdapterBaseContext, TRouter extends AnyRouter = AnyRouter> implements FrameworkContract<TRouter> \n"})}),"\n",(0,n.jsxs)(r.p,{children:["Implements: ",(0,n.jsx)(r.a,{href:"/docs/api/Contracts/FrameworkContract",children:"FrameworkContract"})," <TRouter>"]}),"\n",(0,n.jsx)(r.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,n.jsx)(r.p,{children:"Default constructor"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"constructor(options?: TrpcFrameworkOptions<TContext> | undefined);\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Parameter"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Type"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Description"})})]})}),(0,n.jsx)("tbody",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"options"})}),(0,n.jsx)("td",{children:(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/TrpcFramework/TrpcFrameworkOptions",children:"TrpcFrameworkOptions"})," <TContext> | undefined"]})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"(Optional)"})})]})})]}),"\n",(0,n.jsx)(r.h2,{id:"method-getsafeurlfortrpc",children:"(method) getSafeUrlForTrpc"}),"\n",(0,n.jsx)(r.p,{children:"Get safe url that can be used inside Trpc."}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"protected getSafeUrlForTrpc(request: IncomingMessage): string;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Parameter"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Type"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Description"})})]})}),(0,n.jsx)("tbody",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"request"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"IncomingMessage"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"The request object that will be forward to your app"})})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"string"}),"\n",(0,n.jsx)(r.h2,{id:"example",children:"Example"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"const url = getSafeUrlForTrpc('/users?input=hello');\r\nconsole.log(url); // users\n"})}),"\n",(0,n.jsx)(r.h2,{id:"method-mergedefaultcontextwithoptionscontext",children:"(method) mergeDefaultContextWithOptionsContext"}),"\n",(0,n.jsxs)(r.p,{children:["Merge the default context (",(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/TrpcFramework/TrpcAdapterContext",children:"TrpcAdapterContext"})," ) with the context created by the user."]}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"protected mergeDefaultContextWithOptionsContext(createContextOptions: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>): TContext | Promise<TContext>;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Parameter"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Type"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Description"})})]})}),(0,n.jsx)("tbody",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"createContextOptions"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"The options sent by trpc to create the context"})})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"TContext | Promise<TContext>"}),"\n",(0,n.jsx)(r.h2,{id:"property-options",children:"(property) options"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"protected readonly options?: TrpcFrameworkOptions<TContext> | undefined;\n"})}),"\n",(0,n.jsx)(r.h2,{id:"method-sendrequest",children:"(method) sendRequest"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"sendRequest<TRouter extends AnyRouter>(app: TRouter, request: IncomingMessage, response: ServerResponse): void;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-3",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Parameter"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Type"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Description"})})]})}),(0,n.jsxs)("tbody",{children:[(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"app"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"TRouter"})}),(0,n.jsx)("td",{})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"request"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"IncomingMessage"})}),(0,n.jsx)("td",{})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"response"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"ServerResponse"})}),(0,n.jsx)("td",{})]})]})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"void"}),"\n",(0,n.jsx)(r.h2,{id:"method-wrapresolvedcontextwithdefaultcontext",children:"(method) wrapResolvedContextWithDefaultContext"}),"\n",(0,n.jsxs)(r.p,{children:["Wraps the resolved context from the ",(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/TrpcFramework/TrpcFrameworkOptions",children:"TrpcFrameworkOptions"})," created with ",(0,n.jsx)(r.code,{children:"createContext"})," and merge with the ",(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/TrpcFramework/TrpcAdapterContext",children:"TrpcAdapterContext"})," generated by the library."]}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"protected wrapResolvedContextWithDefaultContext(resolvedContext: TContext, createContextOptions: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>): TContext;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-4",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Parameter"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Type"})}),(0,n.jsx)("th",{children:(0,n.jsx)(r.p,{children:"Description"})})]})}),(0,n.jsxs)("tbody",{children:[(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"resolvedContext"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"TContext"})}),(0,n.jsx)("td",{children:(0,n.jsxs)(r.p,{children:["The context created with ",(0,n.jsx)(r.code,{children:"createContext"})," inside ",(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/TrpcFramework/TrpcFrameworkOptions",children:"TrpcFrameworkOptions"})]})})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"createContextOptions"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>"})}),(0,n.jsx)("td",{children:(0,n.jsx)(r.p,{children:"The options sent by trpc to create the context"})})]})]})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"TContext"})]})}function p(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>d,x:()=>o});var n=t(6540);const s={},c=n.createContext(s);function d(e){const r=n.useContext(c);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),n.createElement(c.Provider,{value:r},e.children)}}}]);