"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7645],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>m});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),d=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=d(a),m=n,g=u["".concat(p,".").concat(m)]||u[m]||c[m]||l;return a?r.createElement(g,i(i({ref:t},s),{},{components:a})):r.createElement(g,i({ref:t},s))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,i=new Array(l);i[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:n,i[1]=o;for(var d=2;d<l;d++)i[d]=a[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},730:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var r=a(7462),n=(a(7294),a(3905));const l={},i=void 0,o={unversionedId:"api/Handlers/DigitalOceanHandler/DigitalOceanHandler",id:"api/Handlers/DigitalOceanHandler/DigitalOceanHandler",title:"DigitalOceanHandler",description:"@h4ad/serverless-adapter &gt; DigitalOceanHandler",source:"@site/docs/api/Handlers/DigitalOceanHandler/DigitalOceanHandler.md",sourceDirName:"api/Handlers/DigitalOceanHandler",slug:"/api/Handlers/DigitalOceanHandler/",permalink:"/docs/api/Handlers/DigitalOceanHandler/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Handlers/DigitalOceanHandler/DigitalOceanHandler.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"DefaultHandler",permalink:"/docs/api/Handlers/DefaultHandler/"},next:{title:"GCPHandler",permalink:"/docs/api/Handlers/GCPHandler/"}},p={},d=[{value:"(class) DigitalOceanHandler",id:"class-digitaloceanhandler",level:2},{value:"(method) getHandler",id:"method-gethandler",level:2},{value:"Parameters",id:"parameters",level:3}],s={toc:d};function c(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Handlers/DigitalOceanHandler"},"DigitalOceanHandler")),(0,n.kt)("h2",{id:"class-digitaloceanhandler"},"(class) DigitalOceanHandler"),(0,n.kt)("p",null,"The class that implements a serverless handler for Digital Ocean Functions."),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class DigitalOceanHandler<TApp, TEvent, TResponse, TReturn> extends DefaultHandler<TApp, TEvent, void, void, TResponse, TReturn> \n")),(0,n.kt)("p",null,"Extends: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Handlers/DefaultHandler"},"DefaultHandler")," ","<","TApp, TEvent, void, void, TResponse, TReturn",">"),(0,n.kt)("h2",{id:"method-gethandler"},"(method) getHandler"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getHandler(app: TApp, framework: FrameworkContract<TApp>, adapters: AdapterContract<TEvent, void, TResponse>[], resolverFactory: ResolverContract<TEvent, void, void, TResponse, TReturn>, binarySettings: BinarySettings, respondWithErrors: boolean, log: ILogger): ServerlessHandler<TReturn>;\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"app"),(0,n.kt)("td",{parentName:"tr",align:null},"TApp"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"framework"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/FrameworkContract"},"FrameworkContract")," ","<","TApp",">"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"adapters"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")," ","<","TEvent, void, TResponse",">","[","]"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"resolverFactory"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/ResolverContract"},"ResolverContract")," ","<","TEvent, void, void, TResponse, TReturn",">"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"binarySettings"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Types/BinarySettings"},"BinarySettings")),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"respondWithErrors"),(0,n.kt)("td",{parentName:"tr",align:null},"boolean"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"log"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/HandlerContract/ServerlessHandler"},"ServerlessHandler")," ","<","TReturn",">"))}c.isMDXComponent=!0}}]);