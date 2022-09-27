"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6604],{3905:(e,r,t)=>{t.d(r,{Zo:()=>s,kt:()=>f});var o=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var g=o.createContext({}),c=function(e){var r=o.useContext(g),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},s=function(e){var r=c(e.components);return o.createElement(g.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},u=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,g=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=c(t),f=n,d=u["".concat(g,".").concat(f)]||u[f]||l[f]||a;return t?o.createElement(d,p(p({ref:r},s),{},{components:t})):o.createElement(d,p({ref:r},s))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,p=new Array(a);p[0]=u;var i={};for(var g in r)hasOwnProperty.call(r,g)&&(i[g]=r[g]);i.originalType=e,i.mdxType="string"==typeof e?e:n,p[1]=i;for(var c=2;c<a;c++)p[c]=t[c];return o.createElement.apply(null,p)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},6484:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>g,contentTitle:()=>p,default:()=>l,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var o=t(7462),n=(t(7294),t(3905));const a={},p=void 0,i={unversionedId:"api/Core/Logger/LoggerOptions",id:"api/Core/Logger/LoggerOptions",title:"LoggerOptions",description:"@h4ad/serverless-adapter &gt; LoggerOptions",source:"@site/docs/api/Core/Logger/LoggerOptions.md",sourceDirName:"api/Core/Logger",slug:"/api/Core/Logger/LoggerOptions",permalink:"/docs/api/Core/Logger/LoggerOptions",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Core/Logger/LoggerOptions.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"LoggerFN",permalink:"/docs/api/Core/Logger/LoggerFN"},next:{title:"createDefaultLogger",permalink:"/docs/api/Core/Logger/createDefaultLogger"}},g={},c=[{value:"(type) LoggerOptions",id:"type-loggeroptions",level:2}],s={toc:c};function l(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,o.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Core/Logger/LoggerOptions"},"LoggerOptions")),(0,n.kt)("h2",{id:"type-loggeroptions"},"(type) LoggerOptions"),(0,n.kt)("p",null,"The options to customize ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type LoggerOptions = {\n    level: LogLevels;\n};\n")),(0,n.kt)("p",null,"References: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Core/Logger/LogLevels"},"LogLevels")))}l.isMDXComponent=!0}}]);