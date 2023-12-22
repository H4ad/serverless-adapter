"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1527],{1372:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>o,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(5893),d=r(1151);const a={},s=void 0,i={id:"api/Adapters/AWS/EventBridgeAdapter/EventBridgeAdapter",title:"EventBridgeAdapter",description:"@h4ad/serverless-adapter &gt; EventBridgeAdapter",source:"@site/docs/api/Adapters/AWS/EventBridgeAdapter/EventBridgeAdapter.md",sourceDirName:"api/Adapters/AWS/EventBridgeAdapter",slug:"/api/Adapters/AWS/EventBridgeAdapter/",permalink:"/docs/api/Adapters/AWS/EventBridgeAdapter/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/EventBridgeAdapter/EventBridgeAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"DynamoDBAdapterOptions",permalink:"/docs/api/Adapters/AWS/DynamoDBAdapter/DynamoDBAdapterOptions"},next:{title:"EventBridgeEventAll",permalink:"/docs/api/Adapters/AWS/EventBridgeAdapter/EventBridgeEventAll"}},l={},c=[{value:"(class) EventBridgeAdapter",id:"class-eventbridgeadapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2}];function p(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/EventBridgeAdapter",children:"EventBridgeAdapter"})]}),"\n",(0,n.jsx)(t.h2,{id:"class-eventbridgeadapter",children:"(class) EventBridgeAdapter"}),"\n",(0,n.jsx)(t.p,{children:"The adapter to handle requests from AWS EventBridge (Cloudwatch Events)."}),"\n",(0,n.jsxs)(t.p,{children:["The option of ",(0,n.jsx)(t.code,{children:"responseWithErrors"})," is ignored by this adapter and we always call ",(0,n.jsx)(t.code,{children:"resolver.fail"})," with the error."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html",children:"Event Reference"})}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export declare class EventBridgeAdapter extends AwsSimpleAdapter<EventBridgeEventAll> \n"})}),"\n",(0,n.jsxs)(t.p,{children:["Extends: ",(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/AWS%20Simple%20Adapter/AwsSimpleAdapter",children:"AwsSimpleAdapter"})," <",(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/EventBridgeAdapter/EventBridgeEventAll",children:"EventBridgeEventAll"})," >"]}),"\n",(0,n.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"const eventBridgeForwardPath = '/your/route/eventbridge'; // default /eventbridge\r\nconst eventBridgeForwardMethod = 'POST'; // default POST\r\nconst adapter = new EventBridgeAdapter(\\{ eventBridgeForwardPath, eventBridgeForwardMethod });\n"})}),"\n",(0,n.jsx)(t.h2,{id:"constructor",children:"(constructor)"}),"\n",(0,n.jsx)(t.p,{children:"Default constructor"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"constructor(options?: EventBridgeOptions);\n"})}),"\n",(0,n.jsx)(t.h3,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Parameter"}),(0,n.jsx)(t.th,{children:"Type"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"options"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/EventBridgeAdapter/EventBridgeOptions",children:"EventBridgeOptions"})}),(0,n.jsxs)(t.td,{children:["(Optional) The options to customize the ",(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/EventBridgeAdapter",children:"EventBridgeAdapter"})]})]})})]}),"\n",(0,n.jsx)(t.h2,{id:"method-canhandle",children:"(method) canHandle"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"canHandle(event: unknown): event is EventBridgeEventAll;\n"})}),"\n",(0,n.jsx)(t.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Parameter"}),(0,n.jsx)(t.th,{children:"Type"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"event"}),(0,n.jsx)(t.td,{children:"unknown"}),(0,n.jsx)(t.td,{})]})})]}),"\n",(0,n.jsx)(t.p,{children:"Returns:"}),"\n",(0,n.jsxs)(t.p,{children:["event is ",(0,n.jsx)(t.a,{href:"/docs/api/Adapters/AWS/EventBridgeAdapter/EventBridgeEventAll",children:"EventBridgeEventAll"})]}),"\n",(0,n.jsx)(t.h2,{id:"method-getadaptername",children:"(method) getAdapterName"}),"\n",(0,n.jsx)(t.p,{children:"Signature:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"getAdapterName(): string;\n"})}),"\n",(0,n.jsx)(t.p,{children:"Returns:"}),"\n",(0,n.jsx)(t.p,{children:"string"})]})}function o(e={}){const{wrapper:t}={...(0,d.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},1151:(e,t,r)=>{r.d(t,{Z:()=>i,a:()=>s});var n=r(7294);const d={},a=n.createContext(d);function s(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);