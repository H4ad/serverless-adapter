"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[436],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>k});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),s=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},d=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,i=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=s(r),m=n,k=c["".concat(i,".").concat(m)]||c[m]||u[m]||l;return r?a.createElement(k,p(p({ref:t},d),{},{components:r})):a.createElement(k,p({ref:t},d))}));function k(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,p=new Array(l);p[0]=m;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[c]="string"==typeof e?e:n,p[1]=o;for(var s=2;s<l;s++)p[s]=r[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8318:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>p,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var a=r(7462),n=(r(7294),r(3905));const l={},p=void 0,o={unversionedId:"api/Handlers/GCPHandler/GCPHandler",id:"api/Handlers/GCPHandler/GCPHandler",title:"GCPHandler",description:"@h4ad/serverless-adapter &gt; GCPHandler",source:"@site/docs/api/Handlers/GCPHandler/GCPHandler.md",sourceDirName:"api/Handlers/GCPHandler",slug:"/api/Handlers/GCPHandler/",permalink:"/docs/api/Handlers/GCPHandler/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Handlers/GCPHandler/GCPHandler.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"DigitalOceanHandler",permalink:"/docs/api/Handlers/DigitalOceanHandler/"},next:{title:"HttpFirebaseHandler",permalink:"/docs/api/Handlers/HttpFirebaseHandler/"}},i={},s=[{value:"(class) GCPHandler",id:"class-gcphandler",level:2},{value:"Remarks",id:"remarks",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) getHandler",id:"method-gethandler",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(property) name",id:"property-name",level:2}],d={toc:s},c="wrapper";function u(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Handlers/GCPHandler"},"GCPHandler")),(0,n.kt)("h2",{id:"class-gcphandler"},"(class) GCPHandler"),(0,n.kt)("p",null,"The class that implements a handler for GCP Http Functions"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class GCPHandler<TApp> extends RawRequest<TApp> implements HandlerContract<TApp, never, never, never, void, void | Promise<void>> \n")),(0,n.kt)("p",null,"Extends: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Handlers/Base/RawRequest"},"RawRequest")," ","<","TApp",">"),(0,n.kt)("p",null,"Implements: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/HandlerContract"},"HandlerContract")," ","<","TApp, never, never, never, void, void ","|"," Promise","<","void",">",">"),(0,n.kt)("h2",{id:"remarks"},"Remarks"),(0,n.kt)("p",null,"Read more about Http Cloud Function ",(0,n.kt)("a",{parentName:"p",href:"https://cloud.google.com/functions/docs/create-deploy-http-nodejs"},"here")),(0,n.kt)("h2",{id:"constructor"},"(constructor)"),(0,n.kt)("p",null,"Default Constructor"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"constructor(name: string);\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"name"),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"The name of this function, should be the during deploy.")))),(0,n.kt)("h2",{id:"method-gethandler"},"(method) getHandler"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getHandler(app: TApp, framework: FrameworkContract<TApp>): (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;\n")),(0,n.kt)("h3",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"app"),(0,n.kt)("td",{parentName:"tr",align:null},"TApp"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"framework"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/FrameworkContract"},"FrameworkContract")," ","<","TApp",">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"(req: IncomingMessage, res: ServerResponse) =",">"," void ","|"," Promise","<","void",">"),(0,n.kt)("h2",{id:"property-name"},"(property) name"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly name: string;\n")))}u.isMDXComponent=!0}}]);