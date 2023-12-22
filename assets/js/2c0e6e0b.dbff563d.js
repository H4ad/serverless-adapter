"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7887],{121:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>o,contentTitle:()=>n,default:()=>h,frontMatter:()=>d,metadata:()=>i,toc:()=>p});var s=t(5893),a=t(1151);const d={},n=void 0,i={id:"api/Adapters/AWS/LambdaEdgeAdapter/LambdaEdgeAdapterOptions",title:"LambdaEdgeAdapterOptions",description:"@h4ad/serverless-adapter &gt; LambdaEdgeAdapterOptions",source:"@site/docs/api/Adapters/AWS/LambdaEdgeAdapter/LambdaEdgeAdapterOptions.md",sourceDirName:"api/Adapters/AWS/LambdaEdgeAdapter",slug:"/api/Adapters/AWS/LambdaEdgeAdapter/LambdaEdgeAdapterOptions",permalink:"/docs/api/Adapters/AWS/LambdaEdgeAdapter/LambdaEdgeAdapterOptions",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/LambdaEdgeAdapter/LambdaEdgeAdapterOptions.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"DefaultQueryString",permalink:"/docs/api/Adapters/AWS/LambdaEdgeAdapter/DefaultQueryString"},next:{title:"NewLambdaEdgeBody",permalink:"/docs/api/Adapters/AWS/LambdaEdgeAdapter/NewLambdaEdgeBody"}},o={},p=[{value:"(interface) LambdaEdgeAdapterOptions",id:"interface-lambdaedgeadapteroptions",level:2},{value:"(property) disallowedHeaders",id:"property-disallowedheaders",level:2},{value:"Remarks",id:"remarks",level:2},{value:"(property) getPathFromEvent",id:"property-getpathfromevent",level:2},{value:"Remarks",id:"remarks-1",level:2},{value:"(property) onResponseSizeExceedLimit",id:"property-onresponsesizeexceedlimit",level:2},{value:"(property) originMaxResponseSizeInBytes",id:"property-originmaxresponsesizeinbytes",level:2},{value:"(property) shouldStripHeader",id:"property-shouldstripheader",level:2},{value:"(property) shouldUseHeadersFromFramework",id:"property-shoulduseheadersfromframework",level:2},{value:"(property) viewerMaxResponseSizeInBytes",id:"property-viewermaxresponsesizeinbytes",level:2}];function l(e){const r={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"/docs/api/Introduction",children:"@h4ad/serverless-adapter"})," > ",(0,s.jsx)(r.a,{href:"/docs/api/Adapters/AWS/LambdaEdgeAdapter/LambdaEdgeAdapterOptions",children:"LambdaEdgeAdapterOptions"})]}),"\n",(0,s.jsx)(r.h2,{id:"interface-lambdaedgeadapteroptions",children:"(interface) LambdaEdgeAdapterOptions"}),"\n",(0,s.jsxs)(r.p,{children:["The options to customize the ",(0,s.jsx)(r.a,{href:"/docs/api/Adapters/AWS/LambdaEdgeAdapter",children:"LambdaEdgeAdapter"})," ."]}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"export interface LambdaEdgeAdapterOptions \n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-disallowedheaders",children:"(property) disallowedHeaders"}),"\n",(0,s.jsx)(r.p,{children:"The headers that will be stripped from the headers object because Lambda @ edge will fail if these headers are passed in the response."}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"disallowedHeaders?: (string | RegExp)[];\n"})}),"\n",(0,s.jsx)(r.h2,{id:"remarks",children:"Remarks"}),"\n",(0,s.jsxs)(r.p,{children:["All headers will be compared with other headers using toLowerCase, but for the RegExp, if you modify this list, you must put the flag ",(0,s.jsx)(r.code,{children:"/gmi"})," at the end of the RegExp (ex: ",(0,s.jsx)(r.code,{children:"/(X-Amz-Cf-)(.*)/gim"})," )"]}),"\n",(0,s.jsx)(r.h2,{id:"property-getpathfromevent",children:"(property) getPathFromEvent"}),"\n",(0,s.jsx)(r.p,{children:"Return the path to be used to create a request to the framework"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"getPathFromEvent?: (event: CloudFrontRequestEvent['Records'][number]) => string;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"remarks-1",children:"Remarks"}),"\n",(0,s.jsxs)(r.p,{children:["You MUST append the query params from ",(0,s.jsx)(r.a,{href:"/docs/api/Adapters/AWS/LambdaEdgeAdapter/DefaultQueryString",children:"DefaultQueryString"})," , you can use the helper ",(0,s.jsx)(r.a,{href:"/docs/api/Core/Path/getPathWithQueryStringParams",children:"getPathWithQueryStringParams()"})," ."]}),"\n",(0,s.jsx)(r.h2,{id:"property-onresponsesizeexceedlimit",children:"(property) onResponseSizeExceedLimit"}),"\n",(0,s.jsx)(r.p,{children:"The function called when the response size exceed the max limits of the Lambda @ edge"}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"onResponseSizeExceedLimit?: (response: CloudFrontRequestResult) => CloudFrontRequestResult;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-originmaxresponsesizeinbytes",children:"(property) originMaxResponseSizeInBytes"}),"\n",(0,s.jsx)(r.p,{children:"The max response size in bytes of origin request and origin response."}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html",children:"Reference"})}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"originMaxResponseSizeInBytes?: number;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-shouldstripheader",children:"(property) shouldStripHeader"}),"\n",(0,s.jsx)(r.p,{children:"If you want to change how we check against the header if it should be stripped, you can pass a function to this property."}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"shouldStripHeader?: (header: string) => boolean;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-shoulduseheadersfromframework",children:"(property) shouldUseHeadersFromFramework"}),"\n",(0,s.jsxs)(r.p,{children:["By default, the  has the ",(0,s.jsx)(r.code,{children:"headers"})," property, but we also have the headers sent by the framework too. So this setting tells us how to handle this case, if you pass ",(0,s.jsx)(r.code,{children:"true"})," to this property, we will use the framework headers. Otherwise, we will forward the body back to cloudfront without modifying or trying to set the ",(0,s.jsx)(r.code,{children:"headers"})," property inside ."]}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"shouldUseHeadersFromFramework?: boolean;\n"})}),"\n",(0,s.jsx)(r.h2,{id:"property-viewermaxresponsesizeinbytes",children:"(property) viewerMaxResponseSizeInBytes"}),"\n",(0,s.jsx)(r.p,{children:"The max response size in bytes of viewer request and viewer response."}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html",children:"Reference"})}),"\n",(0,s.jsx)(r.p,{children:"Signature:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"viewerMaxResponseSizeInBytes?: number;\n"})})]})}function h(e={}){const{wrapper:r}={...(0,a.a)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>i,a:()=>n});var s=t(7294);const a={},d=s.createContext(a);function n(e){const r=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:n(e.components),s.createElement(d.Provider,{value:r},e.children)}}}]);