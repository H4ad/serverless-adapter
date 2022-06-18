"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3867],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),y=c(n),d=i,f=y["".concat(p,".").concat(d)]||y[d]||l[d]||a;return n?r.createElement(f,s(s({ref:t},u),{},{components:n})):r.createElement(f,s({ref:t},u))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,s=new Array(a);s[0]=y;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},5998:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return p},default:function(){return d},frontMatter:function(){return o},metadata:function(){return c},toc:function(){return l}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),s=["components"],o={},p=void 0,c={unversionedId:"api/Types/BinarySettings/BinarySettings",id:"api/Types/BinarySettings/BinarySettings",title:"BinarySettings",description:"@h4ad/serverless-adapter &gt; BinarySettings",source:"@site/docs/api/Types/BinarySettings/BinarySettings.md",sourceDirName:"api/Types/BinarySettings",slug:"/api/Types/BinarySettings/",permalink:"/docs/api/Types/BinarySettings/",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Types/BinarySettings/BinarySettings.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"ServerlessAdapter",permalink:"/docs/api/ServerlessAdapter/"},next:{title:"BinarySettingsContentHeaders",permalink:"/docs/api/Types/BinarySettings/BinarySettingsContentHeaders"}},u={},l=[{value:"(type) BinarySettings",id:"type-binarysettings",level:2},{value:"Remarks",id:"remarks",level:2}],y={toc:l};function d(e){var t=e.components,n=(0,i.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},y,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/Types/BinarySettings"},"BinarySettings")),(0,a.kt)("h2",{id:"type-binarysettings"},"(type) BinarySettings"),(0,a.kt)("p",null,"The interface representing the settings for whether the response should be treated as binary or not"),(0,a.kt)("p",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type BinarySettings = BinarySettingsFunction | BinarySettingsContentHeaders;\n")),(0,a.kt)("p",null,"References: ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/Types/BinarySettings/BinarySettingsFunction"},"BinarySettingsFunction")," , ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/Types/BinarySettings/BinarySettingsContentHeaders"},"BinarySettingsContentHeaders")),(0,a.kt)("h2",{id:"remarks"},"Remarks"),(0,a.kt)("p",null,"Encoded as binary means the response body will be converted to base64"))}d.isMDXComponent=!0}}]);