"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6229],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>k});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},v=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=s(r),v=a,k=c["".concat(u,".").concat(v)]||c[v]||d[v]||o;return r?n.createElement(k,l(l({ref:t},p),{},{components:r})):n.createElement(k,l({ref:t},p))}));function k(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=v;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[c]="string"==typeof e?e:a,l[1]=i;for(var s=2;s<o;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}v.displayName="MDXCreateElement"},6634:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={},l=void 0,i={unversionedId:"api/Core/Current Invoke/setCurrentInvoke",id:"api/Core/Current Invoke/setCurrentInvoke",title:"setCurrentInvoke",description:"@h4ad/serverless-adapter &gt; setCurrentInvoke",source:"@site/docs/api/Core/Current Invoke/setCurrentInvoke.md",sourceDirName:"api/Core/Current Invoke",slug:"/api/Core/Current Invoke/setCurrentInvoke",permalink:"/docs/api/Core/Current Invoke/setCurrentInvoke",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Core/Current Invoke/setCurrentInvoke.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"getCurrentInvoke",permalink:"/docs/api/Core/Current Invoke/getCurrentInvoke"},next:{title:"FlattenedHeadersAndCookies",permalink:"/docs/api/Core/Headers/FlattenedHeadersAndCookies"}},u={},s=[{value:"(function) setCurrentInvoke",id:"function-setcurrentinvoke",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Remarks",id:"remarks",level:2}],p={toc:s},c="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(c,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/Core/Current%20Invoke/setCurrentInvoke"},"setCurrentInvoke")),(0,a.kt)("h2",{id:"function-setcurrentinvoke"},"(function) setCurrentInvoke"),(0,a.kt)("p",null,"Method that saves to the event created by the serverless trigger or context created by the serverless environment."),(0,a.kt)("p",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare function setCurrentInvoke<TEvent = any, TContext = any>({ event, context, }: CurrentInvoke<TEvent, TContext>): void;\n")),(0,a.kt)("h3",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"{ event, context, }"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/Core/Current%20Invoke/CurrentInvoke"},"CurrentInvoke")," ","<","TEvent, TContext",">"),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("p",null,"Returns:"),(0,a.kt)("p",null,"void"),(0,a.kt)("h2",{id:"remarks"},"Remarks"),(0,a.kt)("p",null,"This method MUST NOT be called by you, this method MUST only be used internally in this library."))}d.isMDXComponent=!0}}]);