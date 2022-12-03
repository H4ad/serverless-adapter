"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8150],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>u});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},s=Object.keys(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),p=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,s=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(r),u=n,f=d["".concat(i,".").concat(u)]||d[u]||m[u]||s;return r?a.createElement(f,o(o({ref:t},c),{},{components:r})):a.createElement(f,o({ref:t},c))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=r.length,o=new Array(s);o[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var p=2;p<s;p++)o[p]=r[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5162:(e,t,r)=>{r.d(t,{Z:()=>o});var a=r(7294),n=r(6010);const s="tabItem_Ymn6";function o(e){let{children:t,hidden:r,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,n.Z)(s,o),hidden:r},t)}},5488:(e,t,r)=>{r.d(t,{Z:()=>u});var a=r(7462),n=r(7294),s=r(6010),o=r(2389),l=r(7392),i=r(7094),p=r(2466);const c="tabList__CuJ",m="tabItem_LNqP";function d(e){var t;const{lazy:r,block:o,defaultValue:d,values:u,groupId:f,className:w}=e,h=n.Children.map(e.children,(e=>{if((0,n.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),y=u??h.map((e=>{let{props:{value:t,label:r,attributes:a}}=e;return{value:t,label:r,attributes:a}})),b=(0,l.l)(y,((e,t)=>e.value===t.value));if(b.length>0)throw new Error(`Docusaurus error: Duplicate values "${b.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const k=null===d?d:d??(null==(t=h.find((e=>e.props.default)))?void 0:t.props.value)??h[0].props.value;if(null!==k&&!y.some((e=>e.value===k)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${k}" but none of its children has the corresponding value. Available values are: ${y.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:v,setTabGroupChoices:g}=(0,i.U)(),[N,x]=(0,n.useState)(k),E=[],{blockElementScrollPositionUntilNextRender:j}=(0,p.o5)();if(null!=f){const e=v[f];null!=e&&e!==N&&y.some((t=>t.value===e))&&x(e)}const A=e=>{const t=e.currentTarget,r=E.indexOf(t),a=y[r].value;a!==N&&(j(t),x(a),null!=f&&g(f,String(a)))},S=e=>{var t;let r=null;switch(e.key){case"Enter":A(e);break;case"ArrowRight":{const t=E.indexOf(e.currentTarget)+1;r=E[t]??E[0];break}case"ArrowLeft":{const t=E.indexOf(e.currentTarget)-1;r=E[t]??E[E.length-1];break}}null==(t=r)||t.focus()};return n.createElement("div",{className:(0,s.Z)("tabs-container",c)},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":o},w)},y.map((e=>{let{value:t,label:r,attributes:o}=e;return n.createElement("li",(0,a.Z)({role:"tab",tabIndex:N===t?0:-1,"aria-selected":N===t,key:t,ref:e=>E.push(e),onKeyDown:S,onClick:A},o,{className:(0,s.Z)("tabs__item",m,null==o?void 0:o.className,{"tabs__item--active":N===t})}),r??t)}))),r?(0,n.cloneElement)(h.filter((e=>e.props.value===N))[0],{className:"margin-top--md"}):n.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==N})))))}function u(e){const t=(0,o.Z)();return n.createElement(d,(0,a.Z)({key:String(t)},e))}},1007:(e,t,r)=>{r.d(t,{Z:()=>u});var a=r(6010),n=r(7294);const s="browserWindow_my1Q",o="browserWindowHeader_jXSR",l="buttons_uHc7",i="browserWindowAddressBar_Pd8y",p="dot_giz1",c="browserWindowMenuIcon_Vhuh",m="bar_rrRL",d="browserWindowBody_Idgs";function u(e){let{children:t,minHeight:r,url:u="http://localhost:3000"}=e;return n.createElement("div",{className:s,style:{minHeight:r}},n.createElement("div",{className:o},n.createElement("div",{className:l},n.createElement("span",{className:p,style:{background:"#f25f58"}}),n.createElement("span",{className:p,style:{background:"#fbbe3c"}}),n.createElement("span",{className:p,style:{background:"#58cb42"}})),n.createElement("div",{className:(0,a.Z)(i,"text--truncate")},n.createElement("a",{href:u,target:"_blank",rel:"noopener"},u)),n.createElement("div",{className:c},n.createElement("div",null,n.createElement("span",{className:m}),n.createElement("span",{className:m}),n.createElement("span",{className:m})))),n.createElement("div",{className:d},t))}},8281:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>p,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var a=r(7462),n=(r(7294),r(3905)),s=r(1007),o=r(5162),l=r(5488);const i={title:"NestJS",description:"See more about how to integrate with NestJS."},p=void 0,c={unversionedId:"main/frameworks/nestjs",id:"main/frameworks/nestjs",title:"NestJS",description:"See more about how to integrate with NestJS.",source:"@site/docs/main/frameworks/nestjs.mdx",sourceDirName:"main/frameworks",slug:"/main/frameworks/nestjs",permalink:"/docs/main/frameworks/nestjs",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/frameworks/nestjs.mdx",tags:[],version:"current",frontMatter:{title:"NestJS",description:"See more about how to integrate with NestJS."},sidebar:"main",previous:{title:"Koa",permalink:"/docs/main/frameworks/koa"},next:{title:"tRPC",permalink:"/docs/main/frameworks/trpc"}},m={},d=[],u={toc:d};function f(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Accords NestJS docs:"),(0,n.kt)(s.Z,{url:"https://docs.nestjs.com/first-steps#platform",mdxType:"BrowserWindow"},(0,n.kt)("p",null,"There are two HTTP platforms supported out-of-the-box: ",(0,n.kt)("inlineCode",{parentName:"p"},"express")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"fastify"),". You can choose the one that best suits your needs."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"platform-express: ",(0,n.kt)("inlineCode",{parentName:"li"},"Express")," is a well-known minimalist web framework for node. It's a battle tested, production-ready library with lots of resources implemented by the community. The ",(0,n.kt)("inlineCode",{parentName:"li"},"@nestjs/platform-express")," package is used by default. Many users are well served with Express, and need take no action to enable it."),(0,n.kt)("li",{parentName:"ul"},"platform-fastify: ",(0,n.kt)("inlineCode",{parentName:"li"},"Fastify")," is a high performance and low overhead framework highly focused on providing maximum efficiency and speed. Read how to use it here.")),(0,n.kt)("p",null,"The NestJS is platform-agnostic, so we can choose which platform we will use. By default, I always use express but if in your company you use fastify, it's okay too.")),(0,n.kt)("p",null,"So, to add support to NestJS, we have two ways:"),(0,n.kt)(l.Z,{groupId:"framework-nestjs",mdxType:"Tabs"},(0,n.kt)(o.Z,{value:"nestjs-express",label:"Express",default:!0,mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="index.ts"',title:'"index.ts"'},"import { NestFactory } from '@nestjs/core';\nimport { ExpressAdapter } from '@nestjs/platform-express';\nimport { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';\nimport { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter());\n\n  // we need to wait until it initializes\n  await nestApp.init();\n\n  // then we get the instance of http adapter, it will be express\n  const app = nestApp.getHttpAdapter().getInstance();\n\n  return app;\n}\n\nconst expressFramework = new ExpressFramework();\n// the initialization of nestjs is asynchronous, so you can use the lazy framework.\nconst framework = new LazyFramework(expressFramework, bootstrap);\n\nexport const handler = ServerlessAdapter.new(null)\n  .setFramework(framework)\n  // continue to set the other options here.\n  //.setHandler(new DefaultHandler())\n  //.setResolver(new PromiseResolver())\n  //.addAdapter(new AlbAdapter())\n  //.addAdapter(new SQSAdapter())\n  //.addAdapter(new SNSAdapter())\n  // after put all methods necessary, just call the build method.\n  .build();\n"))),(0,n.kt)(o.Z,{value:"nestjs-fastify",label:"Fastify",default:!0,mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="index.ts"',title:'"index.ts"'},"import { NestFactory } from '@nestjs/core';\nimport { FastifyAdapter } from '@nestjs/platform-fastify';\nimport { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';\nimport { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const nestApp = await NestFactory.create(AppModule, new FastifyAdapter());\n\n  // we need to wait until it initializes\n  await nestApp.init();\n\n  // then we get the instance of http adapter, it will be fastify\n  const app = nestApp.getHttpAdapter().getInstance();\n\n  return app;\n}\n\nconst fastifyFramework = new FastifyFramework();\n// the initialization of nestjs is asynchronous, so you can use the lazy framework.\nconst framework = new LazyFramework(fastifyFramework, bootstrap);\n\nexport const handler = ServerlessAdapter.new(null)\n  .setFramework(framework)\n  // continue to set the other options here.\n  //.setHandler(new DefaultHandler())\n  //.setResolver(new PromiseResolver())\n  //.addAdapter(new AlbAdapter())\n  //.addAdapter(new SQSAdapter())\n  //.addAdapter(new SNSAdapter())\n  // after put all methods necessary, just call the build method.\n  .build();\n")))),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Need to deal with CORS? See ",(0,n.kt)("a",{parentName:"p",href:"./helpers/cors"},"CorsFramework")," which helps you to add correct headers.")))}f.isMDXComponent=!0}}]);