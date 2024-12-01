"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3569],{3371:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>l,frontMatter:()=>d,metadata:()=>i,toc:()=>c});var a=r(4848),t=r(8453);const d={},s=void 0,i={id:"api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapter",title:"DynamoDBAdapter",description:"@h4ad/serverless-adapter &gt; DynamoDBAdapter",source:"@site/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapter.md",sourceDirName:"api/Adapters/AWS/DynamoDBAdapter",slug:"/api/Adapters/AWS/DynamoDBAdapter/",permalink:"/docs/api/Adapters/AWS/DynamoDBAdapter/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"ApiGatewayV2Options",permalink:"/docs/api/Adapters/AWS/ApiGatewayV2Adapter/ApiGatewayV2Options"},next:{title:"DynamoDBAdapterOptions",permalink:"/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapterOptions"}},o={},c=[{value:"(class) DynamoDBAdapter",id:"class-dynamodbadapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2}];function p(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,a.jsx)(n.a,{href:"/docs/api/Adapters/AWS/DynamoDBAdapter",children:"DynamoDBAdapter"})]}),"\n",(0,a.jsx)(n.h2,{id:"class-dynamodbadapter",children:"(class) DynamoDBAdapter"}),"\n",(0,a.jsx)(n.p,{children:"The adapter to handle requests from AWS DynamoDB."}),"\n",(0,a.jsxs)(n.p,{children:["The option of ",(0,a.jsx)(n.code,{children:"responseWithErrors"})," is ignored by this adapter and we always call ",(0,a.jsx)(n.code,{children:"resolver.fail"})," with the error."]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html",children:"Event Reference"})}),"\n",(0,a.jsx)(n.p,{children:"Signature:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"export declare class DynamoDBAdapter extends AwsSimpleAdapter<DynamoDBStreamEvent> \n"})}),"\n",(0,a.jsxs)(n.p,{children:["Extends: ",(0,a.jsx)(n.a,{href:"/docs/api/Adapters/AWS/AWS%20Simple%20Adapter/AwsSimpleAdapter",children:"AwsSimpleAdapter"})," <DynamoDBStreamEvent>"]}),"\n",(0,a.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"const dynamoDBForwardPath = '/your/route/dynamo'; // default /dynamo\r\nconst dynamoDBForwardMethod = 'POST'; // default POST\r\nconst adapter = new DynamoDBAdapter(\\{ dynamoDBForwardPath, dynamoDBForwardMethod });\n"})}),"\n",(0,a.jsx)(n.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,a.jsx)(n.p,{children:"Default constructor"}),"\n",(0,a.jsx)(n.p,{children:"Signature:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"constructor(options?: DynamoDBAdapterOptions);\n"})}),"\n",(0,a.jsx)(n.h3,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsxs)("table",{children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:(0,a.jsx)(n.p,{children:"Parameter"})}),(0,a.jsx)("th",{children:(0,a.jsx)(n.p,{children:"Type"})}),(0,a.jsx)("th",{children:(0,a.jsx)(n.p,{children:"Description"})})]})}),(0,a.jsx)("tbody",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:(0,a.jsx)(n.p,{children:"options"})}),(0,a.jsx)("td",{children:(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapterOptions",children:"DynamoDBAdapterOptions"})})}),(0,a.jsx)("td",{children:(0,a.jsxs)(n.p,{children:["(Optional) The options to customize the ",(0,a.jsx)(n.a,{href:"/docs/api/Adapters/AWS/DynamoDBAdapter",children:"DynamoDBAdapter"})]})})]})})]}),"\n",(0,a.jsx)(n.h2,{id:"method-canhandle",children:"(method) canHandle"}),"\n",(0,a.jsx)(n.p,{children:"Signature:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"canHandle(event: unknown): event is DynamoDBStreamEvent;\n"})}),"\n",(0,a.jsx)(n.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,a.jsxs)("table",{children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:(0,a.jsx)(n.p,{children:"Parameter"})}),(0,a.jsx)("th",{children:(0,a.jsx)(n.p,{children:"Type"})}),(0,a.jsx)("th",{children:(0,a.jsx)(n.p,{children:"Description"})})]})}),(0,a.jsx)("tbody",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:(0,a.jsx)(n.p,{children:"event"})}),(0,a.jsx)("td",{children:(0,a.jsx)(n.p,{children:"unknown"})}),(0,a.jsx)("td",{})]})})]}),"\n",(0,a.jsx)(n.p,{children:"Returns:"}),"\n",(0,a.jsx)(n.p,{children:"event is DynamoDBStreamEvent"}),"\n",(0,a.jsx)(n.h2,{id:"method-getadaptername",children:"(method) getAdapterName"}),"\n",(0,a.jsx)(n.p,{children:"Signature:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"getAdapterName(): string;\n"})}),"\n",(0,a.jsx)(n.p,{children:"Returns:"}),"\n",(0,a.jsx)(n.p,{children:"string"})]})}function l(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>i});var a=r(6540);const t={},d=a.createContext(t);function s(e){const n=a.useContext(d);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),a.createElement(d.Provider,{value:n},e.children)}}}]);