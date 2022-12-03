"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4790],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(n),d=a,m=u["".concat(s,".").concat(d)]||u[d]||y[d]||i;return n?r.createElement(m,o(o({ref:t},c),{},{components:n})):r.createElement(m,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3423:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>y,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const i={},o=void 0,p={unversionedId:"api/Core/isBinary/isContentTypeBinary",id:"api/Core/isBinary/isContentTypeBinary",title:"isContentTypeBinary",description:"@h4ad/serverless-adapter &gt; isContentTypeBinary",source:"@site/docs/api/Core/isBinary/isContentTypeBinary.md",sourceDirName:"api/Core/isBinary",slug:"/api/Core/isBinary/isContentTypeBinary",permalink:"/docs/api/Core/isBinary/isContentTypeBinary",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Core/isBinary/isContentTypeBinary.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"isContentEncodingBinary",permalink:"/docs/api/Core/isBinary/isContentEncodingBinary"},next:{title:"BaseBodyParserFramework",permalink:"/docs/api/Frameworks/BodyParserFramework/BaseBodyParserFramework"}},s={},l=[{value:"(function) isContentTypeBinary",id:"function-iscontenttypebinary",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Example",id:"example",level:2}],c={toc:l};function y(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/Core/isBinary/isContentTypeBinary"},"isContentTypeBinary")),(0,a.kt)("h2",{id:"function-iscontenttypebinary"},"(function) isContentTypeBinary"),(0,a.kt)("p",null,"The function that determines by the content type whether the response should be treated as binary"),(0,a.kt)("p",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare function isContentTypeBinary(headers: BothValueHeaders, binaryContentTypes: (string | RegExp)[]): boolean;\n")),(0,a.kt)("h3",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"headers"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/Types/BothValueHeaders"},"BothValueHeaders")),(0,a.kt)("td",{parentName:"tr",align:null},"The headers of the response")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"binaryContentTypes"),(0,a.kt)("td",{parentName:"tr",align:null},"(string ","|"," RegExp)","[","]"),(0,a.kt)("td",{parentName:"tr",align:null},"The list of content types that will be treated as binary")))),(0,a.kt)("p",null,"Returns:"),(0,a.kt)("p",null,"boolean"),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"const headers = { 'Content-Type': 'image/png' };\nconst isBinary = isContentTypeBinary(headers, [new RegExp('^image/.*$')]);\nconsole.log(isBinary);\n// true\n")))}y.isMDXComponent=!0}}]);