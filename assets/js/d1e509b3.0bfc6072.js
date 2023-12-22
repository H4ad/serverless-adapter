"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[559],{7548:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>h,contentTitle:()=>a,default:()=>o,frontMatter:()=>d,metadata:()=>i,toc:()=>c});var n=t(5893),s=t(1151);const d={},a=void 0,i={id:"api/Frameworks/TrpcFramework/TrpcAdapterBaseContext",title:"TrpcAdapterBaseContext",description:"@h4ad/serverless-adapter &gt; TrpcAdapterBaseContext",source:"@site/docs/api/Frameworks/TrpcFramework/TrpcAdapterBaseContext.md",sourceDirName:"api/Frameworks/TrpcFramework",slug:"/api/Frameworks/TrpcFramework/TrpcAdapterBaseContext",permalink:"/docs/api/Frameworks/TrpcFramework/TrpcAdapterBaseContext",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Frameworks/TrpcFramework/TrpcAdapterBaseContext.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"BufferToJSObjectTransformer",permalink:"/docs/api/Frameworks/TrpcFramework/BufferToJSObjectTransformer"},next:{title:"TrpcAdapterContext",permalink:"/docs/api/Frameworks/TrpcFramework/TrpcAdapterContext"}},h={},c=[{value:"(interface) TrpcAdapterBaseContext",id:"interface-trpcadapterbasecontext",level:2},{value:"(method) getHeader",id:"method-getheader",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) getHeaders",id:"method-getheaders",level:2},{value:"(method) getIp",id:"method-getip",level:2},{value:"(method) getMethod",id:"method-getmethod",level:2},{value:"(method) getUrl",id:"method-geturl",level:2},{value:"(method) removeHeader",id:"method-removeheader",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(property) request",id:"property-request",level:2},{value:"(property) response",id:"property-response",level:2},{value:"(method) setHeader",id:"method-setheader",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) setStatus",id:"method-setstatus",level:2},{value:"Parameters",id:"parameters-3",level:3}];function l(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,n.jsx)(r.a,{href:"/docs/api/Frameworks/TrpcFramework/TrpcAdapterBaseContext",children:"TrpcAdapterBaseContext"})]}),"\n",(0,n.jsx)(r.h2,{id:"interface-trpcadapterbasecontext",children:"(interface) TrpcAdapterBaseContext"}),"\n",(0,n.jsx)(r.p,{children:"The context created by this library that allows getting some information from the request and setting the status and header of the response."}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"export interface TrpcAdapterBaseContext \n"})}),"\n",(0,n.jsx)(r.h2,{id:"method-getheader",children:"(method) getHeader"}),"\n",(0,n.jsx)(r.p,{children:"The method to return the value of some header from the request"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"getHeader(name: string): string | undefined;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"name"}),(0,n.jsx)(r.td,{children:"string"}),(0,n.jsx)(r.td,{children:"The name of the header"})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"string | undefined"}),"\n",(0,n.jsx)(r.h2,{id:"method-getheaders",children:"(method) getHeaders"}),"\n",(0,n.jsx)(r.p,{children:"The method to return the request headers"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"getHeaders(): SingleValueHeaders;\n"})}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.a,{href:"/docs/api/Types/SingleValueHeaders",children:"SingleValueHeaders"})}),"\n",(0,n.jsx)(r.h2,{id:"method-getip",children:"(method) getIp"}),"\n",(0,n.jsx)(r.p,{children:"The method to return user's address"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"getIp(): string | undefined;\n"})}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"string | undefined"}),"\n",(0,n.jsx)(r.h2,{id:"method-getmethod",children:"(method) getMethod"}),"\n",(0,n.jsx)(r.p,{children:"The method to return the HTTP Method in the request"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"getMethod(): string | undefined;\n"})}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"string | undefined"}),"\n",(0,n.jsx)(r.h2,{id:"method-geturl",children:"(method) getUrl"}),"\n",(0,n.jsx)(r.p,{children:"The method to return the URL called"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"getUrl(): string | undefined;\n"})}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"string | undefined"}),"\n",(0,n.jsx)(r.h2,{id:"method-removeheader",children:"(method) removeHeader"}),"\n",(0,n.jsx)(r.p,{children:"The method to remove some header from the response"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"removeHeader(name: string): void;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"name"}),(0,n.jsx)(r.td,{children:"string"}),(0,n.jsx)(r.td,{children:"The name of the header"})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"void"}),"\n",(0,n.jsx)(r.h2,{id:"property-request",children:"(property) request"}),"\n",(0,n.jsx)(r.p,{children:"The request object that will be forward to your app"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"request: IncomingMessage;\n"})}),"\n",(0,n.jsx)(r.h2,{id:"property-response",children:"(property) response"}),"\n",(0,n.jsx)(r.p,{children:"The response object that will be forward to your app to output the response"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"response: ServerResponse;\n"})}),"\n",(0,n.jsx)(r.h2,{id:"method-setheader",children:"(method) setHeader"}),"\n",(0,n.jsx)(r.p,{children:"The method to set some header in the response"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"setHeader(name: string, value: number | string): void;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"name"}),(0,n.jsx)(r.td,{children:"string"}),(0,n.jsx)(r.td,{children:"The name of the header"})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"value"}),(0,n.jsx)(r.td,{children:"number | string"}),(0,n.jsx)(r.td,{children:"The value to be set in the header"})]})]})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"void"}),"\n",(0,n.jsx)(r.h2,{id:"method-setstatus",children:"(method) setStatus"}),"\n",(0,n.jsx)(r.p,{children:"The method to set response status."}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"setStatus(statusCode: number): void;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-3",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"statusCode"}),(0,n.jsx)(r.td,{children:"number"}),(0,n.jsx)(r.td,{children:"The response status that you want"})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"void"})]})}function o(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>i,a:()=>a});var n=t(7294);const s={},d=n.createContext(s);function a(e){const r=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(d.Provider,{value:r},e.children)}}}]);