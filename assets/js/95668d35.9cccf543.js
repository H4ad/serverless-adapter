"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6604],{3905:function(e,r,t){t.d(r,{Zo:function(){return s},kt:function(){return f}});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),g=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},s=function(e){var r=g(e.components);return n.createElement(c.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},u=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=g(t),f=o,d=u["".concat(c,".").concat(f)]||u[f]||l[f]||a;return t?n.createElement(d,p(p({ref:r},s),{},{components:t})):n.createElement(d,p({ref:r},s))}));function f(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=u;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,p[1]=i;for(var g=2;g<a;g++)p[g]=t[g];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},6484:function(e,r,t){t.r(r),t.d(r,{assets:function(){return s},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return i},metadata:function(){return g},toc:function(){return l}});var n=t(7462),o=t(3366),a=(t(7294),t(3905)),p=["components"],i={},c=void 0,g={unversionedId:"api/Core/Logger/LoggerOptions",id:"api/Core/Logger/LoggerOptions",title:"LoggerOptions",description:"@h4ad/serverless-adapter &gt; LoggerOptions",source:"@site/docs/api/Core/Logger/LoggerOptions.md",sourceDirName:"api/Core/Logger",slug:"/api/Core/Logger/LoggerOptions",permalink:"/docs/api/Core/Logger/LoggerOptions",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Core/Logger/LoggerOptions.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"LoggerFN",permalink:"/docs/api/Core/Logger/LoggerFN"},next:{title:"createDefaultLogger",permalink:"/docs/api/Core/Logger/createDefaultLogger"}},s={},l=[{value:"(type) LoggerOptions",id:"type-loggeroptions",level:2}],u={toc:l};function f(e){var r=e.components,t=(0,o.Z)(e,p);return(0,a.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/Core/Logger/LoggerOptions"},"LoggerOptions")),(0,a.kt)("h2",{id:"type-loggeroptions"},"(type) LoggerOptions"),(0,a.kt)("p",null,"The options to customize ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/Core/Logger/ILogger"},"ILogger")),(0,a.kt)("p",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type LoggerOptions = {\n    level: LogLevels;\n};\n")),(0,a.kt)("p",null,"References: ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/Core/Logger/LogLevels"},"LogLevels")))}f.isMDXComponent=!0}}]);