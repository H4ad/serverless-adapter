"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2694],{3199:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>d,metadata:()=>a,toc:()=>h});var s=t(5893),n=t(1151);const d={},i=void 0,a={id:"api/Adapters/Azure/HttpTriggerV4Adapter/HttpTriggerV4Adapter",title:"HttpTriggerV4Adapter",description:"@h4ad/serverless-adapter &gt; HttpTriggerV4Adapter",source:"@site/docs/api/Adapters/Azure/HttpTriggerV4Adapter/HttpTriggerV4Adapter.md",sourceDirName:"api/Adapters/Azure/HttpTriggerV4Adapter",slug:"/api/Adapters/Azure/HttpTriggerV4Adapter/",permalink:"/docs/api/Adapters/Azure/HttpTriggerV4Adapter/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/Azure/HttpTriggerV4Adapter/HttpTriggerV4Adapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"ApolloServerMutationAdapterOptions",permalink:"/docs/api/Adapters/Apollo Server/ApolloServerMutationAdapter/ApolloServerMutationAdapterOptions"},next:{title:"HttpTriggerV4AdapterOptions",permalink:"/docs/api/Adapters/Azure/HttpTriggerV4Adapter/HttpTriggerV4AdapterOptions"}},l={},h=[{value:"(class) HttpTriggerV4Adapter",id:"class-httptriggerv4adapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getAzureCookiesFromHeaders",id:"method-getazurecookiesfromheaders",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getPathFromEvent",id:"method-getpathfromevent",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-4",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"Parameters",id:"parameters-5",level:3},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-6",level:3},{value:"(property) options",id:"property-options",level:2},{value:"(method) parseCookie",id:"method-parsecookie",level:2},{value:"Parameters",id:"parameters-7",level:3}];function c(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,s.jsx)(r.a,{href:"/docs/api/Adapters/Azure/HttpTriggerV4Adapter",children:"HttpTriggerV4Adapter"})]}),"\n",(0,s.jsx)(r.h2,{id:"class-httptriggerv4adapter",children:"(class) HttpTriggerV4Adapter"}),"\n",(0,s.jsx)(r.p,{children:"The adapter to handle requests from Http Trigger on Azure Function V4."}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"export declare class HttpTriggerV4Adapter implements AdapterContract<HttpRequest, Context, HttpResponseSimple> \n"})}),"\n",(0,s.jsxs)(r.p,{children:["Implements: ",(0,s.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract",children:"AdapterContract"})," <HttpRequest, Context, HttpResponseSimple>"]}),"\n",(0,s.jsx)(r.h2,{id:"example",children:"Example"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"const stripBasePath = '/any/custom/base/path'; // default ''\r\nconst adapter = new HttpTriggerV4Adapter(\\{ stripBasePath });\n"})}),"\n",(0,s.jsx)(r.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,s.jsx)(r.p,{children:"Default constructor"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"constructor(options?: HttpTriggerV4AdapterOptions | undefined);\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"options"}),(0,s.jsxs)(r.td,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Adapters/Azure/HttpTriggerV4Adapter/HttpTriggerV4AdapterOptions",children:"HttpTriggerV4AdapterOptions"})," | undefined"]}),(0,s.jsxs)(r.td,{children:["(Optional) The options to customize the ",(0,s.jsx)(r.a,{href:"/docs/api/Adapters/Azure/HttpTriggerV4Adapter",children:"HttpTriggerV4Adapter"})]})]})})]}),"\n",(0,s.jsx)(r.h2,{id:"method-canhandle",children:"(method) canHandle"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"canHandle(event: unknown, context: unknown): boolean;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"event"}),(0,s.jsx)(r.td,{children:"unknown"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"context"}),(0,s.jsx)(r.td,{children:"unknown"}),(0,s.jsx)(r.td,{})]})]})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"boolean"}),"\n",(0,s.jsx)(r.h2,{id:"method-getadaptername",children:"(method) getAdapterName"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"getAdapterName(): string;\n"})}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"string"}),"\n",(0,s.jsx)(r.h2,{id:"method-getazurecookiesfromheaders",children:"(method) getAzureCookiesFromHeaders"}),"\n",(0,s.jsx)(r.p,{children:"Get the Azure Cookie list parsed from set-cookie header."}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected getAzureCookiesFromHeaders(headers: BothValueHeaders): Cookie[];\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"headers"}),(0,s.jsx)(r.td,{children:(0,s.jsx)(r.a,{href:"/docs/api/Types/BothValueHeaders",children:"BothValueHeaders"})}),(0,s.jsx)(r.td,{children:"The headers object"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Cookie[]"}),"\n",(0,s.jsx)(r.h2,{id:"method-getpathfromevent",children:"(method) getPathFromEvent"}),"\n",(0,s.jsx)(r.p,{children:"Get path from event with query strings"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected getPathFromEvent(event: HttpRequest): string;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"event"}),(0,s.jsx)(r.td,{children:"HttpRequest"}),(0,s.jsx)(r.td,{children:"The event sent by serverless"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"string"}),"\n",(0,s.jsx)(r.h2,{id:"method-getrequest",children:"(method) getRequest"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"getRequest(event: HttpRequest): AdapterRequest;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"event"}),(0,s.jsx)(r.td,{children:"HttpRequest"}),(0,s.jsx)(r.td,{})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract/AdapterRequest",children:"AdapterRequest"})}),"\n",(0,s.jsx)(r.h2,{id:"method-getresponse",children:"(method) getResponse"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"getResponse(\\{ body, statusCode, headers: originalHeaders, }: GetResponseAdapterProps<HttpRequest>): HttpResponseSimple;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"{ body, statusCode, headers: originalHeaders, }"}),(0,s.jsxs)(r.td,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract/GetResponseAdapterProps",children:"GetResponseAdapterProps"})," <HttpRequest>"]}),(0,s.jsx)(r.td,{})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"HttpResponseSimple"}),"\n",(0,s.jsx)(r.h2,{id:"method-onerrorwhileforwarding",children:"(method) onErrorWhileForwarding"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"onErrorWhileForwarding(\\{ error, respondWithErrors, event, delegatedResolver, log, }: OnErrorProps<HttpRequest, HttpResponseSimple>): void;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-6",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"{ error, respondWithErrors, event, delegatedResolver, log, }"}),(0,s.jsxs)(r.td,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract/OnErrorProps",children:"OnErrorProps"})," <HttpRequest, HttpResponseSimple>"]}),(0,s.jsx)(r.td,{})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"void"}),"\n",(0,s.jsx)(r.h2,{id:"property-options",children:"(property) options"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected readonly options?: HttpTriggerV4AdapterOptions | undefined;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"method-parsecookie",children:"(method) parseCookie"}),"\n",(0,s.jsxs)(r.p,{children:["Parse the string cookie to the Azure Cookie Object. This code was written by ",(0,s.jsx)(r.a,{href:"https://github.com/zachabney",children:"@zachabney"})," on ",(0,s.jsx)(r.a,{href:"https://github.com/zachabney/azure-aws-serverless-express/blob/241d2d5c4d5906e4817662cad6426ec2cbbf9ca7/src/index.js#L4-L49",children:"this library"})," ."]}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected parseCookie(cookie: string): Cookie;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-7",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"cookie"}),(0,s.jsx)(r.td,{children:"string"}),(0,s.jsx)(r.td,{children:"The cookie"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Cookie"})]})}function p(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>a,a:()=>i});var s=t(7294);const n={},d=s.createContext(n);function i(e){const r=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(d.Provider,{value:r},e.children)}}}]);