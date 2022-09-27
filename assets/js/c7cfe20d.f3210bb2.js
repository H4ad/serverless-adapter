"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2327],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),i=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=i(e.components);return n.createElement(p.Provider,{value:t},e.children)},v={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=i(r),d=o,m=u["".concat(p,".").concat(d)]||u[d]||v[d]||a;return r?n.createElement(m,s(s({ref:t},c),{},{components:r})):n.createElement(m,s({ref:t},c))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,s[1]=l;for(var i=2;i<a;i++)s[i]=r[i];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},7810:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>v,frontMatter:()=>a,metadata:()=>l,toc:()=>i});var n=r(7462),o=(r(7294),r(3905));const a={},s=void 0,l={unversionedId:"api/Resolvers/AwsContextResolver/AwsContextResolver",id:"api/Resolvers/AwsContextResolver/AwsContextResolver",title:"AwsContextResolver",description:"@h4ad/serverless-adapter &gt; AwsContextResolver",source:"@site/docs/api/Resolvers/AwsContextResolver/AwsContextResolver.md",sourceDirName:"api/Resolvers/AwsContextResolver",slug:"/api/Resolvers/AwsContextResolver/",permalink:"/docs/api/Resolvers/AwsContextResolver/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Resolvers/AwsContextResolver/AwsContextResolver.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"ServerlessResponseProps",permalink:"/docs/api/Network/ServerlessResponse/ServerlessResponseProps"},next:{title:"CallbackResolver",permalink:"/docs/api/Resolvers/CallbackResolver/"}},p={},i=[{value:"(class) AwsContextResolver",id:"class-awscontextresolver",level:2},{value:"Remarks",id:"remarks",level:2},{value:"(method) createResolver",id:"method-createresolver",level:2},{value:"Parameters",id:"parameters",level:3}],c={toc:i};function v(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Resolvers/AwsContextResolver"},"AwsContextResolver")),(0,o.kt)("h2",{id:"class-awscontextresolver"},"(class) AwsContextResolver"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Warning: This API is now obsolete."),(0,o.kt)("p",{parentName:"blockquote"},"From the AWS Documentation, describing the functions used in this resolver: Functions for compatibility with earlier Node.js Runtime v0.10.42. No longer documented, so they are deprecated, but they still work as of the 12.x runtime, so they are not removed from the types.")),(0,o.kt)("p",null,"The class that implements the resolver by using the AWS Context object."),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class AwsContextResolver<TEvent, TCallback, TResponse> implements ResolverContract<TEvent, Context, TCallback, TResponse, void> \n")),(0,o.kt)("p",null,"Implements: ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Contracts/ResolverContract"},"ResolverContract")," ","<","TEvent, Context"),(0,o.kt)("h2",{id:"remarks"},"Remarks"),(0,o.kt)("p",null,"To use this resolver, you MUST leave ",(0,o.kt)("inlineCode",{parentName:"p"},"{@link https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html | callbackWaitsForEmptyEventLoop}")," as true, otherwise, AWS will not wait for this resolver to resolve."),(0,o.kt)("h2",{id:"method-createresolver"},"(method) createResolver"),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"createResolver({ context, event, log, respondWithErrors, adapter, }: ResolverProps<any, Context, any, any>): Resolver<any, void>;\n")),(0,o.kt)("h3",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"{ context, event, log, respondWithErrors, adapter, }"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"/docs/api/Contracts/ResolverContract/ResolverProps"},"ResolverProps")," ","<","any, Context, any, any",">"),(0,o.kt)("td",{parentName:"tr",align:null})))),(0,o.kt)("p",null,"Returns:"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/Contracts/ResolverContract/Resolver"},"Resolver")," ","<","any, void",">"))}v.isMDXComponent=!0}}]);