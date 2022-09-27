"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8187],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>u});var o=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=o.createContext({}),i=function(e){var r=o.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},c=function(e){var r=i(e.components);return o.createElement(p.Provider,{value:r},e.children)},m={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},v=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),v=i(t),u=n,d=v["".concat(p,".").concat(u)]||v[u]||m[u]||a;return t?o.createElement(d,s(s({ref:r},c),{},{components:t})):o.createElement(d,s({ref:r},c))}));function u(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,s=new Array(a);s[0]=v;var l={};for(var p in r)hasOwnProperty.call(r,p)&&(l[p]=r[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,s[1]=l;for(var i=2;i<a;i++)s[i]=t[i];return o.createElement.apply(null,s)}return o.createElement.apply(null,t)}v.displayName="MDXCreateElement"},1427:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>i});var o=t(7462),n=(t(7294),t(3905));const a={},s=void 0,l={unversionedId:"api/Resolvers/PromiseResolver/PromiseResolver",id:"api/Resolvers/PromiseResolver/PromiseResolver",title:"PromiseResolver",description:"@h4ad/serverless-adapter &gt; PromiseResolver",source:"@site/docs/api/Resolvers/PromiseResolver/PromiseResolver.md",sourceDirName:"api/Resolvers/PromiseResolver",slug:"/api/Resolvers/PromiseResolver/",permalink:"/docs/api/Resolvers/PromiseResolver/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Resolvers/PromiseResolver/PromiseResolver.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"DummyResolver",permalink:"/docs/api/Resolvers/DummyResolver/"},next:{title:"ServerlessAdapter",permalink:"/docs/api/ServerlessAdapter/"}},p={},i=[{value:"(class) PromiseResolver",id:"class-promiseresolver",level:2},{value:"(method) createResolver",id:"method-createresolver",level:2},{value:"Parameters",id:"parameters",level:3}],c={toc:i};function m(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Resolvers/PromiseResolver"},"PromiseResolver")),(0,n.kt)("h2",{id:"class-promiseresolver"},"(class) PromiseResolver"),(0,n.kt)("p",null,"The class that implements the resolver using the promise object sent by this library"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class PromiseResolver<TEvent, TContext, TCallback, TResponse, TReturn> implements ResolverContract<TEvent, TContext, TCallback, TResponse, Promise<any>> \n")),(0,n.kt)("p",null,"Implements: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/ResolverContract"},"ResolverContract")," ","<","TEvent, TContext, TCallback, TResponse, Promise"),(0,n.kt)("h2",{id:"method-createresolver"},"(method) createResolver"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"createResolver({ event, log, respondWithErrors, adapter, }: ResolverProps<TEvent, TContext, TCallback, TResponse>): Resolver<TResponse, Promise<TReturn>>;\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"{ event, log, respondWithErrors, adapter, }"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/ResolverContract/ResolverProps"},"ResolverProps")," ","<","TEvent, TContext, TCallback, TResponse",">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/ResolverContract/Resolver"},"Resolver")," ","<","TResponse, Promise","<","TReturn",">",">"))}m.isMDXComponent=!0}}]);