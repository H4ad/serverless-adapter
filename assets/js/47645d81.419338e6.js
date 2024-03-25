"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8290],{8497:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>p,frontMatter:()=>d,metadata:()=>l,toc:()=>c});var n=t(5893),s=t(1151);const d={},a=void 0,l={id:"api/Adapters/AWS/AlbAdapter/AlbAdapter",title:"AlbAdapter",description:"@h4ad/serverless-adapter &gt; AlbAdapter",source:"@site/docs/api/Adapters/AWS/AlbAdapter/AlbAdapter.md",sourceDirName:"api/Adapters/AWS/AlbAdapter",slug:"/api/Adapters/AWS/AlbAdapter/",permalink:"/docs/api/Adapters/AWS/AlbAdapter/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/AlbAdapter/AlbAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"BatchItemFailureResponse",permalink:"/docs/api/Adapters/AWS/AWS Simple Adapter/BatchItemFailureResponse"},next:{title:"AlbAdapterOptions",permalink:"/docs/api/Adapters/AWS/AlbAdapter/AlbAdapterOptions"}},i={},c=[{value:"(class) AlbAdapter",id:"class-albadapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getPathFromEvent",id:"method-getpathfromevent",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"Parameters",id:"parameters-4",level:3},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-5",level:3},{value:"(property) options",id:"property-options",level:2},{value:"(property) stripPathFn",id:"property-strippathfn",level:2}];function h(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,n.jsx)(r.a,{href:"/docs/api/Adapters/AWS/AlbAdapter",children:"AlbAdapter"})]}),"\n",(0,n.jsx)(r.h2,{id:"class-albadapter",children:"(class) AlbAdapter"}),"\n",(0,n.jsx)(r.p,{children:"The adapter to handle requests from AWS ALB"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"export declare class AlbAdapter implements AdapterContract<ALBEvent, Context, ALBResult> \n"})}),"\n",(0,n.jsxs)(r.p,{children:["Implements: ",(0,n.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract",children:"AdapterContract"})," <ALBEvent, Context, ALBResult>"]}),"\n",(0,n.jsx)(r.h2,{id:"example",children:"Example"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"const stripBasePath = '/any/custom/base/path'; // default ''\r\nconst adapter = new AlbAdapter(\\{ stripBasePath });\n"})}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/services-alb.html",children:"Event Reference"})}),"\n",(0,n.jsx)(r.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,n.jsx)(r.p,{children:"Default constructor"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"constructor(options?: AlbAdapterOptions | undefined);\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"options"}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.a,{href:"/docs/api/Adapters/AWS/AlbAdapter/AlbAdapterOptions",children:"AlbAdapterOptions"})," | undefined"]}),(0,n.jsxs)(r.td,{children:["(Optional) The options to customize the ",(0,n.jsx)(r.a,{href:"/docs/api/Adapters/AWS/AlbAdapter",children:"AlbAdapter"})]})]})})]}),"\n",(0,n.jsx)(r.h2,{id:"method-canhandle",children:"(method) canHandle"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"canHandle(event: unknown): event is ALBEvent;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"event"}),(0,n.jsx)(r.td,{children:"unknown"}),(0,n.jsx)(r.td,{})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"event is ALBEvent"}),"\n",(0,n.jsx)(r.h2,{id:"method-getadaptername",children:"(method) getAdapterName"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"getAdapterName(): string;\n"})}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"string"}),"\n",(0,n.jsx)(r.h2,{id:"method-getpathfromevent",children:"(method) getPathFromEvent"}),"\n",(0,n.jsx)(r.p,{children:"Get path from event with query strings"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"protected getPathFromEvent(event: ALBEvent): string;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-2",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"event"}),(0,n.jsx)(r.td,{children:"ALBEvent"}),(0,n.jsx)(r.td,{children:"The event sent by serverless"})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"string"}),"\n",(0,n.jsx)(r.h2,{id:"method-getrequest",children:"(method) getRequest"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"getRequest(event: ALBEvent): AdapterRequest;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-3",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"event"}),(0,n.jsx)(r.td,{children:"ALBEvent"}),(0,n.jsx)(r.td,{})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract/AdapterRequest",children:"AdapterRequest"})}),"\n",(0,n.jsx)(r.h2,{id:"method-getresponse",children:"(method) getResponse"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"getResponse(\\{ event, headers: responseHeaders, body, isBase64Encoded, statusCode, }: GetResponseAdapterProps<ALBEvent>): ALBResult;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-4",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"{ event, headers: responseHeaders, body, isBase64Encoded, statusCode, }"}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract/GetResponseAdapterProps",children:"GetResponseAdapterProps"})," <ALBEvent>"]}),(0,n.jsx)(r.td,{})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"ALBResult"}),"\n",(0,n.jsx)(r.h2,{id:"method-onerrorwhileforwarding",children:"(method) onErrorWhileForwarding"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"onErrorWhileForwarding(\\{ error, delegatedResolver, respondWithErrors, event, log, }: OnErrorProps<ALBEvent, ALBResult>): void;\n"})}),"\n",(0,n.jsx)(r.h3,{id:"parameters-5",children:"Parameters"}),"\n",(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:"Parameter"}),(0,n.jsx)(r.th,{children:"Type"}),(0,n.jsx)(r.th,{children:"Description"})]})}),(0,n.jsx)(r.tbody,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:"{ error, delegatedResolver, respondWithErrors, event, log, }"}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract/OnErrorProps",children:"OnErrorProps"})," <ALBEvent, ALBResult>"]}),(0,n.jsx)(r.td,{})]})})]}),"\n",(0,n.jsx)(r.p,{children:"Returns:"}),"\n",(0,n.jsx)(r.p,{children:"void"}),"\n",(0,n.jsx)(r.h2,{id:"property-options",children:"(property) options"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"protected readonly options?: AlbAdapterOptions | undefined;\n"})}),"\n",(0,n.jsx)(r.h2,{id:"property-strippathfn",children:"(property) stripPathFn"}),"\n",(0,n.jsx)(r.p,{children:"Strip base path function"}),"\n",(0,n.jsx)(r.p,{children:"Signature:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",children:"protected stripPathFn: StripBasePathFn;\n"})})]})}function p(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>l,a:()=>a});var n=t(7294);const s={},d=n.createContext(s);function a(e){const r=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(d.Provider,{value:r},e.children)}}}]);