"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5669],{8752:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>h});var n=r(5893),a=r(1151);const i={},s=void 0,p={id:"api/Types/Huawei/HuaweiApiGatewayEvent/HuaweiApiGatewayEvent",title:"HuaweiApiGatewayEvent",description:"@h4ad/serverless-adapter &gt; HuaweiApiGatewayEvent",source:"@site/docs/api/Types/Huawei/HuaweiApiGatewayEvent/HuaweiApiGatewayEvent.md",sourceDirName:"api/Types/Huawei/HuaweiApiGatewayEvent",slug:"/api/Types/Huawei/HuaweiApiGatewayEvent/",permalink:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Types/Huawei/HuaweiApiGatewayEvent/HuaweiApiGatewayEvent.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Concrete",permalink:"/docs/api/Types/Concrete"},next:{title:"HuaweiRequestContext",permalink:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent/HuaweiRequestContext"}},c={},h=[{value:"(interface) HuaweiApiGatewayEvent",id:"interface-huaweiapigatewayevent",level:2},{value:"(property) body",id:"property-body",level:2},{value:"(property) headers",id:"property-headers",level:2},{value:"(property) httpMethod",id:"property-httpmethod",level:2},{value:"(property) isBase64Encoded",id:"property-isbase64encoded",level:2},{value:"(property) path",id:"property-path",level:2},{value:"(property) pathParameters",id:"property-pathparameters",level:2},{value:"(property) queryStringParameters",id:"property-querystringparameters",level:2},{value:"(property) requestContext",id:"property-requestcontext",level:2}];function o(e){const t={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,n.jsx)(t.a,{href:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent",children:"HuaweiApiGatewayEvent"})]}),"\n",(0,n.jsx)(t.h2,{id:"interface-huaweiapigatewayevent",children:"(interface) HuaweiApiGatewayEvent"}),"\n",(0,n.jsxs)(t.p,{children:["The interface that represents the Api Gateway Event of Huawei when integrate with Function Graph of Event Type. See more in ",(0,n.jsx)(t.a,{href:"https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0102.html#functiongraph_02_0102__li5178638110137",children:"Reference"})," ."]}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export interface HuaweiApiGatewayEvent \n"})}),"\n",(0,n.jsx)(t.h2,{id:"property-body",children:"(property) body"}),"\n",(0,n.jsx)(t.p,{children:"The body value with the content of this event serialized in JSON"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"body: string;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"property-headers",children:"(property) headers"}),"\n",(0,n.jsx)(t.p,{children:"The headers of the request which this event represents"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"headers: BothValueHeaders;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"property-httpmethod",children:"(property) httpMethod"}),"\n",(0,n.jsx)(t.p,{children:"The HTTP Method of the request which this event represents"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"httpMethod: string;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"property-isbase64encoded",children:"(property) isBase64Encoded"}),"\n",(0,n.jsx)(t.p,{children:"Tells if the body is base64 encoded"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"isBase64Encoded: boolean;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"property-path",children:"(property) path"}),"\n",(0,n.jsx)(t.p,{children:"The path of the request which this event represents"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"path: string;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"property-pathparameters",children:"(property) pathParameters"}),"\n",(0,n.jsx)(t.p,{children:"The path parameters of the request which this event represents"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"pathParameters: HuaweiRequestPathParameters;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"property-querystringparameters",children:"(property) queryStringParameters"}),"\n",(0,n.jsx)(t.p,{children:"The query strings of the request which this event represents"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"queryStringParameters: HuaweiRequestQueryStringParameters;\n"})}),"\n",(0,n.jsx)(t.h2,{id:"property-requestcontext",children:"(property) requestContext"}),"\n",(0,n.jsx)(t.p,{children:"The request context with information about the stage, api and requestId"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"requestContext: HuaweiRequestContext;\n"})})]})}function d(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},1151:(e,t,r)=>{r.d(t,{Z:()=>p,a:()=>s});var n=r(7294);const a={},i=n.createContext(a);function s(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function p(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);