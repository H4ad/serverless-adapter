"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7968],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),s=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},u=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(r),h=n,m=c["".concat(l,".").concat(h)]||c[h]||d[h]||i;return r?a.createElement(m,p(p({ref:t},u),{},{components:r})):a.createElement(m,p({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,p=new Array(i);p[0]=h;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[c]="string"==typeof e?e:n,p[1]=o;for(var s=2;s<i;s++)p[s]=r[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},1702:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var a=r(7462),n=(r(7294),r(3905));const i={},p=void 0,o={unversionedId:"api/Core/Path/buildStripBasePath",id:"api/Core/Path/buildStripBasePath",title:"buildStripBasePath",description:"@h4ad/serverless-adapter &gt; buildStripBasePath",source:"@site/docs/api/Core/Path/buildStripBasePath.md",sourceDirName:"api/Core/Path",slug:"/api/Core/Path/buildStripBasePath",permalink:"/docs/api/Core/Path/buildStripBasePath",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Core/Path/buildStripBasePath.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"StripBasePathFn",permalink:"/docs/api/Core/Path/StripBasePathFn"},next:{title:"getPathWithQueryStringParams",permalink:"/docs/api/Core/Path/getPathWithQueryStringParams"}},l={},s=[{value:"(function) buildStripBasePath",id:"function-buildstripbasepath",level:2},{value:"Parameters",id:"parameters",level:3}],u={toc:s},c="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Core/Path/buildStripBasePath"},"buildStripBasePath")),(0,n.kt)("h2",{id:"function-buildstripbasepath"},"(function) buildStripBasePath"),(0,n.kt)("p",null,"Get the strip base path function"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare function buildStripBasePath(basePath: string | undefined): StripBasePathFn;\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"basePath"),(0,n.kt)("td",{parentName:"tr",align:null},"string ","|"," undefined"),(0,n.kt)("td",{parentName:"tr",align:null},"The base path")))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Core/Path/StripBasePathFn"},"StripBasePathFn")))}d.isMDXComponent=!0}}]);