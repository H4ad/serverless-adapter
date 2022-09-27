"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8150],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(r),d=a,f=m["".concat(i,".").concat(d)]||m[d]||u[d]||s;return r?n.createElement(f,o(o({ref:t},c),{},{components:r})):n.createElement(f,o({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<s;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5162:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(7294),a=r(6010);const s="tabItem_Ymn6";function o(e){let{children:t,hidden:r,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(s,o),hidden:r},t)}},5488:(e,t,r)=>{r.d(t,{Z:()=>d});var n=r(7462),a=r(7294),s=r(6010),o=r(2389),l=r(7392),i=r(7094),p=r(2466);const c="tabList__CuJ",u="tabItem_LNqP";function m(e){var t,r;const{lazy:o,block:m,defaultValue:d,values:f,groupId:w,className:y}=e,b=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),h=null!=f?f:b.map((e=>{let{props:{value:t,label:r,attributes:n}}=e;return{value:t,label:r,attributes:n}})),v=(0,l.l)(h,((e,t)=>e.value===t.value));if(v.length>0)throw new Error('Docusaurus error: Duplicate values "'+v.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.');const k=null===d?d:null!=(t=null!=d?d:null==(r=b.find((e=>e.props.default)))?void 0:r.props.value)?t:b[0].props.value;if(null!==k&&!h.some((e=>e.value===k)))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+k+'" but none of its children has the corresponding value. Available values are: '+h.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");const{tabGroupChoices:g,setTabGroupChoices:N}=(0,i.U)(),[x,E]=(0,a.useState)(k),j=[],{blockElementScrollPositionUntilNextRender:A}=(0,p.o5)();if(null!=w){const e=g[w];null!=e&&e!==x&&h.some((t=>t.value===e))&&E(e)}const S=e=>{const t=e.currentTarget,r=j.indexOf(t),n=h[r].value;n!==x&&(A(t),E(n),null!=w&&N(w,String(n)))},T=e=>{var t;let r=null;switch(e.key){case"ArrowRight":{var n;const t=j.indexOf(e.currentTarget)+1;r=null!=(n=j[t])?n:j[0];break}case"ArrowLeft":{var a;const t=j.indexOf(e.currentTarget)-1;r=null!=(a=j[t])?a:j[j.length-1];break}}null==(t=r)||t.focus()};return a.createElement("div",{className:(0,s.Z)("tabs-container",c)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":m},y)},h.map((e=>{let{value:t,label:r,attributes:o}=e;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:x===t?0:-1,"aria-selected":x===t,key:t,ref:e=>j.push(e),onKeyDown:T,onFocus:S,onClick:S},o,{className:(0,s.Z)("tabs__item",u,null==o?void 0:o.className,{"tabs__item--active":x===t})}),null!=r?r:t)}))),o?(0,a.cloneElement)(b.filter((e=>e.props.value===x))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==x})))))}function d(e){const t=(0,o.Z)();return a.createElement(m,(0,n.Z)({key:String(t)},e))}},1007:(e,t,r)=>{r.d(t,{Z:()=>d});var n=r(6010),a=r(7294);const s="browserWindow_my1Q",o="browserWindowHeader_jXSR",l="buttons_uHc7",i="browserWindowAddressBar_Pd8y",p="dot_giz1",c="browserWindowMenuIcon_Vhuh",u="bar_rrRL",m="browserWindowBody_Idgs";function d(e){let{children:t,minHeight:r,url:d="http://localhost:3000"}=e;return a.createElement("div",{className:s,style:{minHeight:r}},a.createElement("div",{className:o},a.createElement("div",{className:l},a.createElement("span",{className:p,style:{background:"#f25f58"}}),a.createElement("span",{className:p,style:{background:"#fbbe3c"}}),a.createElement("span",{className:p,style:{background:"#58cb42"}})),a.createElement("div",{className:(0,n.Z)(i,"text--truncate")},a.createElement("a",{href:d,target:"_blank",rel:"noopener"},d)),a.createElement("div",{className:c},a.createElement("div",null,a.createElement("span",{className:u}),a.createElement("span",{className:u}),a.createElement("span",{className:u})))),a.createElement("div",{className:m},t))}},8281:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>p,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>m});var n=r(7462),a=(r(7294),r(3905)),s=r(1007),o=r(5162),l=r(5488);const i={title:"NestJS",description:"See more about how to integrate with NestJS."},p=void 0,c={unversionedId:"main/frameworks/nestjs",id:"main/frameworks/nestjs",title:"NestJS",description:"See more about how to integrate with NestJS.",source:"@site/docs/main/frameworks/nestjs.mdx",sourceDirName:"main/frameworks",slug:"/main/frameworks/nestjs",permalink:"/docs/main/frameworks/nestjs",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/frameworks/nestjs.mdx",tags:[],version:"current",frontMatter:{title:"NestJS",description:"See more about how to integrate with NestJS."},sidebar:"main",previous:{title:"Lazy",permalink:"/docs/main/frameworks/lazy"},next:{title:"tRPC",permalink:"/docs/main/frameworks/trpc"}},u={},m=[],d={toc:m};function f(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Accords NestJS docs:"),(0,a.kt)(s.Z,{url:"https://docs.nestjs.com/first-steps#platform",mdxType:"BrowserWindow"},(0,a.kt)("p",null,"There are two HTTP platforms supported out-of-the-box: ",(0,a.kt)("inlineCode",{parentName:"p"},"express")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"fastify"),". You can choose the one that best suits your needs."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"platform-express: ",(0,a.kt)("inlineCode",{parentName:"li"},"Express")," is a well-known minimalist web framework for node. It's a battle tested, production-ready library with lots of resources implemented by the community. The ",(0,a.kt)("inlineCode",{parentName:"li"},"@nestjs/platform-express")," package is used by default. Many users are well served with Express, and need take no action to enable it."),(0,a.kt)("li",{parentName:"ul"},"platform-fastify: ",(0,a.kt)("inlineCode",{parentName:"li"},"Fastify")," is a high performance and low overhead framework highly focused on providing maximum efficiency and speed. Read how to use it here.")),(0,a.kt)("p",null,"The NestJS is platform-agnostic, so we can choose which platform we will use. By default, I always use express but if in your company you use fastify, it's okay too.")),(0,a.kt)("p",null,"So, to add support to NestJS, we have two ways:"),(0,a.kt)(l.Z,{groupId:"framework-nestjs",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"nestjs-express",label:"Express",default:!0,mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="index.ts"',title:'"index.ts"'},"import { NestFactory } from '@nestjs/core';\nimport { ExpressAdapter } from '@nestjs/platform-express';\nimport { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';\nimport { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter());\n\n  // we need to wait until it initializes\n  await nestApp.init();\n\n  // then we get the instance of http adapter, it will be express\n  const app = nestApp.getHttpAdapter().getInstance();\n\n  return app;\n}\n\nconst expressFramework = new ExpressFramework();\n// the initialization of nestjs is asynchronous, so you can use the lazy framework.\nconst framework = new LazyFramework(expressFramework, bootstrap);\n\nexport const handler = ServerlessAdapter.new(null)\n  .setFramework(framework)\n  // continue to set the other options here.\n  //.setHandler(new DefaultHandler())\n  //.setResolver(new PromiseResolver())\n  //.addAdapter(new AlbAdapter())\n  //.addAdapter(new SQSAdapter())\n  //.addAdapter(new SNSAdapter())\n  // after put all methods necessary, just call the build method.\n  .build();\n"))),(0,a.kt)(o.Z,{value:"nestjs-fastify",label:"Fastify",default:!0,mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="index.ts"',title:'"index.ts"'},"import { NestFactory } from '@nestjs/core';\nimport { FastifyAdapter } from '@nestjs/platform-fastify';\nimport { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';\nimport { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const nestApp = await NestFactory.create(AppModule, new FastifyAdapter());\n\n  // we need to wait until it initializes\n  await nestApp.init();\n\n  // then we get the instance of http adapter, it will be fastify\n  const app = nestApp.getHttpAdapter().getInstance();\n\n  return app;\n}\n\nconst fastifyFramework = new FastifyFramework();\n// the initialization of nestjs is asynchronous, so you can use the lazy framework.\nconst framework = new LazyFramework(fastifyFramework, bootstrap);\n\nexport const handler = ServerlessAdapter.new(null)\n  .setFramework(framework)\n  // continue to set the other options here.\n  //.setHandler(new DefaultHandler())\n  //.setResolver(new PromiseResolver())\n  //.addAdapter(new AlbAdapter())\n  //.addAdapter(new SQSAdapter())\n  //.addAdapter(new SNSAdapter())\n  // after put all methods necessary, just call the build method.\n  .build();\n")))))}f.isMDXComponent=!0}}]);