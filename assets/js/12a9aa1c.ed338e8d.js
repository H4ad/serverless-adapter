"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7822],{104:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>o,frontMatter:()=>a,metadata:()=>d,toc:()=>p});var r=n(4848),s=n(8453);const a={},i=void 0,d={id:"api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapter",title:"HttpFunctionAdapter",description:"@h4ad/serverless-adapter &gt; HttpFunctionAdapter",source:"@site/docs/api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapter.md",sourceDirName:"api/Adapters/Digital Ocean/HttpFunctionAdapter",slug:"/api/Adapters/Digital Ocean/HttpFunctionAdapter/",permalink:"/docs/api/Adapters/Digital Ocean/HttpFunctionAdapter/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"HttpTriggerV4AdapterOptions",permalink:"/docs/api/Adapters/Azure/HttpTriggerV4Adapter/HttpTriggerV4AdapterOptions"},next:{title:"HttpFunctionAdapterOptions",permalink:"/docs/api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapterOptions"}},c={},p=[{value:"(class) HttpFunctionAdapter",id:"class-httpfunctionadapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getPathFromEvent",id:"method-getpathfromevent",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"Parameters",id:"parameters-4",level:3},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-5",level:3},{value:"(property) options",id:"property-options",level:2}];function l(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,r.jsx)(t.a,{href:"/docs/api/Adapters/Digital%20Ocean/HttpFunctionAdapter",children:"HttpFunctionAdapter"})]}),"\n",(0,r.jsx)(t.h2,{id:"class-httpfunctionadapter",children:"(class) HttpFunctionAdapter"}),"\n",(0,r.jsx)(t.p,{children:"The adapter to handle requests from Digital Ocean Functions when called from HTTP Endpoint."}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"export declare class HttpFunctionAdapter implements AdapterContract<DigitalOceanHttpEvent, void, DigitalOceanHttpResponse> \n"})}),"\n",(0,r.jsxs)(t.p,{children:["Implements: ",(0,r.jsx)(t.a,{href:"/docs/api/Contracts/AdapterContract",children:"AdapterContract"})," <DigitalOceanHttpEvent, void, DigitalOceanHttpResponse>"]}),"\n",(0,r.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"const stripBasePath = '/any/custom/base/path'; // default ''\r\nconst adapter = new HttpFunctionAdapter(\\{ stripBasePath });\n"})}),"\n",(0,r.jsx)(t.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,r.jsx)(t.p,{children:"Default constructor"}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"constructor(options?: HttpFunctionAdapterOptions | undefined);\n"})}),"\n",(0,r.jsx)(t.h3,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Parameter"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"options"}),(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.a,{href:"/docs/api/Adapters/Digital%20Ocean/HttpFunctionAdapter/HttpFunctionAdapterOptions",children:"HttpFunctionAdapterOptions"})," | undefined"]}),(0,r.jsxs)(t.td,{children:["(Optional) The options to customize the ",(0,r.jsx)(t.a,{href:"/docs/api/Adapters/Digital%20Ocean/HttpFunctionAdapter",children:"HttpFunctionAdapter"})]})]})})]}),"\n",(0,r.jsx)(t.h2,{id:"method-canhandle",children:"(method) canHandle"}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"canHandle(event: unknown): event is DigitalOceanHttpEvent;\n"})}),"\n",(0,r.jsx)(t.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Parameter"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"event"}),(0,r.jsx)(t.td,{children:"unknown"}),(0,r.jsx)(t.td,{})]})})]}),"\n",(0,r.jsx)(t.p,{children:"Returns:"}),"\n",(0,r.jsx)(t.p,{children:"event is DigitalOceanHttpEvent"}),"\n",(0,r.jsx)(t.h2,{id:"method-getadaptername",children:"(method) getAdapterName"}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"getAdapterName(): string;\n"})}),"\n",(0,r.jsx)(t.p,{children:"Returns:"}),"\n",(0,r.jsx)(t.p,{children:"string"}),"\n",(0,r.jsx)(t.h2,{id:"method-getpathfromevent",children:"(method) getPathFromEvent"}),"\n",(0,r.jsx)(t.p,{children:"Get path from event with query strings"}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"protected getPathFromEvent(event: DigitalOceanHttpEvent): string;\n"})}),"\n",(0,r.jsx)(t.h3,{id:"parameters-2",children:"Parameters"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Parameter"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"event"}),(0,r.jsx)(t.td,{children:"DigitalOceanHttpEvent"}),(0,r.jsx)(t.td,{children:"The event sent by digital ocean"})]})})]}),"\n",(0,r.jsx)(t.p,{children:"Returns:"}),"\n",(0,r.jsx)(t.p,{children:"string"}),"\n",(0,r.jsx)(t.h2,{id:"method-getrequest",children:"(method) getRequest"}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"getRequest(event: DigitalOceanHttpEvent): AdapterRequest;\n"})}),"\n",(0,r.jsx)(t.h3,{id:"parameters-3",children:"Parameters"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Parameter"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"event"}),(0,r.jsx)(t.td,{children:"DigitalOceanHttpEvent"}),(0,r.jsx)(t.td,{})]})})]}),"\n",(0,r.jsx)(t.p,{children:"Returns:"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"/docs/api/Contracts/AdapterContract/AdapterRequest",children:"AdapterRequest"})}),"\n",(0,r.jsx)(t.h2,{id:"method-getresponse",children:"(method) getResponse"}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"getResponse(\\{ headers: responseHeaders, body, statusCode, }: GetResponseAdapterProps<DigitalOceanHttpEvent>): DigitalOceanHttpResponse;\n"})}),"\n",(0,r.jsx)(t.h3,{id:"parameters-4",children:"Parameters"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Parameter"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"{ headers: responseHeaders, body, statusCode, }"}),(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.a,{href:"/docs/api/Contracts/AdapterContract/GetResponseAdapterProps",children:"GetResponseAdapterProps"})," <DigitalOceanHttpEvent>"]}),(0,r.jsx)(t.td,{})]})})]}),"\n",(0,r.jsx)(t.p,{children:"Returns:"}),"\n",(0,r.jsx)(t.p,{children:"DigitalOceanHttpResponse"}),"\n",(0,r.jsx)(t.h2,{id:"method-onerrorwhileforwarding",children:"(method) onErrorWhileForwarding"}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"onErrorWhileForwarding(\\{ error, delegatedResolver, respondWithErrors, event, log, }: OnErrorProps<DigitalOceanHttpEvent, DigitalOceanHttpResponse>): void;\n"})}),"\n",(0,r.jsx)(t.h3,{id:"parameters-5",children:"Parameters"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Parameter"}),(0,r.jsx)(t.th,{children:"Type"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"{ error, delegatedResolver, respondWithErrors, event, log, }"}),(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.a,{href:"/docs/api/Contracts/AdapterContract/OnErrorProps",children:"OnErrorProps"})," <DigitalOceanHttpEvent, DigitalOceanHttpResponse>"]}),(0,r.jsx)(t.td,{})]})})]}),"\n",(0,r.jsx)(t.p,{children:"Returns:"}),"\n",(0,r.jsx)(t.p,{children:"void"}),"\n",(0,r.jsx)(t.h2,{id:"property-options",children:"(property) options"}),"\n",(0,r.jsx)(t.p,{children:"Signature:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"protected readonly options?: HttpFunctionAdapterOptions | undefined;\n"})})]})}function o(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>d});var r=n(6540);const s={},a=r.createContext(s);function i(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);