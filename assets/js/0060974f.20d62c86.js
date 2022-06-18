"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[379],{3905:function(e,t,r){r.d(t,{Zo:function(){return m},kt:function(){return f}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),p=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},m=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=p(r),f=n,k=u["".concat(l,".").concat(f)]||u[f]||c[f]||o;return r?a.createElement(k,s(s({ref:t},m),{},{components:r})):a.createElement(k,s({ref:t},m))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var p=2;p<o;p++)s[p]=r[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},5773:function(e,t,r){r.r(t),r.d(t,{assets:function(){return m},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return i},metadata:function(){return p},toc:function(){return c}});var a=r(7462),n=r(3366),o=(r(7294),r(3905)),s=["components"],i={},l=void 0,p={unversionedId:"api/Frameworks/FastifyFramework/FastifyFramework",id:"api/Frameworks/FastifyFramework/FastifyFramework",title:"FastifyFramework",description:"@h4ad/serverless-adapter &gt; FastifyFramework",source:"@site/docs/api/Frameworks/FastifyFramework/FastifyFramework.md",sourceDirName:"api/Frameworks/FastifyFramework",slug:"/api/Frameworks/FastifyFramework/",permalink:"/docs/api/Frameworks/FastifyFramework/",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Frameworks/FastifyFramework/FastifyFramework.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"ExpressFramework",permalink:"/docs/api/Frameworks/ExpressFramework/"},next:{title:"HapiFramework",permalink:"/docs/api/Frameworks/HapiFramework/"}},m={},c=[{value:"(class) FastifyFramework",id:"class-fastifyframework",level:2},{value:"(method) sendRequest",id:"method-sendrequest",level:2},{value:"Parameters",id:"parameters",level:3}],u={toc:c};function f(e){var t=e.components,r=(0,n.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/FastifyFramework"},"FastifyFramework")),(0,o.kt)("h2",{id:"class-fastifyframework"},"(class) FastifyFramework"),(0,o.kt)("p",null,"The framework that forwards requests to fastify handler"),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class FastifyFramework implements FrameworkContract<FastifyInstance> \n")),(0,o.kt)("p",null,"Implements: ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Contracts/FrameworkContract"},"FrameworkContract")," ","<","FastifyInstance"),(0,o.kt)("h2",{id:"method-sendrequest"},"(method) sendRequest"),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"sendRequest(app: FastifyInstance, request: IncomingMessage, response: ServerResponse): void;\n")),(0,o.kt)("h3",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"app"),(0,o.kt)("td",{parentName:"tr",align:null},"FastifyInstance"),(0,o.kt)("td",{parentName:"tr",align:null})),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"request"),(0,o.kt)("td",{parentName:"tr",align:null},"IncomingMessage"),(0,o.kt)("td",{parentName:"tr",align:null})),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"response"),(0,o.kt)("td",{parentName:"tr",align:null},"ServerResponse"),(0,o.kt)("td",{parentName:"tr",align:null})))),(0,o.kt)("p",null,"Returns:"),(0,o.kt)("p",null,"void"))}f.isMDXComponent=!0}}]);