"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[836],{3905:(t,e,r)=>{r.d(e,{Zo:()=>d,kt:()=>m});var a=r(7294);function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function p(t,e){if(null==t)return{};var r,a,n=function(t,e){if(null==t)return{};var r,a,n={},l=Object.keys(t);for(a=0;a<l.length;a++)r=l[a],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)r=l[a],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var c=a.createContext({}),i=function(t){var e=a.useContext(c),r=e;return t&&(r="function"==typeof t?t(e):o(o({},e),t)),r},d=function(t){var e=i(t.components);return a.createElement(c.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(t,e){var r=t.components,n=t.mdxType,l=t.originalType,c=t.parentName,d=p(t,["components","mdxType","originalType","parentName"]),u=i(r),m=n,k=u["".concat(c,".").concat(m)]||u[m]||s[m]||l;return r?a.createElement(k,o(o({ref:e},d),{},{components:r})):a.createElement(k,o({ref:e},d))}));function m(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var l=r.length,o=new Array(l);o[0]=u;var p={};for(var c in e)hasOwnProperty.call(e,c)&&(p[c]=e[c]);p.originalType=t,p.mdxType="string"==typeof t?t:n,o[1]=p;for(var i=2;i<l;i++)o[i]=r[i];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},6157:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>s,frontMatter:()=>l,metadata:()=>p,toc:()=>i});var a=r(7462),n=(r(7294),r(3905));const l={},o=void 0,p={unversionedId:"api/Contracts/HandlerContract/HandlerContract",id:"api/Contracts/HandlerContract/HandlerContract",title:"HandlerContract",description:"@h4ad/serverless-adapter &gt; HandlerContract",source:"@site/docs/api/Contracts/HandlerContract/HandlerContract.md",sourceDirName:"api/Contracts/HandlerContract",slug:"/api/Contracts/HandlerContract/",permalink:"/docs/api/Contracts/HandlerContract/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Contracts/HandlerContract/HandlerContract.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"FrameworkContract",permalink:"/docs/api/Contracts/FrameworkContract"},next:{title:"ServerlessHandler",permalink:"/docs/api/Contracts/HandlerContract/ServerlessHandler"}},c={},i=[{value:"(interface) HandlerContract",id:"interface-handlercontract",level:2},{value:"(method) getHandler",id:"method-gethandler",level:2},{value:"Parameters",id:"parameters",level:3}],d={toc:i};function s(t){let{components:e,...r}=t;return(0,n.kt)("wrapper",(0,a.Z)({},d,r,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/HandlerContract"},"HandlerContract")),(0,n.kt)("h2",{id:"interface-handlercontract"},"(interface) HandlerContract"),(0,n.kt)("p",null,"The interface that represents the contract between the handler and the real implementation"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface HandlerContract<TApp, TEvent, TContext, TCallback, TResponse, TReturn> \n")),(0,n.kt)("h2",{id:"method-gethandler"},"(method) getHandler"),(0,n.kt)("p",null,"Get the handler that will handle serverless requests"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getHandler(app: TApp, framework: FrameworkContract<TApp>, adapters: AdapterContract<TEvent, TContext, TResponse>[], resolverFactory: ResolverContract<TEvent, TContext, TCallback, TResponse, TReturn>, binarySettings: BinarySettings, respondWithErrors: boolean, log: ILogger): ServerlessHandler<TReturn>;\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"app"),(0,n.kt)("td",{parentName:"tr",align:null},"TApp"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"framework"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/FrameworkContract"},"FrameworkContract")," ","<","TApp",">"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"adapters"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")," ","<","TEvent, TContext, TResponse",">","[","]"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"resolverFactory"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/ResolverContract"},"ResolverContract")," ","<","TEvent, TContext, TCallback, TResponse, TReturn",">"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"binarySettings"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Types/BinarySettings"},"BinarySettings")),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"respondWithErrors"),(0,n.kt)("td",{parentName:"tr",align:null},"boolean"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"log"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/HandlerContract/ServerlessHandler"},"ServerlessHandler")," ","<","TReturn",">"))}s.isMDXComponent=!0}}]);