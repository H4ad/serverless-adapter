"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4764],{8862:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>h});var a=t(5893),r=t(1151),n=t(1007);const o={slug:"updates-and-releases",title:"Updates and Releases",authors:["h4ad"],tags:["serverless-adapter","trpc","azure","firebase"],image:"https://images.unsplash.com/photo-1636819488524-1f019c4e1c44"},i=void 0,l={permalink:"/blog/updates-and-releases",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/blog/2022-07-17-updates-and-releases.mdx",source:"@site/blog/2022-07-17-updates-and-releases.mdx",title:"Updates and Releases",description:"To the moon!",date:"2022-07-17T00:00:00.000Z",formattedDate:"July 17, 2022",tags:[{label:"serverless-adapter",permalink:"/blog/tags/serverless-adapter"},{label:"trpc",permalink:"/blog/tags/trpc"},{label:"azure",permalink:"/blog/tags/azure"},{label:"firebase",permalink:"/blog/tags/firebase"}],readingTime:1.83,hasTruncateMarker:!1,authors:[{name:"Vin\xedcius Louren\xe7o",title:"Maintainer of Serverless Adapter",url:"https://github.com/h4ad",imageURL:"https://github.com/h4ad.png",key:"h4ad"}],frontMatter:{slug:"updates-and-releases",title:"Updates and Releases",authors:["h4ad"],tags:["serverless-adapter","trpc","azure","firebase"],image:"https://images.unsplash.com/photo-1636819488524-1f019c4e1c44"},unlisted:!1,prevItem:{title:"AWS Lambda Response Streaming",permalink:"/blog/aws-lambda-response-streaming"},nextItem:{title:"The Beginning",permalink:"/blog/the-beginning"}},d={authorsImageUrls:[void 0]},h=[{value:"Changes",id:"changes",level:2},{value:"Azure and Firebase",id:"azure-and-firebase",level:2},{value:"tRPC",id:"trpc",level:2},{value:"That&#39;s all folks!",id:"thats-all-folks",level:2}];function c(e){const s={a:"a",blockquote:"blockquote",h2:"h2",img:"img",p:"p",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.p,{children:(0,a.jsx)(s.img,{src:"https://images.unsplash.com/photo-1636819488524-1f019c4e1c44",alt:"To the moon!"})}),"\n",(0,a.jsx)(s.p,{children:"Now we have more Handlers, Frameworks and Adapters, let's see what's new."}),"\n",(0,a.jsxs)(s.blockquote,{children:["\n",(0,a.jsxs)(s.p,{children:["From ",(0,a.jsx)(s.a,{href:"https://github.com/H4ad/serverless-adapter/tree/v2.3.2",children:"v2.3.2"})," to ",(0,a.jsx)(s.a,{href:"https://github.com/H4ad/serverless-adapter/tree/v2.6.0",children:"v2.6.0"}),",\ncompare the changes ",(0,a.jsx)(s.a,{href:"https://github.com/H4ad/serverless-adapter/compare/v2.3.2...v2.6.0",children:"here"}),"."]}),"\n"]}),"\n",(0,a.jsx)(s.h2,{id:"changes",children:"Changes"}),"\n",(0,a.jsxs)(s.p,{children:["42 commits, 6905 lines added, 601 lines deleted, that's the size of the changes since ",(0,a.jsx)(s.a,{href:"/blog/the-beginning",children:"The Beginning"}),"."]}),"\n",(0,a.jsx)(s.p,{children:"I'm very proud of how things are going, I learned a lot by studying to implement these new things."}),"\n",(0,a.jsx)(s.p,{children:"But, let's learn what's new in all these releases."}),"\n",(0,a.jsx)(s.h2,{id:"azure-and-firebase",children:"Azure and Firebase"}),"\n",(0,a.jsxs)(s.p,{children:["You can now use this library to deploy your apps to ",(0,a.jsx)(s.a,{href:"https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node",children:"Azure Functions"}),"\nand ",(0,a.jsx)(s.a,{href:"https://firebase.google.com/docs/functions/http-events",children:"Firebase Functions"}),"."]}),"\n",(0,a.jsx)(s.p,{children:"More specifically, you can integrate with Http Trigger V4 on Azure and Http Events on Firebase."}),"\n",(0,a.jsx)(s.p,{children:"These integrations are just to open the door of possibilities, in the future I want to add support for more triggers in these clouds."}),"\n",(0,a.jsxs)(s.p,{children:["Check out the ",(0,a.jsx)(s.a,{href:"/docs/main/handlers/azure",children:"Azure"})," and ",(0,a.jsx)(s.a,{href:"/docs/main/handlers/firebase",children:"Firebase"})," docs for how to integrate."]}),"\n",(0,a.jsxs)(s.p,{children:["I also added examples for the cloud in the ",(0,a.jsx)(s.a,{href:"https://github.com/H4ad/serverless-adapter-examples",children:"serverless-adapter-examples"})," repository."]}),"\n",(0,a.jsx)(s.h2,{id:"trpc",children:"tRPC"}),"\n",(0,a.jsx)(n.Z,{url:"https://trpc.io/docs/",children:(0,a.jsx)(s.p,{children:"tRPC allows you to easily build & consume fully typesafe APIs, without schemas or code generation."})}),"\n",(0,a.jsx)(s.p,{children:"tRPC is a framework that brings a new way of thinking about APIs, instead of REST or GraphQL, you can build typesafe APIs and easily\ncan integrate with the client, seems to be very promising."}),"\n",(0,a.jsxs)(s.p,{children:["So now you can deploy applications developed with tRPC to any cloud that this library supports, have a look at ",(0,a.jsx)(s.a,{href:"/docs/main/frameworks/trpc",children:"docs"}),"\nto learn more about how to use it."]}),"\n",(0,a.jsx)(s.h2,{id:"thats-all-folks",children:"That's all folks!"}),"\n",(0,a.jsx)(s.p,{children:"I have two more weeks to work in this library without worrying because I'm on vacation at the university,\nso probably my next efforts will be to bring more articles to this blog to show the full power of this library."}),"\n",(0,a.jsx)(s.p,{children:"Giving some spoilers for those of you that make it this far, I'll start by showing you the benefits of using AWS Lambda integrated with\nAPI Gateway and SQS, I used it in a project of my company and I managed to reduce a lot of stress on the database and now\nwe are able to process 500k votes in minutes without spending 15% CPU using a PostgreSQL database on a t2.micro instance."}),"\n",(0,a.jsx)(s.p,{children:"That's all for today, thank you!"})]})}function p(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},1007:(e,s,t)=>{t.d(s,{Z:()=>o});var a=t(512);t(7294);const r={browserWindow:"browserWindow_my1Q",browserWindowHeader:"browserWindowHeader_jXSR",row:"row_KZDM",buttons:"buttons_uHc7",right:"right_oyze",browserWindowAddressBar:"browserWindowAddressBar_Pd8y",dot:"dot_giz1",browserWindowMenuIcon:"browserWindowMenuIcon_Vhuh",bar:"bar_rrRL",browserWindowBody:"browserWindowBody_Idgs"};var n=t(5893);function o(e){let{children:s,minHeight:t,url:o="http://localhost:3000"}=e;return(0,n.jsxs)("div",{className:r.browserWindow,style:{minHeight:t},children:[(0,n.jsxs)("div",{className:r.browserWindowHeader,children:[(0,n.jsxs)("div",{className:r.buttons,children:[(0,n.jsx)("span",{className:r.dot,style:{background:"#f25f58"}}),(0,n.jsx)("span",{className:r.dot,style:{background:"#fbbe3c"}}),(0,n.jsx)("span",{className:r.dot,style:{background:"#58cb42"}})]}),(0,n.jsx)("div",{className:(0,a.Z)(r.browserWindowAddressBar,"text--truncate"),children:(0,n.jsx)("a",{href:o,target:"_blank",rel:"noopener",children:o})}),(0,n.jsx)("div",{className:r.browserWindowMenuIcon,children:(0,n.jsxs)("div",{children:[(0,n.jsx)("span",{className:r.bar}),(0,n.jsx)("span",{className:r.bar}),(0,n.jsx)("span",{className:r.bar})]})})]}),(0,n.jsx)("div",{className:r.browserWindowBody,children:s})]})}},1151:(e,s,t)=>{t.d(s,{Z:()=>i,a:()=>o});var a=t(7294);const r={},n=a.createContext(r);function o(e){const s=a.useContext(n);return a.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(n.Provider,{value:s},e.children)}}}]);