"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5044],{3905:(e,t,a)=>{a.d(t,{Zo:()=>i,kt:()=>c});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},p=Object.keys(e);for(r=0;r<p.length;r++)a=p[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)a=p[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var d=r.createContext({}),s=function(e){var t=r.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},i=function(e){var t=s(e.components);return r.createElement(d.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,p=e.originalType,d=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),u=s(a),c=n,k=u["".concat(d,".").concat(c)]||u[c]||m[c]||p;return a?r.createElement(k,l(l({ref:t},i),{},{components:a})):r.createElement(k,l({ref:t},i))}));function c(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=a.length,l=new Array(p);l[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var s=2;s<p;s++)l[s]=a[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},2971:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>m,frontMatter:()=>p,metadata:()=>o,toc:()=>s});var r=a(7462),n=(a(7294),a(3905));const p={},l=void 0,o={unversionedId:"api/Adapters/AWS/S3Adapter/S3Adapter",id:"api/Adapters/AWS/S3Adapter/S3Adapter",title:"S3Adapter",description:"@h4ad/serverless-adapter &gt; S3Adapter",source:"@site/docs/api/Adapters/AWS/S3Adapter/S3Adapter.md",sourceDirName:"api/Adapters/AWS/S3Adapter",slug:"/api/Adapters/AWS/S3Adapter/",permalink:"/docs/api/Adapters/AWS/S3Adapter/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/S3Adapter/S3Adapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"OldLambdaEdgeBody",permalink:"/docs/api/Adapters/AWS/LambdaEdgeAdapter/OldLambdaEdgeBody"},next:{title:"S3AdapterOptions",permalink:"/docs/api/Adapters/AWS/S3Adapter/S3AdapterOptions"}},d={},s=[{value:"(class) S3Adapter",id:"class-s3adapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(property) options",id:"property-options",level:2}],i={toc:s};function m(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},i,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Adapters/AWS/S3Adapter"},"S3Adapter")),(0,n.kt)("h2",{id:"class-s3adapter"},"(class) S3Adapter"),(0,n.kt)("p",null,"The adapter to handle requests from AWS S3."),(0,n.kt)("p",null,"The option of ",(0,n.kt)("inlineCode",{parentName:"p"},"responseWithErrors")," is ignored by this adapter and we always call ",(0,n.kt)("inlineCode",{parentName:"p"},"resolver.fail")," with the error."),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-s3.html"},"Event Reference")),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class S3Adapter implements AdapterContract<S3Event, Context, IEmptyResponse> \n")),(0,n.kt)("p",null,"Implements: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")," ","<","S3Event, Context, ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Core/Constants/IEmptyResponse"},"IEmptyResponse")),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"const s3ForwardPath = '/your/route/s3'; // default /s3\nconst s3ForwardMethod = 'POST'; // default POST\nconst adapter = new S3Adapter({ s3ForwardPath, s3ForwardMethod });\n")),(0,n.kt)("h2",{id:"constructor"},"(constructor)"),(0,n.kt)("p",null,"Default constructor"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"constructor(options?: S3AdapterOptions | undefined);\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"options"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Adapters/AWS/S3Adapter/S3AdapterOptions"},"S3AdapterOptions")," ","|"," undefined"),(0,n.kt)("td",{parentName:"tr",align:null},"(Optional) The options to customize the ",(0,n.kt)("a",{parentName:"td",href:"/docs/api/Adapters/AWS/S3Adapter"},"S3Adapter"))))),(0,n.kt)("h2",{id:"method-canhandle"},"(method) canHandle"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"canHandle(event: unknown): event is S3Event;\n")),(0,n.kt)("h3",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},"unknown"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"event is S3Event"),(0,n.kt)("h2",{id:"method-getadaptername"},"(method) getAdapterName"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getAdapterName(): string;\n")),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"string"),(0,n.kt)("h2",{id:"method-getrequest"},"(method) getRequest"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getRequest(event: S3Event): AdapterRequest;\n")),(0,n.kt)("h3",{id:"parameters-2"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},"S3Event"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract/AdapterRequest"},"AdapterRequest")),(0,n.kt)("h2",{id:"method-getresponse"},"(method) getResponse"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getResponse(): IEmptyResponse;\n")),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Core/Constants/IEmptyResponse"},"IEmptyResponse")),(0,n.kt)("h2",{id:"method-onerrorwhileforwarding"},"(method) onErrorWhileForwarding"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"onErrorWhileForwarding({ error, delegatedResolver, }: OnErrorProps<S3Event, IEmptyResponse>): void;\n")),(0,n.kt)("h3",{id:"parameters-3"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"{ error, delegatedResolver, }"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/OnErrorProps"},"OnErrorProps")," ","<","S3Event, ",(0,n.kt)("a",{parentName:"td",href:"/docs/api/Core/Constants/IEmptyResponse"},"IEmptyResponse")," ",">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"void"),(0,n.kt)("h2",{id:"property-options"},"(property) options"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly options?: S3AdapterOptions | undefined;\n")))}m.isMDXComponent=!0}}]);