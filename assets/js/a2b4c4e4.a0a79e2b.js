"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[993],{3905:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),d=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},i=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,s=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),u=d(r),m=n,k=u["".concat(s,".").concat(m)]||u[m]||c[m]||l;return r?a.createElement(k,p(p({ref:t},i),{},{components:r})):a.createElement(k,p({ref:t},i))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,p=new Array(l);p[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:n,p[1]=o;for(var d=2;d<l;d++)p[d]=r[d];return a.createElement.apply(null,p)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4204:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var a=r(7462),n=(r(7294),r(3905));const l={},p=void 0,o={unversionedId:"api/Contracts/AdapterContract/AdapterContract",id:"api/Contracts/AdapterContract/AdapterContract",title:"AdapterContract",description:"@h4ad/serverless-adapter &gt; AdapterContract",source:"@site/docs/api/Contracts/AdapterContract/AdapterContract.md",sourceDirName:"api/Contracts/AdapterContract",slug:"/api/Contracts/AdapterContract/",permalink:"/docs/api/Contracts/AdapterContract/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Contracts/AdapterContract/AdapterContract.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"BodyParserOptions",permalink:"/docs/api/BodyParserOptions"},next:{title:"AdapterRequest",permalink:"/docs/api/Contracts/AdapterContract/AdapterRequest"}},s={},d=[{value:"(interface) AdapterContract",id:"interface-adaptercontract",level:2},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"Remarks",id:"remarks",level:2}],i={toc:d};function c(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")),(0,n.kt)("h2",{id:"interface-adaptercontract"},"(interface) AdapterContract"),(0,n.kt)("p",null,"The interface that represents a contract between the adapter and the actual implementation of the adapter."),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface AdapterContract<TEvent, TContext, TResponse> \n")),(0,n.kt)("h2",{id:"method-canhandle"},"(method) canHandle"),(0,n.kt)("p",null,"Decide if this adapter can handle a request based in the event payload"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"canHandle(event: unknown, context: TContext, log: ILogger): boolean;\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},"unknown"),(0,n.kt)("td",{parentName:"tr",align:null},"The event sent by serverless")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"context"),(0,n.kt)("td",{parentName:"tr",align:null},"TContext"),(0,n.kt)("td",{parentName:"tr",align:null},"The context sent by the serverless")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"log"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,n.kt)("td",{parentName:"tr",align:null},"The instance of logger")))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"boolean"),(0,n.kt)("h2",{id:"method-getadaptername"},"(method) getAdapterName"),(0,n.kt)("p",null,"Get the adapter name"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getAdapterName(): string;\n")),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"string"),(0,n.kt)("h2",{id:"method-getrequest"},"(method) getRequest"),(0,n.kt)("p",null,"Maps the serverless payload to an actual request that a framework can handle"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getRequest(event: TEvent, context: TContext, log: ILogger): AdapterRequest;\n")),(0,n.kt)("h3",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},"TEvent"),(0,n.kt)("td",{parentName:"tr",align:null},"The event sent by serverless")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"context"),(0,n.kt)("td",{parentName:"tr",align:null},"TContext"),(0,n.kt)("td",{parentName:"tr",align:null},"The context sent by the serverless")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"log"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,n.kt)("td",{parentName:"tr",align:null},"The instance of logger")))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract/AdapterRequest"},"AdapterRequest")),(0,n.kt)("h2",{id:"method-getresponse"},"(method) getResponse"),(0,n.kt)("p",null,"Maps the response of the framework to a payload that serverless can handle"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getResponse(props: GetResponseAdapterProps<TEvent>): TResponse;\n")),(0,n.kt)("h3",{id:"parameters-2"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/GetResponseAdapterProps"},"GetResponseAdapterProps")," ","<","TEvent",">"),(0,n.kt)("td",{parentName:"tr",align:null},"The props sent by serverless")))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"TResponse"),(0,n.kt)("h2",{id:"method-onerrorwhileforwarding"},"(method) onErrorWhileForwarding"),(0,n.kt)("p",null,"When an error occurs while forwarding the request to the framework"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"onErrorWhileForwarding(props: OnErrorProps<TEvent, TResponse>): void;\n")),(0,n.kt)("h3",{id:"parameters-3"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/OnErrorProps"},"OnErrorProps")," ","<","TEvent, TResponse",">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"void"),(0,n.kt)("h2",{id:"remarks"},"Remarks"),(0,n.kt)("p",null,"You must call resolver.fail or resolver.succeed when implementing this method."))}c.isMDXComponent=!0}}]);