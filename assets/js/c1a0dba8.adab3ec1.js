"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8848],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return m}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=a.createContext({}),d=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},s=function(e){var t=d(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),c=d(r),m=n,k=c["".concat(o,".").concat(m)]||c[m]||u[m]||l;return r?a.createElement(k,p(p({ref:t},s),{},{components:r})):a.createElement(k,p({ref:t},s))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,p=new Array(l);p[0]=c;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:n,p[1]=i;for(var d=2;d<l;d++)p[d]=r[d];return a.createElement.apply(null,p)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},2228:function(e,t,r){r.r(t),r.d(t,{assets:function(){return s},contentTitle:function(){return o},default:function(){return m},frontMatter:function(){return i},metadata:function(){return d},toc:function(){return u}});var a=r(7462),n=r(3366),l=(r(7294),r(3905)),p=["components"],i={},o=void 0,d={unversionedId:"api/Handlers/HttpHuaweiHandler/HttpHuaweiHandler",id:"api/Handlers/HttpHuaweiHandler/HttpHuaweiHandler",title:"HttpHuaweiHandler",description:"@h4ad/serverless-adapter &gt; HttpHuaweiHandler",source:"@site/docs/api/Handlers/HttpHuaweiHandler/HttpHuaweiHandler.md",sourceDirName:"api/Handlers/HttpHuaweiHandler",slug:"/api/Handlers/HttpHuaweiHandler/",permalink:"/serverless-adapter/docs/api/Handlers/HttpHuaweiHandler/",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Handlers/HttpHuaweiHandler/HttpHuaweiHandler.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"HttpFirebaseHandler",permalink:"/serverless-adapter/docs/api/Handlers/HttpFirebaseHandler/"},next:{title:"DEFAULT_HUAWEI_LISTEN_PORT",permalink:"/serverless-adapter/docs/api/Handlers/HttpHuaweiHandler/DEFAULT_HUAWEI_LISTEN_PORT"}},s={},u=[{value:"(class) HttpHuaweiHandler",id:"class-httphuaweihandler",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) createHttpServer",id:"method-createhttpserver",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getHandler",id:"method-gethandler",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(property) options",id:"property-options",level:2}],c={toc:u};function m(e){var t=e.components,r=(0,n.Z)(e,p);return(0,l.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/Handlers/HttpHuaweiHandler"},"HttpHuaweiHandler")),(0,l.kt)("h2",{id:"class-httphuaweihandler"},"(class) HttpHuaweiHandler"),(0,l.kt)("p",null,"The class that implements a huawei serverless handler with http function that exposes a http server in specific port."),(0,l.kt)("p",null,"In this Handler, you don't need to specific resolver and adapter, so you can use DummyAdapter and DummyResolver instead."),(0,l.kt)("p",null,"Signature:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class HttpHuaweiHandler<TApp> implements HandlerContract<TApp, void, void, void, void, Promise<void>> \n")),(0,l.kt)("p",null,"Implements: ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/Contracts/HandlerContract"},"HandlerContract")," ","<","TApp, void, void, void, void, Promise"),(0,l.kt)("h2",{id:"constructor"},"(constructor)"),(0,l.kt)("p",null,"Construtor padr\xe3o"),(0,l.kt)("p",null,"Signature:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"constructor(options?: HttpHuaweiHandlerOptions | undefined);\n")),(0,l.kt)("h3",{id:"parameters"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"options"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/Handlers/HttpHuaweiHandler/HttpHuaweiHandlerOptions"},"HttpHuaweiHandlerOptions")," ","|"," undefined"),(0,l.kt)("td",{parentName:"tr",align:null},"(Optional)")))),(0,l.kt)("h2",{id:"method-createhttpserver"},"(method) createHttpServer"),(0,l.kt)("p",null,"The method that creates the instance of http server"),(0,l.kt)("p",null,"Signature:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"protected createHttpServer(requestListener: RequestListener): http.Server;\n")),(0,l.kt)("h3",{id:"parameters-1"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"requestListener"),(0,l.kt)("td",{parentName:"tr",align:null},"RequestListener"),(0,l.kt)("td",{parentName:"tr",align:null},"O m\xe9todo que lidar\xe1 com as requisi\xe7\xf5es recebidas")))),(0,l.kt)("p",null,"Returns:"),(0,l.kt)("p",null,"http.Server"),(0,l.kt)("h2",{id:"method-gethandler"},"(method) getHandler"),(0,l.kt)("p",null,"Signature:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"getHandler(app: TApp, framework: FrameworkContract<TApp>, _: AdapterContract<void, void, void>[], __: ResolverContract<void, void, void, void, void>, binarySettings: BinarySettings, respondWithErrors: boolean, log: ILogger): ServerlessHandler<Promise<void>>;\n")),(0,l.kt)("h3",{id:"parameters-2"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"app"),(0,l.kt)("td",{parentName:"tr",align:null},"TApp"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"framework"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/Contracts/FrameworkContract"},"FrameworkContract")," ","<","TApp",">"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"_"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")," ","<","void, void, void",">","[","]"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"_","_"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/Contracts/ResolverContract"},"ResolverContract")," ","<","void, void, void, void, void",">"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"binarySettings"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/Types/BinarySettings"},"BinarySettings")),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"respondWithErrors"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"log"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,l.kt)("td",{parentName:"tr",align:null})))),(0,l.kt)("p",null,"Returns:"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/docs/api/Contracts/HandlerContract/ServerlessHandler"},"ServerlessHandler")," ","<","Promise","<","void",">",">"),(0,l.kt)("h2",{id:"property-options"},"(property) options"),(0,l.kt)("p",null,"Signature:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly options?: HttpHuaweiHandlerOptions | undefined;\n")))}m.isMDXComponent=!0}}]);