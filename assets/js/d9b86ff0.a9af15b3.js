"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[642],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>f});var a=r(7294);function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){p(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,p=function(e,t){if(null==e)return{};var r,a,p={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(p[r]=e[r]);return p}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(p[r]=e[r])}return p}var s=a.createContext({}),d=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,p=e.mdxType,n=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=d(r),f=p,m=u["".concat(s,".").concat(f)]||u[f]||c[f]||n;return r?a.createElement(m,o(o({ref:t},l),{},{components:r})):a.createElement(m,o({ref:t},l))}));function f(e,t){var r=arguments,p=t&&t.mdxType;if("string"==typeof e||p){var n=r.length,o=new Array(n);o[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:p,o[1]=i;for(var d=2;d<n;d++)o[d]=r[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},3705:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>n,metadata:()=>i,toc:()=>d});var a=r(7462),p=(r(7294),r(3905));const n={},o=void 0,i={unversionedId:"api/Adapters/AWS/S3Adapter/S3AdapterOptions",id:"api/Adapters/AWS/S3Adapter/S3AdapterOptions",title:"S3AdapterOptions",description:"@h4ad/serverless-adapter &gt; S3AdapterOptions",source:"@site/docs/api/Adapters/AWS/S3Adapter/S3AdapterOptions.md",sourceDirName:"api/Adapters/AWS/S3Adapter",slug:"/api/Adapters/AWS/S3Adapter/S3AdapterOptions",permalink:"/docs/api/Adapters/AWS/S3Adapter/S3AdapterOptions",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/S3Adapter/S3AdapterOptions.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"S3Adapter",permalink:"/docs/api/Adapters/AWS/S3Adapter/"},next:{title:"SNSAdapter",permalink:"/docs/api/Adapters/AWS/SNSAdapter/"}},s={},d=[{value:"(interface) S3AdapterOptions",id:"interface-s3adapteroptions",level:2},{value:"(property) s3ForwardMethod",id:"property-s3forwardmethod",level:2},{value:"(property) s3ForwardPath",id:"property-s3forwardpath",level:2}],l={toc:d};function c(e){let{components:t,...r}=e;return(0,p.kt)("wrapper",(0,a.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,p.kt)("p",null,(0,p.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,p.kt)("a",{parentName:"p",href:"/docs/api/Adapters/AWS/S3Adapter/S3AdapterOptions"},"S3AdapterOptions")),(0,p.kt)("h2",{id:"interface-s3adapteroptions"},"(interface) S3AdapterOptions"),(0,p.kt)("p",null,"The options to customize the ",(0,p.kt)("a",{parentName:"p",href:"/docs/api/Adapters/AWS/S3Adapter"},"S3Adapter")),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface S3AdapterOptions \n")),(0,p.kt)("h2",{id:"property-s3forwardmethod"},"(property) s3ForwardMethod"),(0,p.kt)("p",null,"The http method that will be used to create a request to be forwarded to the framework."),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"s3ForwardMethod?: string;\n")),(0,p.kt)("h2",{id:"property-s3forwardpath"},"(property) s3ForwardPath"),(0,p.kt)("p",null,"The path that will be used to create a request to be forwarded to the framework."),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"s3ForwardPath?: string;\n")))}c.isMDXComponent=!0}}]);