"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6294],{6527:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>l,frontMatter:()=>d,metadata:()=>o,toc:()=>c});var n=a(5893),r=a(1151);const d={},s=void 0,o={id:"api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapter",title:"DynamoDBAdapter",description:"@h4ad/serverless-adapter &gt; DynamoDBAdapter",source:"@site/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapter.md",sourceDirName:"api/Adapters/AWS/DynamoDBAdapter",slug:"/api/Adapters/AWS/DynamoDBAdapter/",permalink:"/docs/api/Adapters/AWS/DynamoDBAdapter/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"ApiGatewayV2Options",permalink:"/docs/api/Adapters/AWS/ApiGatewayV2Adapter/ApiGatewayV2Options"},next:{title:"DynamoDBAdapterOptions",permalink:"/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapterOptions"}},i={},c=[{value:"(class) DynamoDBAdapter",id:"class-dynamodbadapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2}];function p(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/DynamoDBAdapter",children:"DynamoDBAdapter"})]}),"\n",(0,n.jsx)(t.h2,{id:"class-dynamodbadapter",children:"(class) DynamoDBAdapter"}),"\n",(0,n.jsx)(t.p,{children:"The adapter to handle requests from AWS DynamoDB."}),"\n",(0,n.jsxs)(t.p,{children:["The option of ",(0,n.jsx)(t.code,{children:"responseWithErrors"})," is ignored by this adapter and we always call ",(0,n.jsx)(t.code,{children:"resolver.fail"})," with the error."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html",children:"Event Reference"})}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export declare class DynamoDBAdapter extends AwsSimpleAdapter<DynamoDBStreamEvent> \n"})}),"\n",(0,n.jsxs)(t.p,{children:["Extends: ",(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/AWS%20Simple%20Adapter/AwsSimpleAdapter",children:"AwsSimpleAdapter"})," <DynamoDBStreamEvent>"]}),"\n",(0,n.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"const dynamoDBForwardPath = '/your/route/dynamo'; // default /dynamo\r\nconst dynamoDBForwardMethod = 'POST'; // default POST\r\nconst adapter = new DynamoDBAdapter(\\{ dynamoDBForwardPath, dynamoDBForwardMethod });\n"})}),"\n",(0,n.jsx)(t.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,n.jsx)(t.p,{children:"Default constructor"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"constructor(options?: DynamoDBAdapterOptions);\n"})}),"\n",(0,n.jsx)(t.h3,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Parameter"}),(0,n.jsx)(t.th,{children:"Type"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"options"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapterOptions",children:"DynamoDBAdapterOptions"})}),(0,n.jsxs)(t.td,{children:["(Optional) The options to customize the ",(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/DynamoDBAdapter",children:"DynamoDBAdapter"})]})]})})]}),"\n",(0,n.jsx)(t.h2,{id:"method-canhandle",children:"(method) canHandle"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"canHandle(event: unknown): event is DynamoDBStreamEvent;\n"})}),"\n",(0,n.jsx)(t.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Parameter"}),(0,n.jsx)(t.th,{children:"Type"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"event"}),(0,n.jsx)(t.td,{children:"unknown"}),(0,n.jsx)(t.td,{})]})})]}),"\n",(0,n.jsx)(t.p,{children:"Returns:"}),"\n",(0,n.jsx)(t.p,{children:"event is DynamoDBStreamEvent"}),"\n",(0,n.jsx)(t.h2,{id:"method-getadaptername",children:"(method) getAdapterName"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"getAdapterName(): string;\n"})}),"\n",(0,n.jsx)(t.p,{children:"Returns:"}),"\n",(0,n.jsx)(t.p,{children:"string"})]})}function l(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},1151:(e,t,a)=>{a.d(t,{Z:()=>o,a:()=>s});var n=a(7294);const r={},d=n.createContext(r);function s(e){const t=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(d.Provider,{value:t},e.children)}}}]);