"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1433],{4064:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>p,contentTitle:()=>d,default:()=>c,frontMatter:()=>n,metadata:()=>i,toc:()=>o});var t=r(5893),a=r(1151);const n={},d=void 0,i={id:"api/Adapters/AWS/RequestLambdaEdgeAdapter/RequestLambdaEdgeAdapterOptions",title:"RequestLambdaEdgeAdapterOptions",description:"@h4ad/serverless-adapter &gt; RequestLambdaEdgeAdapterOptions",source:"@site/docs/api/Adapters/AWS/RequestLambdaEdgeAdapter/RequestLambdaEdgeAdapterOptions.md",sourceDirName:"api/Adapters/AWS/RequestLambdaEdgeAdapter",slug:"/api/Adapters/AWS/RequestLambdaEdgeAdapter/RequestLambdaEdgeAdapterOptions",permalink:"/docs/api/Adapters/AWS/RequestLambdaEdgeAdapter/RequestLambdaEdgeAdapterOptions",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/RequestLambdaEdgeAdapter/RequestLambdaEdgeAdapterOptions.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"RequestLambdaEdgeAdapter",permalink:"/docs/api/Adapters/AWS/RequestLambdaEdgeAdapter/"},next:{title:"S3Adapter",permalink:"/docs/api/Adapters/AWS/S3Adapter/"}},p={},o=[{value:"(interface) RequestLambdaEdgeAdapterOptions",id:"interface-requestlambdaedgeadapteroptions",level:2},{value:"(property) disallowedHeaders",id:"property-disallowedheaders",level:2},{value:"Remarks",id:"remarks",level:2},{value:"(property) onResponseSizeExceedLimit",id:"property-onresponsesizeexceedlimit",level:2},{value:"(property) originMaxResponseSizeInBytes",id:"property-originmaxresponsesizeinbytes",level:2},{value:"(property) shouldStripHeader",id:"property-shouldstripheader",level:2},{value:"(property) stripBasePath",id:"property-stripbasepath",level:2},{value:"(property) viewerMaxResponseSizeInBytes",id:"property-viewermaxresponsesizeinbytes",level:2}];function l(e){const s={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,t.jsx)(s.a,{href:"/docs/api/Adapters/AWS/RequestLambdaEdgeAdapter/RequestLambdaEdgeAdapterOptions",children:"RequestLambdaEdgeAdapterOptions"})]}),"\n",(0,t.jsx)(s.h2,{id:"interface-requestlambdaedgeadapteroptions",children:"(interface) RequestLambdaEdgeAdapterOptions"}),"\n",(0,t.jsxs)(s.p,{children:["The options to customize the ",(0,t.jsx)(s.a,{href:"/docs/api/Adapters/AWS/RequestLambdaEdgeAdapter",children:"RequestLambdaEdgeAdapter"})," ."]}),"\n",(0,t.jsx)(s.p,{children:"Signature:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-typescript",children:"export interface RequestLambdaEdgeAdapterOptions \n"})}),"\n",(0,t.jsx)(s.h2,{id:"property-disallowedheaders",children:"(property) disallowedHeaders"}),"\n",(0,t.jsx)(s.p,{children:"The headers that will be stripped from the headers object because Lambda @ edge will fail if these headers are passed in the response."}),"\n",(0,t.jsx)(s.p,{children:"Signature:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-typescript",children:"disallowedHeaders?: (string | RegExp)[];\n"})}),"\n",(0,t.jsx)(s.h2,{id:"remarks",children:"Remarks"}),"\n",(0,t.jsxs)(s.p,{children:["All headers will be compared with other headers using toLowerCase, but for the RegExp, if you modify this list, you must put the flag ",(0,t.jsx)(s.code,{children:"/gmi"})," at the end of the RegExp (ex: ",(0,t.jsx)(s.code,{children:"/(X-Amz-Cf-)(.*)/gim"})," )"]}),"\n",(0,t.jsx)(s.h2,{id:"property-onresponsesizeexceedlimit",children:"(property) onResponseSizeExceedLimit"}),"\n",(0,t.jsx)(s.p,{children:"The function called when the response size exceed the max limits of the Lambda @ edge"}),"\n",(0,t.jsx)(s.p,{children:"Signature:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-typescript",children:"onResponseSizeExceedLimit?: (response: CloudFrontRequestResult) => CloudFrontRequestResult;\n"})}),"\n",(0,t.jsx)(s.h2,{id:"property-originmaxresponsesizeinbytes",children:"(property) originMaxResponseSizeInBytes"}),"\n",(0,t.jsx)(s.p,{children:"The max response size in bytes of origin request and origin response."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.a,{href:"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html",children:"Reference"})}),"\n",(0,t.jsx)(s.p,{children:"Signature:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-typescript",children:"originMaxResponseSizeInBytes?: number;\n"})}),"\n",(0,t.jsx)(s.h2,{id:"property-shouldstripheader",children:"(property) shouldStripHeader"}),"\n",(0,t.jsx)(s.p,{children:"If you want to change how we check against the header if it should be stripped, you can pass a function to this property."}),"\n",(0,t.jsx)(s.p,{children:"Signature:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-typescript",children:"shouldStripHeader?: (header: string) => boolean;\n"})}),"\n",(0,t.jsx)(s.h2,{id:"property-stripbasepath",children:"(property) stripBasePath"}),"\n",(0,t.jsxs)(s.p,{children:["Strip base path for custom paths, like ",(0,t.jsx)(s.code,{children:"/api"})," ."]}),"\n",(0,t.jsx)(s.p,{children:"Signature:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-typescript",children:"stripBasePath?: string;\n"})}),"\n",(0,t.jsx)(s.h2,{id:"property-viewermaxresponsesizeinbytes",children:"(property) viewerMaxResponseSizeInBytes"}),"\n",(0,t.jsx)(s.p,{children:"The max response size in bytes of viewer request and viewer response."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.a,{href:"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html",children:"Reference"})}),"\n",(0,t.jsx)(s.p,{children:"Signature:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-typescript",children:"viewerMaxResponseSizeInBytes?: number;\n"})})]})}function c(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},1151:(e,s,r)=>{r.d(s,{Z:()=>i,a:()=>d});var t=r(7294);const a={},n=t.createContext(a);function d(e){const s=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:d(e.components),t.createElement(n.Provider,{value:s},e.children)}}}]);