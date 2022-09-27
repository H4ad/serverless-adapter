"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4670],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>c});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),l=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},m=function(e){var t=l(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=l(r),c=n,f=u["".concat(p,".").concat(c)]||u[c]||d[c]||o;return r?a.createElement(f,s(s({ref:t},m),{},{components:r})):a.createElement(f,s({ref:t},m))}));function c(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},5108:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=r(7462),n=(r(7294),r(3905));const o={title:"Usage",position:2,description:"See more about how to use this library."},s=void 0,i={unversionedId:"main/getting-started/usage",id:"main/getting-started/usage",title:"Usage",description:"See more about how to use this library.",source:"@site/docs/main/getting-started/usage.mdx",sourceDirName:"main/getting-started",slug:"/main/getting-started/usage",permalink:"/docs/main/getting-started/usage",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/getting-started/usage.mdx",tags:[],version:"current",frontMatter:{title:"Usage",position:2,description:"See more about how to use this library."},sidebar:"main",previous:{title:"Installation",permalink:"/docs/main/getting-started/installation"},next:{title:"Customizing",permalink:"/docs/main/getting-started/customizing"}},p={},l=[],m={toc:l};function d(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"To start to use, first you need to know what you need to import, let's start showing the ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/ServerlessAdapter"},"ServerlessAdapter"),"."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\n")),(0,n.kt)("p",null,"We need to pass to ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/ServerlessAdapter"},"Serverless Adapter")," the instance of your api, let's look an example with:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Framework: ",(0,n.kt)("a",{parentName:"li",href:"../frameworks/express"},"Express"),"."),(0,n.kt)("li",{parentName:"ul"},"Adapters: ",(0,n.kt)("a",{parentName:"li",href:"../adapters/aws/api-gateway-v2"},"AWS Api Gateway V2 Adapter"),"."),(0,n.kt)("li",{parentName:"ul"},"Handler: ",(0,n.kt)("a",{parentName:"li",href:"../handlers/default"},"Default Handler"),"."),(0,n.kt)("li",{parentName:"ul"},"Resolver: ",(0,n.kt)("a",{parentName:"li",href:"../resolvers/promise"},"Promise Resolver"),".")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\nimport { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';\nimport { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';\nimport { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';\nimport { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';\n\nconst express = require('express');\n\nconst app = express();\nexport const handler = ServerlessAdapter.new(app)\n  .setFramework(new ExpressFramework())\n  .setHandler(new DefaultHandler())\n  .setResolver(new PromiseResolver())\n  .addAdapter(new ApiGatewayV2Adapter())\n  // if you need more adapters\n  // just append more `addAdapter` calls\n  .build();\n")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"To know more about the frameworks that you can use, see ",(0,n.kt)("a",{parentName:"p",href:"../../category/frameworks"},"Frameworks Section"),".")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"To know more about the handlers that you can use, see ",(0,n.kt)("a",{parentName:"p",href:"../../category/handlers"},"Handlers Section"),".")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"To know more about the resolvers that you can use, see ",(0,n.kt)("a",{parentName:"p",href:"../../category/resolvers"},"Resolvers Section"),".")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"To know more about the adapters that you can use, see ",(0,n.kt)("a",{parentName:"p",href:"../../category/adapters"},"Adapters Section"),".")))}d.isMDXComponent=!0}}]);