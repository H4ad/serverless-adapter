"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5959],{3905:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>v});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},i=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),u=p(r),v=o,f=u["".concat(c,".").concat(v)]||u[v]||d[v]||a;return r?n.createElement(f,l(l({ref:t},i),{},{components:r})):n.createElement(f,l({ref:t},i))}));function v(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,l[1]=s;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},8173:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={},l=void 0,s={unversionedId:"api/Contracts/ResolverContract/DelegatedResolver",id:"api/Contracts/ResolverContract/DelegatedResolver",title:"DelegatedResolver",description:"@h4ad/serverless-adapter &gt; DelegatedResolver",source:"@site/docs/api/Contracts/ResolverContract/DelegatedResolver.md",sourceDirName:"api/Contracts/ResolverContract",slug:"/api/Contracts/ResolverContract/DelegatedResolver",permalink:"/docs/api/Contracts/ResolverContract/DelegatedResolver",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Contracts/ResolverContract/DelegatedResolver.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"ResolverContract",permalink:"/docs/api/Contracts/ResolverContract/"},next:{title:"Resolver",permalink:"/docs/api/Contracts/ResolverContract/Resolver"}},c={},p=[{value:"(type) DelegatedResolver",id:"type-delegatedresolver",level:2}],i={toc:p};function d(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Contracts/ResolverContract/DelegatedResolver"},"DelegatedResolver")),(0,o.kt)("h2",{id:"type-delegatedresolver"},"(type) DelegatedResolver"),(0,o.kt)("p",null,"The type that represents a delegate resolver that is passed to the adapter to handle what to do when an error occurs during forwarding."),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type DelegatedResolver<TResponse> = {\n    succeed: (response: TResponse) => void;\n    fail: (error: Error) => void;\n};\n")))}d.isMDXComponent=!0}}]);