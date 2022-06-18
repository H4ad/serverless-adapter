"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7668],{3905:function(e,r,t){t.d(r,{Zo:function(){return p},kt:function(){return f}});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=n.createContext({}),i=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},p=function(e){var r=i(e.components);return n.createElement(s.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=i(t),f=a,v=d["".concat(s,".").concat(f)]||d[f]||u[f]||o;return t?n.createElement(v,l(l({ref:r},p),{},{components:t})):n.createElement(v,l({ref:r},p))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=d;var c={};for(var s in r)hasOwnProperty.call(r,s)&&(c[s]=r[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var i=2;i<o;i++)l[i]=t[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},7954:function(e,r,t){t.r(r),t.d(r,{assets:function(){return p},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return c},metadata:function(){return i},toc:function(){return u}});var n=t(7462),a=t(3366),o=(t(7294),t(3905)),l=["components"],c={},s=void 0,i={unversionedId:"api/Contracts/HandlerContract/ServerlessHandler",id:"api/Contracts/HandlerContract/ServerlessHandler",title:"ServerlessHandler",description:"@h4ad/serverless-adapter &gt; ServerlessHandler",source:"@site/docs/api/Contracts/HandlerContract/ServerlessHandler.md",sourceDirName:"api/Contracts/HandlerContract",slug:"/api/Contracts/HandlerContract/ServerlessHandler",permalink:"/docs/api/Contracts/HandlerContract/ServerlessHandler",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Contracts/HandlerContract/ServerlessHandler.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"HandlerContract",permalink:"/docs/api/Contracts/HandlerContract/"},next:{title:"ResolverContract",permalink:"/docs/api/Contracts/ResolverContract/"}},p={},u=[{value:"(type) ServerlessHandler",id:"type-serverlesshandler",level:2}],d={toc:u};function f(e){var r=e.components,t=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},d,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Contracts/HandlerContract/ServerlessHandler"},"ServerlessHandler")),(0,o.kt)("h2",{id:"type-serverlesshandler"},"(type) ServerlessHandler"),(0,o.kt)("p",null,"The function used to handle serverless requests"),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type ServerlessHandler<TReturn> = (...args: any[]) => TReturn;\n")))}f.isMDXComponent=!0}}]);