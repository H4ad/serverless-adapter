"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8150],{456:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>u,contentTitle:()=>d,default:()=>f,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var n=t(5893),s=t(1151),a=t(1007),o=t(5162),i=t(4866);const l={title:"NestJS",description:"See more about how to integrate with NestJS."},d=void 0,c={id:"main/frameworks/nestjs",title:"NestJS",description:"See more about how to integrate with NestJS.",source:"@site/docs/main/frameworks/nestjs.mdx",sourceDirName:"main/frameworks",slug:"/main/frameworks/nestjs",permalink:"/docs/main/frameworks/nestjs",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/frameworks/nestjs.mdx",tags:[],version:"current",frontMatter:{title:"NestJS",description:"See more about how to integrate with NestJS."},sidebar:"main",previous:{title:"Koa",permalink:"/docs/main/frameworks/koa"},next:{title:"tRPC",permalink:"/docs/main/frameworks/trpc"}},u={},p=[];function m(e){const r={a:"a",admonition:"admonition",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:"Accords NestJS docs:"}),"\n",(0,n.jsxs)(a.Z,{url:"https://docs.nestjs.com/first-steps#platform",children:[(0,n.jsxs)(r.p,{children:["There are two HTTP platforms supported out-of-the-box: ",(0,n.jsx)(r.code,{children:"express"})," and ",(0,n.jsx)(r.code,{children:"fastify"}),". You can choose the one that best suits your needs."]}),(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["platform-express: ",(0,n.jsx)(r.code,{children:"Express"})," is a well-known minimalist web framework for node. It's a battle tested, production-ready library with lots of resources implemented by the community. The ",(0,n.jsx)(r.code,{children:"@nestjs/platform-express"})," package is used by default. Many users are well served with Express, and need take no action to enable it."]}),"\n",(0,n.jsxs)(r.li,{children:["platform-fastify: ",(0,n.jsx)(r.code,{children:"Fastify"})," is a high performance and low overhead framework highly focused on providing maximum efficiency and speed. Read how to use it here."]}),"\n"]}),(0,n.jsx)(r.p,{children:"The NestJS is platform-agnostic, so we can choose which platform we will use. By default, I always use express but if in your company you use fastify, it's okay too."})]}),"\n",(0,n.jsx)(r.p,{children:"So, to add support to NestJS, we have two ways:"}),"\n",(0,n.jsxs)(i.Z,{groupId:"framework-nestjs",children:[(0,n.jsx)(o.Z,{value:"nestjs-express",label:"Express",default:!0,children:(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",metastring:'title="index.ts"',children:"import { NestFactory } from '@nestjs/core';\r\nimport { ExpressAdapter } from '@nestjs/platform-express';\r\nimport { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';\r\nimport { ExpressFramework } from '@h4ad/serverless-adapter/lib/frameworks/express';\r\nimport { AppModule } from './app.module';\r\n\r\nasync function bootstrap() {\r\n  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter());\r\n\r\n  // we need to wait until it initializes\r\n  await nestApp.init();\r\n\r\n  // then we get the instance of http adapter, it will be express\r\n  const app = nestApp.getHttpAdapter().getInstance();\r\n\r\n  return app;\r\n}\r\n\r\nconst expressFramework = new ExpressFramework();\r\n// the initialization of nestjs is asynchronous, so you can use the lazy framework.\r\nconst framework = new LazyFramework(expressFramework, bootstrap);\r\n\r\nexport const handler = ServerlessAdapter.new(null)\r\n  .setFramework(framework)\r\n  // continue to set the other options here.\r\n  //.setHandler(new DefaultHandler())\r\n  //.setResolver(new PromiseResolver())\r\n  //.addAdapter(new AlbAdapter())\r\n  //.addAdapter(new SQSAdapter())\r\n  //.addAdapter(new SNSAdapter())\r\n  // after put all methods necessary, just call the build method.\r\n  .build();\n"})})}),(0,n.jsx)(o.Z,{value:"nestjs-fastify",label:"Fastify",default:!0,children:(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-typescript",metastring:'title="index.ts"',children:"import { NestFactory } from '@nestjs/core';\r\nimport { FastifyAdapter } from '@nestjs/platform-fastify';\r\nimport { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';\r\nimport { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';\r\nimport { AppModule } from './app.module';\r\n\r\nasync function bootstrap() {\r\n  const nestApp = await NestFactory.create(AppModule, new FastifyAdapter());\r\n\r\n  // we need to wait until it initializes\r\n  await nestApp.init();\r\n\r\n  // then we get the instance of http adapter, it will be fastify\r\n  const app = nestApp.getHttpAdapter().getInstance();\r\n\r\n  return app;\r\n}\r\n\r\nconst fastifyFramework = new FastifyFramework();\r\n// the initialization of nestjs is asynchronous, so you can use the lazy framework.\r\nconst framework = new LazyFramework(fastifyFramework, bootstrap);\r\n\r\nexport const handler = ServerlessAdapter.new(null)\r\n  .setFramework(framework)\r\n  // continue to set the other options here.\r\n  //.setHandler(new DefaultHandler())\r\n  //.setResolver(new PromiseResolver())\r\n  //.addAdapter(new AlbAdapter())\r\n  //.addAdapter(new SQSAdapter())\r\n  //.addAdapter(new SNSAdapter())\r\n  // after put all methods necessary, just call the build method.\r\n  .build();\n"})})})]}),"\n",(0,n.jsx)(r.admonition,{type:"tip",children:(0,n.jsxs)(r.p,{children:["Need to deal with CORS? See ",(0,n.jsx)(r.a,{href:"./helpers/cors",children:"CorsFramework"})," which helps you to add correct headers."]})})]})}function f(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},5162:(e,r,t)=>{t.d(r,{Z:()=>o});t(7294);var n=t(512);const s={tabItem:"tabItem_Ymn6"};var a=t(5893);function o(e){let{children:r,hidden:t,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,n.Z)(s.tabItem,o),hidden:t,children:r})}},4866:(e,r,t)=>{t.d(r,{Z:()=>k});var n=t(7294),s=t(512),a=t(2466),o=t(6550),i=t(469),l=t(1980),d=t(7392),c=t(12);function u(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:r,children:t}=e;return(0,n.useMemo)((()=>{const e=r??function(e){return u(e).map((e=>{let{props:{value:r,label:t,attributes:n,default:s}}=e;return{value:r,label:t,attributes:n,default:s}}))}(t);return function(e){const r=(0,d.l)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,t])}function m(e){let{value:r,tabValues:t}=e;return t.some((e=>e.value===r))}function f(e){let{queryString:r=!1,groupId:t}=e;const s=(0,o.k6)(),a=function(e){let{queryString:r=!1,groupId:t}=e;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:r,groupId:t});return[(0,l._X)(a),(0,n.useCallback)((e=>{if(!a)return;const r=new URLSearchParams(s.location.search);r.set(a,e),s.replace({...s.location,search:r.toString()})}),[a,s])]}function h(e){const{defaultValue:r,queryString:t=!1,groupId:s}=e,a=p(e),[o,l]=(0,n.useState)((()=>function(e){let{defaultValue:r,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!m({value:r,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return r}const n=t.find((e=>e.default))??t[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:r,tabValues:a}))),[d,u]=f({queryString:t,groupId:s}),[h,w]=function(e){let{groupId:r}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(r),[s,a]=(0,c.Nk)(t);return[s,(0,n.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:s}),b=(()=>{const e=d??h;return m({value:e,tabValues:a})?e:null})();(0,i.Z)((()=>{b&&l(b)}),[b]);return{selectedValue:o,selectValue:(0,n.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),w(e)}),[u,w,a]),tabValues:a}}var w=t(2389);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=t(5893);function x(e){let{className:r,block:t,selectedValue:n,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:d}=(0,a.o5)(),c=e=>{const r=e.currentTarget,t=l.indexOf(r),s=i[t].value;s!==n&&(d(r),o(s))},u=e=>{let r=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;r=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;r=l[t]??l[l.length-1];break}}r?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":t},r),children:i.map((e=>{let{value:r,label:t,attributes:a}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:n===r?0:-1,"aria-selected":n===r,ref:e=>l.push(e),onKeyDown:u,onClick:c,...a,className:(0,s.Z)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":n===r}),children:t??r},r)}))})}function v(e){let{lazy:r,children:t,selectedValue:s}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(r){const e=a.find((e=>e.props.value===s));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:a.map(((e,r)=>(0,n.cloneElement)(e,{key:r,hidden:e.props.value!==s})))})}function j(e){const r=h(e);return(0,y.jsxs)("div",{className:(0,s.Z)("tabs-container",b.tabList),children:[(0,y.jsx)(x,{...e,...r}),(0,y.jsx)(v,{...e,...r})]})}function k(e){const r=(0,w.Z)();return(0,y.jsx)(j,{...e,children:u(e.children)},String(r))}},1007:(e,r,t)=>{t.d(r,{Z:()=>o});var n=t(512);t(7294);const s={browserWindow:"browserWindow_my1Q",browserWindowHeader:"browserWindowHeader_jXSR",row:"row_KZDM",buttons:"buttons_uHc7",right:"right_oyze",browserWindowAddressBar:"browserWindowAddressBar_Pd8y",dot:"dot_giz1",browserWindowMenuIcon:"browserWindowMenuIcon_Vhuh",bar:"bar_rrRL",browserWindowBody:"browserWindowBody_Idgs"};var a=t(5893);function o(e){let{children:r,minHeight:t,url:o="http://localhost:3000"}=e;return(0,a.jsxs)("div",{className:s.browserWindow,style:{minHeight:t},children:[(0,a.jsxs)("div",{className:s.browserWindowHeader,children:[(0,a.jsxs)("div",{className:s.buttons,children:[(0,a.jsx)("span",{className:s.dot,style:{background:"#f25f58"}}),(0,a.jsx)("span",{className:s.dot,style:{background:"#fbbe3c"}}),(0,a.jsx)("span",{className:s.dot,style:{background:"#58cb42"}})]}),(0,a.jsx)("div",{className:(0,n.Z)(s.browserWindowAddressBar,"text--truncate"),children:(0,a.jsx)("a",{href:o,target:"_blank",rel:"noopener",children:o})}),(0,a.jsx)("div",{className:s.browserWindowMenuIcon,children:(0,a.jsxs)("div",{children:[(0,a.jsx)("span",{className:s.bar}),(0,a.jsx)("span",{className:s.bar}),(0,a.jsx)("span",{className:s.bar})]})})]}),(0,a.jsx)("div",{className:s.browserWindowBody,children:r})]})}},1151:(e,r,t)=>{t.d(r,{Z:()=>i,a:()=>o});var n=t(7294);const s={},a=n.createContext(s);function o(e){const r=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(a.Provider,{value:r},e.children)}}}]);