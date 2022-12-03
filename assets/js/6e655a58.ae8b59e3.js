"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1529],{3905:(e,r,t)=>{t.d(r,{Zo:()=>m,kt:()=>k});var a=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var i=a.createContext({}),s=function(e){var r=a.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},m=function(e){var r=s(e.components);return a.createElement(i.Provider,{value:r},e.children)},c={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),u=s(t),k=n,d=u["".concat(i,".").concat(k)]||u[k]||c[k]||o;return t?a.createElement(d,p(p({ref:r},m),{},{components:t})):a.createElement(d,p({ref:r},m))}));function k(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,p=new Array(o);p[0]=u;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,p[1]=l;for(var s=2;s<o;s++)p[s]=t[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},8910:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>p,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=t(7462),n=(t(7294),t(3905));const o={},p=void 0,l={unversionedId:"api/Frameworks/HapiFramework/HapiFramework",id:"api/Frameworks/HapiFramework/HapiFramework",title:"HapiFramework",description:"@h4ad/serverless-adapter &gt; HapiFramework",source:"@site/docs/api/Frameworks/HapiFramework/HapiFramework.md",sourceDirName:"api/Frameworks/HapiFramework",slug:"/api/Frameworks/HapiFramework/",permalink:"/docs/api/Frameworks/HapiFramework/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Frameworks/HapiFramework/HapiFramework.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"FastifyFramework",permalink:"/docs/api/Frameworks/FastifyFramework/"},next:{title:"HttpDeepkitFramework",permalink:"/docs/api/Frameworks/HttpDeepkitFramework/"}},i={},s=[{value:"(class) HapiFramework",id:"class-hapiframework",level:2},{value:"(method) sendRequest",id:"method-sendrequest",level:2},{value:"Parameters",id:"parameters",level:3}],m={toc:s};function c(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},m,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/HapiFramework"},"HapiFramework")),(0,n.kt)("h2",{id:"class-hapiframework"},"(class) HapiFramework"),(0,n.kt)("p",null,"The framework that forwards requests to hapi handler"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class HapiFramework implements FrameworkContract<Server> \n")),(0,n.kt)("p",null,"Implements: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/FrameworkContract"},"FrameworkContract")," ","<","Server"),(0,n.kt)("h2",{id:"method-sendrequest"},"(method) sendRequest"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"sendRequest(app: Server, request: IncomingMessage, response: ServerResponse): void;\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"app"),(0,n.kt)("td",{parentName:"tr",align:null},"Server"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"request"),(0,n.kt)("td",{parentName:"tr",align:null},"IncomingMessage"),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"response"),(0,n.kt)("td",{parentName:"tr",align:null},"ServerResponse"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"void"))}c.isMDXComponent=!0}}]);