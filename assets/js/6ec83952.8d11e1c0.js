"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5158],{3905:function(e,t,r){r.d(t,{Zo:function(){return i},kt:function(){return c}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},p=Object.keys(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),d=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},i=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,p=e.originalType,s=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),m=d(r),c=n,k=m["".concat(s,".").concat(c)]||m[c]||u[c]||p;return r?a.createElement(k,l(l({ref:t},i),{},{components:r})):a.createElement(k,l({ref:t},i))}));function c(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=r.length,l=new Array(p);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var d=2;d<p;d++)l[d]=r[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8026:function(e,t,r){r.r(t),r.d(t,{assets:function(){return i},contentTitle:function(){return s},default:function(){return c},frontMatter:function(){return o},metadata:function(){return d},toc:function(){return u}});var a=r(7462),n=r(3366),p=(r(7294),r(3905)),l=["components"],o={},s=void 0,d={unversionedId:"api/Adapters/AWS/SNSAdapter/SNSAdapter",id:"api/Adapters/AWS/SNSAdapter/SNSAdapter",title:"SNSAdapter",description:"@h4ad/serverless-adapter &gt; SNSAdapter",source:"@site/docs/api/Adapters/AWS/SNSAdapter/SNSAdapter.md",sourceDirName:"api/Adapters/AWS/SNSAdapter",slug:"/api/Adapters/AWS/SNSAdapter/",permalink:"/docs/api/Adapters/AWS/SNSAdapter/",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/AWS/SNSAdapter/SNSAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"OldLambdaEdgeBody",permalink:"/docs/api/Adapters/AWS/LambdaEdgeAdapter/OldLambdaEdgeBody"},next:{title:"SNSAdapterOptions",permalink:"/docs/api/Adapters/AWS/SNSAdapter/SNSAdapterOptions"}},i={},u=[{value:"(class) SNSAdapter",id:"class-snsadapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(property) options",id:"property-options",level:2}],m={toc:u};function c(e){var t=e.components,r=(0,n.Z)(e,l);return(0,p.kt)("wrapper",(0,a.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,p.kt)("p",null,(0,p.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,p.kt)("a",{parentName:"p",href:"/docs/api/Adapters/AWS/SNSAdapter"},"SNSAdapter")),(0,p.kt)("h2",{id:"class-snsadapter"},"(class) SNSAdapter"),(0,p.kt)("p",null,"The adapter to handle requests from AWS SNS."),(0,p.kt)("p",null,"The option of ",(0,p.kt)("inlineCode",{parentName:"p"},"responseWithErrors")," is ignored by this adapter and we always call ",(0,p.kt)("inlineCode",{parentName:"p"},"resolver.fail")," with the error."),(0,p.kt)("p",null,(0,p.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sns.html"},"Event Reference")),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class SNSAdapter implements AdapterContract<SNSEvent, Context, IEmptyResponse> \n")),(0,p.kt)("p",null,"Implements: ",(0,p.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")," ","<","SNSEvent, Context, ",(0,p.kt)("a",{parentName:"p",href:"/docs/api/Core/Constants/IEmptyResponse"},"IEmptyResponse")),(0,p.kt)("h2",{id:"example"},"Example"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"const snsForwardPath = '/your/route/sns'; // default /sns\nconst snsForwardMethod = 'POST'; // default POST\nconst adapter = new SNSAdapter({ snsForwardPath, snsForwardMethod });\n")),(0,p.kt)("h2",{id:"constructor"},"(constructor)"),(0,p.kt)("p",null,"Default constructor"),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"constructor(options?: SNSAdapterOptions | undefined);\n")),(0,p.kt)("h3",{id:"parameters"},"Parameters"),(0,p.kt)("table",null,(0,p.kt)("thead",{parentName:"table"},(0,p.kt)("tr",{parentName:"thead"},(0,p.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,p.kt)("th",{parentName:"tr",align:null},"Type"),(0,p.kt)("th",{parentName:"tr",align:null},"Description"))),(0,p.kt)("tbody",{parentName:"table"},(0,p.kt)("tr",{parentName:"tbody"},(0,p.kt)("td",{parentName:"tr",align:null},"options"),(0,p.kt)("td",{parentName:"tr",align:null},(0,p.kt)("a",{parentName:"td",href:"/docs/api/Adapters/AWS/SNSAdapter/SNSAdapterOptions"},"SNSAdapterOptions")," ","|"," undefined"),(0,p.kt)("td",{parentName:"tr",align:null},"(Optional) The options to customize the ",(0,p.kt)("a",{parentName:"td",href:"/docs/api/Adapters/AWS/SNSAdapter"},"SNSAdapter"))))),(0,p.kt)("h2",{id:"method-canhandle"},"(method) canHandle"),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"canHandle(event: unknown): event is SNSEvent;\n")),(0,p.kt)("h3",{id:"parameters-1"},"Parameters"),(0,p.kt)("table",null,(0,p.kt)("thead",{parentName:"table"},(0,p.kt)("tr",{parentName:"thead"},(0,p.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,p.kt)("th",{parentName:"tr",align:null},"Type"),(0,p.kt)("th",{parentName:"tr",align:null},"Description"))),(0,p.kt)("tbody",{parentName:"table"},(0,p.kt)("tr",{parentName:"tbody"},(0,p.kt)("td",{parentName:"tr",align:null},"event"),(0,p.kt)("td",{parentName:"tr",align:null},"unknown"),(0,p.kt)("td",{parentName:"tr",align:null})))),(0,p.kt)("p",null,"Returns:"),(0,p.kt)("p",null,"event is SNSEvent"),(0,p.kt)("h2",{id:"method-getadaptername"},"(method) getAdapterName"),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"getAdapterName(): string;\n")),(0,p.kt)("p",null,"Returns:"),(0,p.kt)("p",null,"string"),(0,p.kt)("h2",{id:"method-getrequest"},"(method) getRequest"),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"getRequest(event: SNSEvent): AdapterRequest;\n")),(0,p.kt)("h3",{id:"parameters-2"},"Parameters"),(0,p.kt)("table",null,(0,p.kt)("thead",{parentName:"table"},(0,p.kt)("tr",{parentName:"thead"},(0,p.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,p.kt)("th",{parentName:"tr",align:null},"Type"),(0,p.kt)("th",{parentName:"tr",align:null},"Description"))),(0,p.kt)("tbody",{parentName:"table"},(0,p.kt)("tr",{parentName:"tbody"},(0,p.kt)("td",{parentName:"tr",align:null},"event"),(0,p.kt)("td",{parentName:"tr",align:null},"SNSEvent"),(0,p.kt)("td",{parentName:"tr",align:null})))),(0,p.kt)("p",null,"Returns:"),(0,p.kt)("p",null,(0,p.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract/AdapterRequest"},"AdapterRequest")),(0,p.kt)("h2",{id:"method-getresponse"},"(method) getResponse"),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"getResponse(): IEmptyResponse;\n")),(0,p.kt)("p",null,"Returns:"),(0,p.kt)("p",null,(0,p.kt)("a",{parentName:"p",href:"/docs/api/Core/Constants/IEmptyResponse"},"IEmptyResponse")),(0,p.kt)("h2",{id:"method-onerrorwhileforwarding"},"(method) onErrorWhileForwarding"),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"onErrorWhileForwarding({ error, delegatedResolver, }: OnErrorProps<SNSEvent, IEmptyResponse>): void;\n")),(0,p.kt)("h3",{id:"parameters-3"},"Parameters"),(0,p.kt)("table",null,(0,p.kt)("thead",{parentName:"table"},(0,p.kt)("tr",{parentName:"thead"},(0,p.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,p.kt)("th",{parentName:"tr",align:null},"Type"),(0,p.kt)("th",{parentName:"tr",align:null},"Description"))),(0,p.kt)("tbody",{parentName:"table"},(0,p.kt)("tr",{parentName:"tbody"},(0,p.kt)("td",{parentName:"tr",align:null},"{ error, delegatedResolver, }"),(0,p.kt)("td",{parentName:"tr",align:null},(0,p.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/OnErrorProps"},"OnErrorProps")," ","<","SNSEvent, ",(0,p.kt)("a",{parentName:"td",href:"/docs/api/Core/Constants/IEmptyResponse"},"IEmptyResponse")," ",">"),(0,p.kt)("td",{parentName:"tr",align:null})))),(0,p.kt)("p",null,"Returns:"),(0,p.kt)("p",null,"void"),(0,p.kt)("h2",{id:"property-options"},"(property) options"),(0,p.kt)("p",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly options?: SNSAdapterOptions | undefined;\n")))}c.isMDXComponent=!0}}]);