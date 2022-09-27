"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2982],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=s(n),m=r,k=u["".concat(p,".").concat(m)]||u[m]||c[m]||i;return n?a.createElement(k,o(o({ref:t},d),{},{components:n})):a.createElement(k,o({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6342:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const i={title:"Digital Ocean",description:"See more about how to integrate with DigitalOcean Functions."},o=void 0,l={unversionedId:"main/handlers/digital-ocean",id:"main/handlers/digital-ocean",title:"Digital Ocean",description:"See more about how to integrate with DigitalOcean Functions.",source:"@site/docs/main/handlers/digital-ocean.mdx",sourceDirName:"main/handlers",slug:"/main/handlers/digital-ocean",permalink:"/docs/main/handlers/digital-ocean",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/handlers/digital-ocean.mdx",tags:[],version:"current",frontMatter:{title:"Digital Ocean",description:"See more about how to integrate with DigitalOcean Functions."},sidebar:"main",previous:{title:"Default",permalink:"/docs/main/handlers/default"},next:{title:"Firebase",permalink:"/docs/main/handlers/firebase"}},p={},s=[{value:"Requirements",id:"requirements",level:2},{value:"Usage",id:"usage",level:2},{value:"Integrating with Existing API",id:"integrating-with-existing-api",level:2},{value:"Examples",id:"examples",level:2}],d={toc:s};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Don't know what a handler is? See the ",(0,r.kt)("a",{parentName:"p",href:"../architecture#handler"},"Architecture")," section.")),(0,r.kt)("h2",{id:"requirements"},"Requirements"),(0,r.kt)("p",null,"When you work with DigitalOcean Functions, in the root of your repository you will have a file called ",(0,r.kt)("inlineCode",{parentName:"p"},"project.yml")," which is used\nto determine the structure of your functions and will be used to deploy your code to DigitalOcean."),(0,r.kt)("p",null,"To this library understand the requests coming from DigitalOcean, you need to modify the default code of ",(0,r.kt)("inlineCode",{parentName:"p"},"project.yml"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"packages:\n  - name: [name-of-your-api]\n    functions:\n      - name: 'prod'\n        main: ''\n        runtime: 'nodejs:18'\n-        web: true\n+        web: 'raw'\n")),(0,r.kt)("p",null,"Also, you will need ",(0,r.kt)("inlineCode",{parentName:"p"},"doctl"),", the DigitalOcean CLI, see ",(0,r.kt)("a",{parentName:"p",href:"https://docs.digitalocean.com/reference/doctl/how-to/install/"},"how to install")," before proceeding."),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"Import and call the method ",(0,r.kt)("a",{parentName:"p",href:"../../api/ServerlessAdapter#method-sethandler"},"setHandler"),", as per the code below:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="index.ts"',title:'"index.ts"'},"import { ServerlessAdapter } from '@h4ad/serverless-adapter';\nimport { DigitalOceanHandler } from '@h4ad/serverless-adapter/lib/handlers/digital-ocean';\nimport { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';\nimport { HttpFunctionAdapter } from '@h4ad/serverless-adapter/lib/adapters/digital-ocean';\nimport app from './app';\n\nexport const main = ServerlessAdapter.new(app)\n  .setHandler(new DigitalOceanHandler())\n  .setResolver(new PromiseResolver())\n  // continue to set the other options here.\n  // .setFramework(new ExpressFramework())\n  .addAdapter(new HttpFunctionAdapter())\n  .build();\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Be careful when exporting the handler because in DigitalOcean you must ",(0,r.kt)("inlineCode",{parentName:"p"},"export const main"),".")),(0,r.kt)("h2",{id:"integrating-with-existing-api"},"Integrating with Existing API"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"This configuration is meant to be used for one API/function only, if you want to have multiple APIs and functions inside\nin the same repository, you can skip this section.")),(0,r.kt)("p",null,"So, let's assume you're a good developer and like to follow best practices, and your api's folder structure looks like this:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"package.json"),(0,r.kt)("li",{parentName:"ul"},"package-lock.json"),(0,r.kt)("li",{parentName:"ul"},"tsconfig.json"),(0,r.kt)("li",{parentName:"ul"},"src",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"index.ts")))),(0,r.kt)("p",null,"The first thing we need to do is create the ",(0,r.kt)("inlineCode",{parentName:"p"},"packages")," folder and the ",(0,r.kt)("inlineCode",{parentName:"p"},"function")," folder for the DigitalOcean:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"packages",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"[name-of-your-package]"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"api")))))),(0,r.kt)("p",null,"Change ",(0,r.kt)("inlineCode",{parentName:"p"},"[name-of-your-package]")," to your project name, like: ",(0,r.kt)("inlineCode",{parentName:"p"},"joe-book-store"),". In the final, DigitalOcean will create a DNS as\n",(0,r.kt)("inlineCode",{parentName:"p"},"https://faas-nyc1-<id>.doserverless.co/api/v1/web/<namespace>/joe-book-store/api"),"."),(0,r.kt)("p",null,"Okay, with the folders created, let's create a file called ",(0,r.kt)("inlineCode",{parentName:"p"},".include")," inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"api")," folder with the following content:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text",metastring:'title=".include"',title:'".include"'},"deploy.zip\n")),(0,r.kt)("p",null,"By default, ",(0,r.kt)("inlineCode",{parentName:"p"},"doctl")," which is DigitalOcean CLI already packs your code inside ",(0,r.kt)("inlineCode",{parentName:"p"},"packages/[your-package-name]/api"),", but I want to have a better configuration and use my own library,\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/H4ad/node-modules-packer"},"node-modules-packer")," which packs all the code faster than running ",(0,r.kt)("inlineCode",{parentName:"p"},"doctl")," and also can minify your code."),(0,r.kt)("p",null,"Okay, after configure ",(0,r.kt)("inlineCode",{parentName:"p"},".include"),", let's modify your ",(0,r.kt)("inlineCode",{parentName:"p"},"project.yml")," to be able to deploy your API:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff",metastring:'title="project.yml"',title:'"project.yml"'},"packages:\n  - name: [name-of-your-package]\n    functions:\n      - name: 'api'\n-       main: ''\n+       main: 'dist/index.main' # if you put the code of ServerlessAdapter in different file, you should change here.\n        runtime: 'nodejs:18'\n-       web: true\n+       web: 'raw'\n")),(0,r.kt)("p",null,"Finally, let's now add some scripts to be able to deploy our code using ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/H4ad/node-modules-packer"},"node-modules-packer"),", inside ",(0,r.kt)("inlineCode",{parentName:"p"},"package.json"),", add these scripts:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="package.json"',title:'"package.json"'},'"zip": "npx @h4ad/node-modules-packer ./ --include dist --output-path packages/[name-of-your-package]/prod",\n"update-function": "doctl serverless deploy .",\n"deploy": "npm run build && npm run zip && npm run update-function"\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If you want to know more configurations of node-modules-packer, see ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/H4ad/node-modules-packer#examples"},"here"),".")),(0,r.kt)("p",null,"To deploy, just run ",(0,r.kt)("inlineCode",{parentName:"p"},"npm run deploy")," and that's it! Your API will be available for you to use."),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("p",null,"You can see examples of how to use ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/H4ad/serverless-adapter-examples"},"here"),"."))}c.isMDXComponent=!0}}]);