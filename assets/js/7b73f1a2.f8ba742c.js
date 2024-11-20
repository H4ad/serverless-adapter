"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2964],{4822:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>c,frontMatter:()=>d,metadata:()=>l,toc:()=>h});var s=t(4848),n=t(8453);const d={},a=void 0,l={id:"api/ServerlessAdapter/ServerlessAdapter",title:"ServerlessAdapter",description:"@h4ad/serverless-adapter &gt; ServerlessAdapter",source:"@site/docs/api/ServerlessAdapter/ServerlessAdapter.md",sourceDirName:"api/ServerlessAdapter",slug:"/api/ServerlessAdapter/",permalink:"/docs/api/ServerlessAdapter/",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/ServerlessAdapter/ServerlessAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"PromiseResolver",permalink:"/docs/api/Resolvers/PromiseResolver/"},next:{title:"BinarySettings",permalink:"/docs/api/Types/BinarySettings/"}},i={},h=[{value:"(class) ServerlessAdapter",id:"class-serverlessadapter",level:2},{value:"Example",id:"example",level:2},{value:"(property) adapters",id:"property-adapters",level:2},{value:"(method) addAdapter",id:"method-addadapter",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(property) app",id:"property-app",level:2},{value:"(property) binarySettings",id:"property-binarysettings",level:2},{value:"(method) build",id:"method-build",level:2},{value:"(property) framework",id:"property-framework",level:2},{value:"(property) handler",id:"property-handler",level:2},{value:"(property) log",id:"property-log",level:2},{value:"(method) new",id:"method-new",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(property) resolver",id:"property-resolver",level:2},{value:"(property) respondWithErrors",id:"property-respondwitherrors",level:2},{value:"Remarks",id:"remarks",level:2},{value:"(method) setBinarySettings",id:"method-setbinarysettings",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) setFramework",id:"method-setframework",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) setHandler",id:"method-sethandler",level:2},{value:"Parameters",id:"parameters-4",level:3},{value:"(method) setLogger",id:"method-setlogger",level:2},{value:"Parameters",id:"parameters-5",level:3},{value:"(method) setResolver",id:"method-setresolver",level:2},{value:"Parameters",id:"parameters-6",level:3},{value:"(method) setRespondWithErrors",id:"method-setrespondwitherrors",level:2},{value:"Parameters",id:"parameters-7",level:3}];function o(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,s.jsx)(r.a,{href:"/docs/api/ServerlessAdapter",children:"ServerlessAdapter"})]}),"\n",(0,s.jsx)(r.h2,{id:"class-serverlessadapter",children:"(class) ServerlessAdapter"}),"\n",(0,s.jsx)(r.p,{children:"The class used to build the serverless handler."}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"export declare class ServerlessAdapter<TApp, TEvent, TContext, TCallback, TResponse, TReturn> \n"})}),"\n",(0,s.jsx)(r.h2,{id:"example",children:"Example"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"const app = express();\r\nexport const handler = ServerlessAdapter.new(app)\r\n  .setFramework(new ExpressFramework())\r\n  .setHandler(new DefaultHandler())\r\n  .setResolver(new PromiseResolver())\r\n  .setRespondWithErrors(true)\r\n  .addAdapter(new AlbAdapter())\r\n  .addAdapter(new SQSAdapter())\r\n  .addAdapter(new SNSAdapter())\r\n  .build();\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-adapters",children:"(property) adapters"}),"\n",(0,s.jsx)(r.p,{children:"The list of adapters used to handle an event's request and response"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected adapters: AdapterContract<TEvent, TContext, TResponse>[];\n"})}),"\n",(0,s.jsx)(r.h2,{id:"method-addadapter",children:"(method) addAdapter"}),"\n",(0,s.jsx)(r.p,{children:"Add an adapter to the adapters list to handle the event coming from any serverless event source"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"addAdapter(adapter: AdapterContract<TEvent, TContext, TResponse>): Pick<this, 'addAdapter' | 'build'>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"adapter"}),(0,s.jsxs)(r.td,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Contracts/AdapterContract",children:"AdapterContract"})," <TEvent, TContext, TResponse>"]}),(0,s.jsx)(r.td,{children:"The implementation of the adapter contract"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Pick<this, 'addAdapter' | 'build'>"}),"\n",(0,s.jsx)(r.h2,{id:"property-app",children:"(property) app"}),"\n",(0,s.jsx)(r.p,{children:"The instance of the app (express, hapi, koa, etc...)"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected app: TApp;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-binarysettings",children:"(property) binarySettings"}),"\n",(0,s.jsx)(r.p,{children:"Settings for whether the response should be treated as binary or not"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected binarySettings: BinarySettings;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"method-build",children:"(method) build"}),"\n",(0,s.jsx)(r.p,{children:"The builder method that returns the handler function to be exported for serverless consumption"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"build(): ServerlessHandler<TReturn>;\n"})}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Contracts/HandlerContract/ServerlessHandler",children:"ServerlessHandler"})," <TReturn>"]}),"\n",(0,s.jsx)(r.h2,{id:"property-framework",children:"(property) framework"}),"\n",(0,s.jsx)(r.p,{children:"The framework that will process requests"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected framework?: FrameworkContract<TApp>;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-handler",children:"(property) handler"}),"\n",(0,s.jsx)(r.p,{children:"The handler that will get the event, context and callback and pass it to the adapter and framework"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected handler?: HandlerContract<TApp, TEvent, TContext, TCallback, TResponse, TReturn>;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-log",children:"(property) log"}),"\n",(0,s.jsx)(r.p,{children:"The instance of the logger service"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected log: ILogger;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"method-new",children:"(method) new"}),"\n",(0,s.jsx)(r.p,{children:"Creates a new instance of the builder with app (express, hapi, koa, etc...)"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"static new<TApp, TEvent, TContext = any, TCallback = any, TResponse = any, TReturn = any>(app: TApp): ServerlessAdapter<TApp, TEvent, TContext, TCallback, TResponse, TReturn>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"app"}),(0,s.jsx)(r.td,{children:"TApp"}),(0,s.jsx)(r.td,{children:"The instance of the app"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/docs/api/ServerlessAdapter",children:"ServerlessAdapter"})," <TApp, TEvent, TContext, TCallback, TResponse, TReturn>"]}),"\n",(0,s.jsx)(r.h2,{id:"property-resolver",children:"(property) resolver"}),"\n",(0,s.jsx)(r.p,{children:"The resolver that aims to resolve the response to serverless and stop its execution when the request ends"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected resolver?: ResolverContract<TEvent, TContext, TCallback, TResponse, TReturn>;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-respondwitherrors",children:"(property) respondWithErrors"}),"\n",(0,s.jsx)(r.p,{children:"Indicates whether the error stack should be included in the response or not"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"protected respondWithErrors: boolean;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"remarks",children:"Remarks"}),"\n",(0,s.jsx)(r.p,{children:"These errors will only be included when an error occurs while forwarding the event to the framework"}),"\n",(0,s.jsx)(r.h2,{id:"method-setbinarysettings",children:"(method) setBinarySettings"}),"\n",(0,s.jsx)(r.p,{children:"Defines the binary settings for whether the response should be treated as binary or not"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"setBinarySettings(binarySettings: BinarySettings): Omit<this, 'setBinarySettings'>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"binarySettings"}),(0,s.jsx)(r.td,{children:(0,s.jsx)(r.a,{href:"/docs/api/Types/BinarySettings",children:"BinarySettings"})}),(0,s.jsx)(r.td,{children:"The binary settings"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Omit<this, 'setBinarySettings'>"}),"\n",(0,s.jsx)(r.h2,{id:"method-setframework",children:"(method) setFramework"}),"\n",(0,s.jsx)(r.p,{children:"Defines the framework that will process requests"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"setFramework(framework: FrameworkContract<TApp>): Omit<this, 'setFramework'>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"framework"}),(0,s.jsxs)(r.td,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Contracts/FrameworkContract",children:"FrameworkContract"})," <TApp>"]}),(0,s.jsx)(r.td,{children:"The implementation of the framework contract"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Omit<this, 'setFramework'>"}),"\n",(0,s.jsx)(r.h2,{id:"method-sethandler",children:"(method) setHandler"}),"\n",(0,s.jsx)(r.p,{children:"Defines the handler that will get the event, context and callback and pass it to the adapter and framework"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"setHandler(handler: HandlerContract<TApp, TEvent, TContext, TCallback, TResponse, TReturn>): Omit<this, 'setHandler'>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"handler"}),(0,s.jsxs)(r.td,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Contracts/HandlerContract",children:"HandlerContract"})," <TApp, TEvent, TContext, TCallback, TResponse, TReturn>"]}),(0,s.jsx)(r.td,{children:"The implementation of the handler contract"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Omit<this, 'setHandler'>"}),"\n",(0,s.jsx)(r.h2,{id:"method-setlogger",children:"(method) setLogger"}),"\n",(0,s.jsx)(r.p,{children:"Defines the logger service used during the execution of the handler"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"setLogger(logger: ILogger): Omit<this, 'setLogger'>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"logger"}),(0,s.jsx)(r.td,{children:(0,s.jsx)(r.a,{href:"/docs/api/Core/Logger/ILogger",children:"ILogger"})}),(0,s.jsx)(r.td,{children:"The implementation of the logger"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Omit<this, 'setLogger'>"}),"\n",(0,s.jsx)(r.h2,{id:"method-setresolver",children:"(method) setResolver"}),"\n",(0,s.jsx)(r.p,{children:"Defines the resolver that aims to resolve the response to serverless and stop its execution when the request ends"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"setResolver(resolver: ResolverContract<TEvent, TContext, TCallback, TResponse, TReturn>): Omit<this, 'setResolver'>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-6",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"resolver"}),(0,s.jsxs)(r.td,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Contracts/ResolverContract",children:"ResolverContract"})," <TEvent, TContext, TCallback, TResponse, TReturn>"]}),(0,s.jsx)(r.td,{children:"The implementation of the resolver contract"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Omit<this, 'setResolver'>"}),"\n",(0,s.jsx)(r.h2,{id:"method-setrespondwitherrors",children:"(method) setRespondWithErrors"}),"\n",(0,s.jsx)(r.p,{children:"Defines the responseWithErrors, a property that indicates whether the error stack should be included in the response or not"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"setRespondWithErrors(respondWithErrors: boolean): Omit<this, 'setRespondWithErrors'>;\n"})}),"\n",(0,s.jsx)(r.h3,{id:"parameters-7",children:"Parameters"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Parameter"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Description"})]})}),(0,s.jsx)(r.tbody,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"respondWithErrors"}),(0,s.jsx)(r.td,{children:"boolean"}),(0,s.jsx)(r.td,{children:"Should include or not the errors in response"})]})})]}),"\n",(0,s.jsx)(r.p,{children:"Returns:"}),"\n",(0,s.jsx)(r.p,{children:"Omit<this, 'setRespondWithErrors'>"})]})}function c(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>a,x:()=>l});var s=t(6540);const n={},d=s.createContext(n);function a(e){const r=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),s.createElement(d.Provider,{value:r},e.children)}}}]);