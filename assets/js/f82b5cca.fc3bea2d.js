"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4598],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>c});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=p(r),c=a,h=m["".concat(l,".").concat(c)]||m[c]||d[c]||o;return r?n.createElement(h,s(s({ref:t},u),{},{components:r})):n.createElement(h,s({ref:t},u))}));function c(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=r[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},172:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={title:"Firebase",description:"See more about how to integrate with Firebase Functions."},s=void 0,i={unversionedId:"main/handlers/firebase",id:"main/handlers/firebase",title:"Firebase",description:"See more about how to integrate with Firebase Functions.",source:"@site/docs/main/handlers/firebase.mdx",sourceDirName:"main/handlers",slug:"/main/handlers/firebase",permalink:"/docs/main/handlers/firebase",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/handlers/firebase.mdx",tags:[],version:"current",frontMatter:{title:"Firebase",description:"See more about how to integrate with Firebase Functions."},sidebar:"main",previous:{title:"Digital Ocean",permalink:"/docs/main/handlers/digital-ocean"},next:{title:"Google Cloud Functions",permalink:"/docs/main/handlers/gcp"}},l={},p=[{value:"Requirements",id:"requirements",level:2},{value:"Integrating with Http Events",id:"integrating-with-http-events",level:2},{value:"What about Cron, Pub/Sub, etc?",id:"what-about-cron-pubsub-etc",level:2},{value:"Examples",id:"examples",level:2}],u={toc:p};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Don't know what a handler is? See the ",(0,a.kt)("a",{parentName:"p",href:"../architecture#handler"},"Architecture")," section.")),(0,a.kt)("h2",{id:"requirements"},"Requirements"),(0,a.kt)("p",null,"First, install the types for this adapter:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm i --save firebase-functions firebase-admin\n")),(0,a.kt)("h2",{id:"integrating-with-http-events"},"Integrating with Http Events"),(0,a.kt)("p",null,"To use, you can import ",(0,a.kt)("a",{parentName:"p",href:"../../api/Handlers/HttpFirebaseHandler"},"HttpFirebaseHandler")," and call the method ",(0,a.kt)("a",{parentName:"p",href:"../../api/ServerlessAdapter#method-sethandler"},"setHandler"),", as per the code below:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="index.ts"',title:'"index.ts"'},"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\nimport { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';\nimport { HttpFirebaseHandler } from '@h4ad/serverless-adapter/lib/handlers/firebase';\nimport { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';\nimport app from './app';\n\nexport const helloWorld = ServerlessAdapter.new(app)\n  .setHandler(new HttpFirebaseHandler())\n  .setResolver(new DummyResolver())\n  // choose the framework of your app\n  // .setFramework(new ExpressFramework())\n  .addAdapter(new DummyAdapter())\n  .build();\n\n// you can export more than one if you want\nexport const test = ServerlessAdapter.new(app)\n  .setHandler(new HttpFirebaseHandler())\n  .setResolver(new DummyResolver())\n  // choose the framework of your app\n  // .setFramework(new ExpressFramework())\n  .addAdapter(new DummyAdapter())\n  .build();\n")),(0,a.kt)("admonition",{title:"About Resolver and Adapter",type:"info"},(0,a.kt)("p",{parentName:"admonition"},"You should use DummyResolver and DummyAdapter because it's a requirement for the library, but HttpFirebaseHandler doesn't do anything with them,\nso you use those dummy versions just to satisfy the library requirements.")),(0,a.kt)("h2",{id:"what-about-cron-pubsub-etc"},"What about Cron, Pub/Sub, etc?"),(0,a.kt)("p",null,"I could not think yet in an API to handle those cases well,\nso currently I didn't add support to these type of Firebase Functions."),(0,a.kt)("p",null,"If you have some idea about a design for those APIs, ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/H4ad/serverless-adapter/issues/new/choose"},"create an issue"),"."),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("p",null,"You can see examples of how to use ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/H4ad/serverless-adapter-examples"},"here"),"."))}d.isMDXComponent=!0}}]);