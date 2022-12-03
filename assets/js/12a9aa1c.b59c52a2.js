"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8342],{3905:(t,e,a)=>{a.d(e,{Zo:()=>s,kt:()=>m});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function p(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?p(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function i(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},p=Object.keys(t);for(n=0;n<p.length;n++)a=p[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(t);for(n=0;n<p.length;n++)a=p[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var o=n.createContext({}),d=function(t){var e=n.useContext(o),a=e;return t&&(a="function"==typeof t?t(e):l(l({},e),t)),a},s=function(t){var e=d(t.components);return n.createElement(o.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},c=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,p=t.originalType,o=t.parentName,s=i(t,["components","mdxType","originalType","parentName"]),c=d(a),m=r,g=c["".concat(o,".").concat(m)]||c[m]||u[m]||p;return a?n.createElement(g,l(l({ref:e},s),{},{components:a})):n.createElement(g,l({ref:e},s))}));function m(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var p=a.length,l=new Array(p);l[0]=c;var i={};for(var o in e)hasOwnProperty.call(e,o)&&(i[o]=e[o]);i.originalType=t,i.mdxType="string"==typeof t?t:r,l[1]=i;for(var d=2;d<p;d++)l[d]=a[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},1967:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>p,metadata:()=>i,toc:()=>d});var n=a(7462),r=(a(7294),a(3905));const p={},l=void 0,i={unversionedId:"api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapter",id:"api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapter",title:"HttpFunctionAdapter",description:"@h4ad/serverless-adapter &gt; HttpFunctionAdapter",source:"@site/docs/api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapter.md",sourceDirName:"api/Adapters/Digital Ocean/HttpFunctionAdapter",slug:"/api/Adapters/Digital Ocean/HttpFunctionAdapter/",permalink:"/docs/api/Adapters/Digital Ocean/HttpFunctionAdapter/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"HttpTriggerV4AdapterOptions",permalink:"/docs/api/Adapters/Azure/HttpTriggerV4Adapter/HttpTriggerV4AdapterOptions"},next:{title:"HttpFunctionAdapterOptions",permalink:"/docs/api/Adapters/Digital Ocean/HttpFunctionAdapter/HttpFunctionAdapterOptions"}},o={},d=[{value:"(class) HttpFunctionAdapter",id:"class-httpfunctionadapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getPathFromEvent",id:"method-getpathfromevent",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"Parameters",id:"parameters-4",level:3},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-5",level:3},{value:"(property) options",id:"property-options",level:2}],s={toc:d};function u(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},s,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/Adapters/Digital%20Ocean/HttpFunctionAdapter"},"HttpFunctionAdapter")),(0,r.kt)("h2",{id:"class-httpfunctionadapter"},"(class) HttpFunctionAdapter"),(0,r.kt)("p",null,"The adapter to handle requests from Digital Ocean Functions when called from HTTP Endpoint."),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class HttpFunctionAdapter implements AdapterContract<DigitalOceanHttpEvent, void, DigitalOceanHttpResponse> \n")),(0,r.kt)("p",null,"Implements: ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")," ","<","DigitalOceanHttpEvent, void, DigitalOceanHttpResponse",">"),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"const stripBasePath = '/any/custom/base/path'; // default ''\nconst adapter = new HttpFunctionAdapter({ stripBasePath });\n")),(0,r.kt)("h2",{id:"constructor"},"(constructor)"),(0,r.kt)("p",null,"Default constructor"),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"constructor(options?: HttpFunctionAdapterOptions | undefined);\n")),(0,r.kt)("h3",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"options"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/Adapters/Digital%20Ocean/HttpFunctionAdapter/HttpFunctionAdapterOptions"},"HttpFunctionAdapterOptions")," ","|"," undefined"),(0,r.kt)("td",{parentName:"tr",align:null},"(Optional) The options to customize the ",(0,r.kt)("a",{parentName:"td",href:"/docs/api/Adapters/Digital%20Ocean/HttpFunctionAdapter"},"HttpFunctionAdapter"))))),(0,r.kt)("h2",{id:"method-canhandle"},"(method) canHandle"),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"canHandle(event: unknown): event is DigitalOceanHttpEvent;\n")),(0,r.kt)("h3",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"event"),(0,r.kt)("td",{parentName:"tr",align:null},"unknown"),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("p",null,"Returns:"),(0,r.kt)("p",null,"event is DigitalOceanHttpEvent"),(0,r.kt)("h2",{id:"method-getadaptername"},"(method) getAdapterName"),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"getAdapterName(): string;\n")),(0,r.kt)("p",null,"Returns:"),(0,r.kt)("p",null,"string"),(0,r.kt)("h2",{id:"method-getpathfromevent"},"(method) getPathFromEvent"),(0,r.kt)("p",null,"Get path from event with query strings"),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"protected getPathFromEvent(event: DigitalOceanHttpEvent): string;\n")),(0,r.kt)("h3",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"event"),(0,r.kt)("td",{parentName:"tr",align:null},"DigitalOceanHttpEvent"),(0,r.kt)("td",{parentName:"tr",align:null},"The event sent by digital ocean")))),(0,r.kt)("p",null,"Returns:"),(0,r.kt)("p",null,"string"),(0,r.kt)("h2",{id:"method-getrequest"},"(method) getRequest"),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"getRequest(event: DigitalOceanHttpEvent): AdapterRequest;\n")),(0,r.kt)("h3",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"event"),(0,r.kt)("td",{parentName:"tr",align:null},"DigitalOceanHttpEvent"),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("p",null,"Returns:"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract/AdapterRequest"},"AdapterRequest")),(0,r.kt)("h2",{id:"method-getresponse"},"(method) getResponse"),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"getResponse({ headers: responseHeaders, body, statusCode, }: GetResponseAdapterProps<DigitalOceanHttpEvent>): DigitalOceanHttpResponse;\n")),(0,r.kt)("h3",{id:"parameters-4"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"{ headers: responseHeaders, body, statusCode, }"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/GetResponseAdapterProps"},"GetResponseAdapterProps")," ","<","DigitalOceanHttpEvent",">"),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("p",null,"Returns:"),(0,r.kt)("p",null,"DigitalOceanHttpResponse"),(0,r.kt)("h2",{id:"method-onerrorwhileforwarding"},"(method) onErrorWhileForwarding"),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"onErrorWhileForwarding({ error, delegatedResolver, respondWithErrors, event, log, }: OnErrorProps<DigitalOceanHttpEvent, DigitalOceanHttpResponse>): void;\n")),(0,r.kt)("h3",{id:"parameters-5"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"{ error, delegatedResolver, respondWithErrors, event, log, }"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/OnErrorProps"},"OnErrorProps")," ","<","DigitalOceanHttpEvent, DigitalOceanHttpResponse",">"),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("p",null,"Returns:"),(0,r.kt)("p",null,"void"),(0,r.kt)("h2",{id:"property-options"},"(property) options"),(0,r.kt)("p",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly options?: HttpFunctionAdapterOptions | undefined;\n")))}u.isMDXComponent=!0}}]);