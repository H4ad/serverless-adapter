"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7658],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>k});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var d=a.createContext({}),i=function(e){var t=a.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},s=function(e){var t=i(e.components);return a.createElement(d.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,d=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=i(r),c=n,k=u["".concat(d,".").concat(c)]||u[c]||m[c]||l;return r?a.createElement(k,p(p({ref:t},s),{},{components:r})):a.createElement(k,p({ref:t},s))}));function k(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,p=new Array(l);p[0]=c;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o[u]="string"==typeof e?e:n,p[1]=o;for(var i=2;i<l;i++)p[i]=r[i];return a.createElement.apply(null,p)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},6787:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>p,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>i});var a=r(7462),n=(r(7294),r(3905));const l={},p=void 0,o={unversionedId:"api/Adapters/Apollo Server/ApolloServerMutationAdapter/ApolloServerMutationAdapter",id:"api/Adapters/Apollo Server/ApolloServerMutationAdapter/ApolloServerMutationAdapter",title:"ApolloServerMutationAdapter",description:"@h4ad/serverless-adapter &gt; ApolloServerMutationAdapter",source:"@site/docs/api/Adapters/Apollo Server/ApolloServerMutationAdapter/ApolloServerMutationAdapter.md",sourceDirName:"api/Adapters/Apollo Server/ApolloServerMutationAdapter",slug:"/api/Adapters/Apollo Server/ApolloServerMutationAdapter/",permalink:"/docs/api/Adapters/Apollo Server/ApolloServerMutationAdapter/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/Apollo Server/ApolloServerMutationAdapter/ApolloServerMutationAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"SQSAdapterOptions",permalink:"/docs/api/Adapters/AWS/SQSAdapter/SQSAdapterOptions"},next:{title:"ApolloServerMutationAdapterOptions",permalink:"/docs/api/Adapters/Apollo Server/ApolloServerMutationAdapter/ApolloServerMutationAdapterOptions"}},d={},i=[{value:"(class) ApolloServerMutationAdapter",id:"class-apolloservermutationadapter",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(property) baseAdapter",id:"property-baseadapter",level:2},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-4",level:3},{value:"(property) options",id:"property-options",level:2}],s={toc:i},u="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Adapters/Apollo%20Server/ApolloServerMutationAdapter"},"ApolloServerMutationAdapter")),(0,n.kt)("h2",{id:"class-apolloservermutationadapter"},"(class) ApolloServerMutationAdapter"),(0,n.kt)("p",null,"The adapter that wraps another adapter to force a transformation of the event data as a mutation to Apollo Server be able to handle."),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class ApolloServerMutationAdapter<TEvent, TContext, TResponse, TBaseAdapter extends AdapterContract<TEvent, TContext, TResponse>> implements AdapterContract<TEvent, TContext, TResponse> \n")),(0,n.kt)("p",null,"Implements: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")," ","<","TEvent, TContext, TResponse",">"),(0,n.kt)("h2",{id:"constructor"},"(constructor)"),(0,n.kt)("p",null,"The default constructor"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"constructor(baseAdapter: TBaseAdapter, options: ApolloServerMutationAdapterOptions);\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"baseAdapter"),(0,n.kt)("td",{parentName:"tr",align:null},"TBaseAdapter"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"options"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Adapters/Apollo%20Server/ApolloServerMutationAdapter/ApolloServerMutationAdapterOptions"},"ApolloServerMutationAdapterOptions")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("h2",{id:"property-baseadapter"},"(property) baseAdapter"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly baseAdapter: TBaseAdapter;\n")),(0,n.kt)("h2",{id:"method-canhandle"},"(method) canHandle"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"canHandle(event: unknown, context: TContext, log: ILogger): boolean;\n")),(0,n.kt)("h3",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},"unknown"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"context"),(0,n.kt)("td",{parentName:"tr",align:null},"TContext"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"log"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"boolean"),(0,n.kt)("h2",{id:"method-getadaptername"},"(method) getAdapterName"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getAdapterName(): string;\n")),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"string"),(0,n.kt)("h2",{id:"method-getrequest"},"(method) getRequest"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getRequest(event: TEvent, context: TContext, log: ILogger): AdapterRequest;\n")),(0,n.kt)("h3",{id:"parameters-2"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},"TEvent"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"context"),(0,n.kt)("td",{parentName:"tr",align:null},"TContext"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"log"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract/AdapterRequest"},"AdapterRequest")),(0,n.kt)("h2",{id:"method-getresponse"},"(method) getResponse"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getResponse(props: GetResponseAdapterProps<TEvent>): TResponse;\n")),(0,n.kt)("h3",{id:"parameters-3"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/GetResponseAdapterProps"},"GetResponseAdapterProps")," ","<","TEvent",">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"TResponse"),(0,n.kt)("h2",{id:"method-onerrorwhileforwarding"},"(method) onErrorWhileForwarding"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"onErrorWhileForwarding(props: OnErrorProps<TEvent, TResponse>): void;\n")),(0,n.kt)("h3",{id:"parameters-4"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/OnErrorProps"},"OnErrorProps")," ","<","TEvent, TResponse",">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"void"),(0,n.kt)("h2",{id:"property-options"},"(property) options"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly options: ApolloServerMutationAdapterOptions;\n")))}m.isMDXComponent=!0}}]);