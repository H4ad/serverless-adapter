"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4790],{2368:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var r=t(5893),i=t(1151);const s={},a=void 0,o={id:"api/Core/isBinary/isContentTypeBinary",title:"isContentTypeBinary",description:"@h4ad/serverless-adapter &gt; isContentTypeBinary",source:"@site/docs/api/Core/isBinary/isContentTypeBinary.md",sourceDirName:"api/Core/isBinary",slug:"/api/Core/isBinary/isContentTypeBinary",permalink:"/docs/api/Core/isBinary/isContentTypeBinary",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Core/isBinary/isContentTypeBinary.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"isContentEncodingBinary",permalink:"/docs/api/Core/isBinary/isContentEncodingBinary"},next:{title:"ApolloServerFramework",permalink:"/docs/api/Frameworks/ApolloServerFramework/"}},d={},c=[{value:"(function) isContentTypeBinary",id:"function-iscontenttypebinary",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Example",id:"example",level:2}];function l(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,r.jsx)(n.a,{href:"/docs/api/Core/isBinary/isContentTypeBinary",children:"isContentTypeBinary"})]}),"\n",(0,r.jsx)(n.h2,{id:"function-iscontenttypebinary",children:"(function) isContentTypeBinary"}),"\n",(0,r.jsx)(n.p,{children:"The function that determines by the content type whether the response should be treated as binary"}),"\n",(0,r.jsx)(n.p,{children:"Signature:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"export declare function isContentTypeBinary(headers: BothValueHeaders, binaryContentTypes: string[]): boolean;\n"})}),"\n",(0,r.jsx)(n.h3,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"headers"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"/docs/api/Types/BothValueHeaders",children:"BothValueHeaders"})}),(0,r.jsx)(n.td,{children:"The headers of the response"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"binaryContentTypes"}),(0,r.jsx)(n.td,{children:"string[]"}),(0,r.jsx)(n.td,{children:"The list of content types that will be treated as binary"})]})]})]}),"\n",(0,r.jsx)(n.p,{children:"Returns:"}),"\n",(0,r.jsx)(n.p,{children:"boolean"}),"\n",(0,r.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"const headers = \\{ 'content-type': 'image/png' };\r\nconst isBinary = isContentTypeBinary(headers, new Map([['image/png', true]]));\r\nconsole.log(isBinary);\r\n// true\n"})})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>a});var r=t(7294);const i={},s=r.createContext(i);function a(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);