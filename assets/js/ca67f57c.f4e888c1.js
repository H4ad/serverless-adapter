"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2138],{7371:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>o,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var a=r(5893),n=r(1151);const s={},d=void 0,i={id:"api/Adapters/AWS/ApiGatewayV2Adapter/ApiGatewayV2Adapter",title:"ApiGatewayV2Adapter",description:"@h4ad/serverless-adapter &gt; ApiGatewayV2Adapter",source:"@site/docs/api/Adapters/AWS/ApiGatewayV2Adapter/ApiGatewayV2Adapter.md",sourceDirName:"api/Adapters/AWS/ApiGatewayV2Adapter",slug:"/api/Adapters/AWS/ApiGatewayV2Adapter/",permalink:"/docs/api/Adapters/AWS/ApiGatewayV2Adapter/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/ApiGatewayV2Adapter/ApiGatewayV2Adapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"ApiGatewayV1Options",permalink:"/docs/api/Adapters/AWS/ApiGatewayV1Adapter/ApiGatewayV1Options"},next:{title:"ApiGatewayV2Options",permalink:"/docs/api/Adapters/AWS/ApiGatewayV2Adapter/ApiGatewayV2Options"}},p={},c=[{value:"(class) ApiGatewayV2Adapter",id:"class-apigatewayv2adapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getPathFromEvent",id:"method-getpathfromevent",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"Parameters",id:"parameters-4",level:3},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-5",level:3},{value:"(property) options",id:"property-options",level:2},{value:"(property) stripPathFn",id:"property-strippathfn",level:2}];function l(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,a.jsx)(t.a,{href:"/docs/api/Adapters/AWS/ApiGatewayV2Adapter",children:"ApiGatewayV2Adapter"})]}),"\n",(0,a.jsx)(t.h2,{id:"class-apigatewayv2adapter",children:"(class) ApiGatewayV2Adapter"}),"\n",(0,a.jsx)(t.p,{children:"The adapter to handle requests from AWS Api Gateway V2"}),"\n",(0,a.jsxs)(t.p,{children:["As per ",(0,a.jsx)(t.a,{href:"https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html",children:"know issues"})," , we throw an exception when you send the ",(0,a.jsx)(t.code,{children:"transfer-encoding=chunked"})," . But, if you use this adapter to accept requests from Function URL, you can accept the ",(0,a.jsx)(t.code,{children:"transfer-encoding=chunked"})," changing the method of invocation from ",(0,a.jsx)(t.code,{children:"BUFFERED"})," to ",(0,a.jsx)(t.code,{children:"RESPONSE_STREAM"})," ."]}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"export declare class ApiGatewayV2Adapter implements AdapterContract<APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2> \n"})}),"\n",(0,a.jsxs)(t.p,{children:["Implements: ",(0,a.jsx)(t.a,{href:"/docs/api/Contracts/AdapterContract",children:"AdapterContract"})," <APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2>"]}),"\n",(0,a.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"const stripBasePath = '/any/custom/base/path'; // default ''\r\nconst adapter = new ApiGatewayV2Adapter(\\{ stripBasePath });\n"})}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.a,{href:"https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html",children:"Event Reference"})}),"\n",(0,a.jsx)(t.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,a.jsx)(t.p,{children:"Default constructor"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"constructor(options?: ApiGatewayV2Options | undefined);\n"})}),"\n",(0,a.jsx)(t.h3,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Parameter"}),(0,a.jsx)(t.th,{children:"Type"}),(0,a.jsx)(t.th,{children:"Description"})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"options"}),(0,a.jsxs)(t.td,{children:[(0,a.jsx)(t.a,{href:"/docs/api/Adapters/AWS/ApiGatewayV2Adapter/ApiGatewayV2Options",children:"ApiGatewayV2Options"})," | undefined"]}),(0,a.jsxs)(t.td,{children:["(Optional) The options to customize the ",(0,a.jsx)(t.a,{href:"/docs/api/Adapters/AWS/ApiGatewayV2Adapter",children:"ApiGatewayV2Adapter"})]})]})})]}),"\n",(0,a.jsx)(t.h2,{id:"method-canhandle",children:"(method) canHandle"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"canHandle(event: unknown): event is APIGatewayProxyEventV2;\n"})}),"\n",(0,a.jsx)(t.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Parameter"}),(0,a.jsx)(t.th,{children:"Type"}),(0,a.jsx)(t.th,{children:"Description"})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"event"}),(0,a.jsx)(t.td,{children:"unknown"}),(0,a.jsx)(t.td,{})]})})]}),"\n",(0,a.jsx)(t.p,{children:"Returns:"}),"\n",(0,a.jsx)(t.p,{children:"event is APIGatewayProxyEventV2"}),"\n",(0,a.jsx)(t.h2,{id:"method-getadaptername",children:"(method) getAdapterName"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"getAdapterName(): string;\n"})}),"\n",(0,a.jsx)(t.p,{children:"Returns:"}),"\n",(0,a.jsx)(t.p,{children:"string"}),"\n",(0,a.jsx)(t.h2,{id:"method-getpathfromevent",children:"(method) getPathFromEvent"}),"\n",(0,a.jsx)(t.p,{children:"Get path from event with query strings"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"protected getPathFromEvent(event: APIGatewayProxyEventV2): string;\n"})}),"\n",(0,a.jsx)(t.h3,{id:"parameters-2",children:"Parameters"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Parameter"}),(0,a.jsx)(t.th,{children:"Type"}),(0,a.jsx)(t.th,{children:"Description"})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"event"}),(0,a.jsx)(t.td,{children:"APIGatewayProxyEventV2"}),(0,a.jsx)(t.td,{children:"The event sent by serverless"})]})})]}),"\n",(0,a.jsx)(t.p,{children:"Returns:"}),"\n",(0,a.jsx)(t.p,{children:"string"}),"\n",(0,a.jsx)(t.h2,{id:"method-getrequest",children:"(method) getRequest"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"getRequest(event: APIGatewayProxyEventV2): AdapterRequest;\n"})}),"\n",(0,a.jsx)(t.h3,{id:"parameters-3",children:"Parameters"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Parameter"}),(0,a.jsx)(t.th,{children:"Type"}),(0,a.jsx)(t.th,{children:"Description"})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"event"}),(0,a.jsx)(t.td,{children:"APIGatewayProxyEventV2"}),(0,a.jsx)(t.td,{})]})})]}),"\n",(0,a.jsx)(t.p,{children:"Returns:"}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.a,{href:"/docs/api/Contracts/AdapterContract/AdapterRequest",children:"AdapterRequest"})}),"\n",(0,a.jsx)(t.h2,{id:"method-getresponse",children:"(method) getResponse"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"getResponse(\\{ headers: responseHeaders, body, isBase64Encoded, statusCode, response, }: GetResponseAdapterProps<APIGatewayProxyEventV2>): APIGatewayProxyStructuredResultV2;\n"})}),"\n",(0,a.jsx)(t.h3,{id:"parameters-4",children:"Parameters"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Parameter"}),(0,a.jsx)(t.th,{children:"Type"}),(0,a.jsx)(t.th,{children:"Description"})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"{ headers: responseHeaders, body, isBase64Encoded, statusCode, response, }"}),(0,a.jsxs)(t.td,{children:[(0,a.jsx)(t.a,{href:"/docs/api/Contracts/AdapterContract/GetResponseAdapterProps",children:"GetResponseAdapterProps"})," <APIGatewayProxyEventV2>"]}),(0,a.jsx)(t.td,{})]})})]}),"\n",(0,a.jsx)(t.p,{children:"Returns:"}),"\n",(0,a.jsx)(t.p,{children:"APIGatewayProxyStructuredResultV2"}),"\n",(0,a.jsx)(t.h2,{id:"method-onerrorwhileforwarding",children:"(method) onErrorWhileForwarding"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"onErrorWhileForwarding(\\{ error, delegatedResolver, respondWithErrors, event, log, }: OnErrorProps<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2>): void;\n"})}),"\n",(0,a.jsx)(t.h3,{id:"parameters-5",children:"Parameters"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Parameter"}),(0,a.jsx)(t.th,{children:"Type"}),(0,a.jsx)(t.th,{children:"Description"})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"{ error, delegatedResolver, respondWithErrors, event, log, }"}),(0,a.jsxs)(t.td,{children:[(0,a.jsx)(t.a,{href:"/docs/api/Contracts/AdapterContract/OnErrorProps",children:"OnErrorProps"})," <APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2>"]}),(0,a.jsx)(t.td,{})]})})]}),"\n",(0,a.jsx)(t.p,{children:"Returns:"}),"\n",(0,a.jsx)(t.p,{children:"void"}),"\n",(0,a.jsx)(t.h2,{id:"property-options",children:"(property) options"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"protected readonly options?: ApiGatewayV2Options | undefined;\n"})}),"\n",(0,a.jsx)(t.h2,{id:"property-strippathfn",children:"(property) stripPathFn"}),"\n",(0,a.jsx)(t.p,{children:"Strip base path function"}),"\n",(0,a.jsx)(t.p,{children:"Signature:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",children:"protected stripPathFn: StripBasePathFn;\n"})})]})}function o(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},1151:(e,t,r)=>{r.d(t,{Z:()=>i,a:()=>d});var a=r(7294);const n={},s=a.createContext(n);function d(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:d(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);