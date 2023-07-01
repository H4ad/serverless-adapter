"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[983],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>w});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},p=Object.keys(e);for(r=0;r<p.length;r++)a=p[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)a=p[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=r.createContext({}),s=function(e){var t=r.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=s(e.components);return r.createElement(o.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,p=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(a),c=n,w=d["".concat(o,".").concat(c)]||d[c]||m[c]||p;return a?r.createElement(w,i(i({ref:t},u),{},{components:a})):r.createElement(w,i({ref:t},u))}));function w(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=a.length,i=new Array(p);i[0]=c;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[d]="string"==typeof e?e:n,i[1]=l;for(var s=2;s<p;s++)i[s]=a[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}c.displayName="MDXCreateElement"},7327:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>m,frontMatter:()=>p,metadata:()=>l,toc:()=>s});var r=a(7462),n=(a(7294),a(3905));const p={},i=void 0,l={unversionedId:"api/Adapters/Huawei/HuaweiApiGatewayAdapter/HuaweiApiGatewayAdapter",id:"api/Adapters/Huawei/HuaweiApiGatewayAdapter/HuaweiApiGatewayAdapter",title:"HuaweiApiGatewayAdapter",description:"@h4ad/serverless-adapter &gt; HuaweiApiGatewayAdapter",source:"@site/docs/api/Adapters/Huawei/HuaweiApiGatewayAdapter/HuaweiApiGatewayAdapter.md",sourceDirName:"api/Adapters/Huawei/HuaweiApiGatewayAdapter",slug:"/api/Adapters/Huawei/HuaweiApiGatewayAdapter/",permalink:"/docs/api/Adapters/Huawei/HuaweiApiGatewayAdapter/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Adapters/Huawei/HuaweiApiGatewayAdapter/HuaweiApiGatewayAdapter.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"DummyAdapter",permalink:"/docs/api/Adapters/DummyAdapter/"},next:{title:"HuaweiApiGatewayOptions",permalink:"/docs/api/Adapters/Huawei/HuaweiApiGatewayAdapter/HuaweiApiGatewayOptions"}},o={},s=[{value:"(class) HuaweiApiGatewayAdapter",id:"class-huaweiapigatewayadapter",level:2},{value:"Example",id:"example",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(method) canHandle",id:"method-canhandle",level:2},{value:"Parameters",id:"parameters-1",level:3},{value:"(method) getAdapterName",id:"method-getadaptername",level:2},{value:"(method) getPathFromEvent",id:"method-getpathfromevent",level:2},{value:"Parameters",id:"parameters-2",level:3},{value:"(method) getRequest",id:"method-getrequest",level:2},{value:"Parameters",id:"parameters-3",level:3},{value:"(method) getResponse",id:"method-getresponse",level:2},{value:"Parameters",id:"parameters-4",level:3},{value:"(method) onErrorWhileForwarding",id:"method-onerrorwhileforwarding",level:2},{value:"Parameters",id:"parameters-5",level:3},{value:"(property) options",id:"property-options",level:2}],u={toc:s},d="wrapper";function m(e){let{components:t,...a}=e;return(0,n.kt)(d,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Adapters/Huawei/HuaweiApiGatewayAdapter"},"HuaweiApiGatewayAdapter")),(0,n.kt)("h2",{id:"class-huaweiapigatewayadapter"},"(class) HuaweiApiGatewayAdapter"),(0,n.kt)("p",null,"The adapter to handle requests from Huawei Api Gateway"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class HuaweiApiGatewayAdapter implements AdapterContract<HuaweiApiGatewayEvent, HuaweiContext, HuaweiApiGatewayResponse> \n")),(0,n.kt)("p",null,"Implements: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract"},"AdapterContract")," ","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent"},"HuaweiApiGatewayEvent")," , ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Types/Huawei/HuaweiContext"},"HuaweiContext")," , ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Types/Huawei/HuaweiApiGatewayResponse"},"HuaweiApiGatewayResponse")," ",">"),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"const stripBasePath = '/any/custom/base/path'; // default ''\nconst adapter = new ApiGatewayAdapter({ stripBasePath });\n")),(0,n.kt)("h2",{id:"constructor"},"(constructor)"),(0,n.kt)("p",null,"Default constructor"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"constructor(options?: HuaweiApiGatewayOptions | undefined);\n")),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"options"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Adapters/Huawei/HuaweiApiGatewayAdapter/HuaweiApiGatewayOptions"},"HuaweiApiGatewayOptions")," ","|"," undefined"),(0,n.kt)("td",{parentName:"tr",align:null},"(Optional) The options to customize the ",(0,n.kt)("a",{parentName:"td",href:"/docs/api/Adapters/Huawei/HuaweiApiGatewayAdapter"},"HuaweiApiGatewayAdapter"))))),(0,n.kt)("h2",{id:"method-canhandle"},"(method) canHandle"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"canHandle(event: unknown): event is HuaweiApiGatewayEvent;\n")),(0,n.kt)("h3",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},"unknown"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"event is ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent"},"HuaweiApiGatewayEvent")),(0,n.kt)("h2",{id:"method-getadaptername"},"(method) getAdapterName"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getAdapterName(): string;\n")),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"string"),(0,n.kt)("h2",{id:"method-getpathfromevent"},"(method) getPathFromEvent"),(0,n.kt)("p",null,"Get path from event with query strings"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"protected getPathFromEvent(event: HuaweiApiGatewayEvent): string;\n")),(0,n.kt)("h3",{id:"parameters-2"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent"},"HuaweiApiGatewayEvent")),(0,n.kt)("td",{parentName:"tr",align:null},"The event sent by serverless")))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"string"),(0,n.kt)("h2",{id:"method-getrequest"},"(method) getRequest"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getRequest(event: HuaweiApiGatewayEvent): AdapterRequest;\n")),(0,n.kt)("h3",{id:"parameters-3"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"event"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent"},"HuaweiApiGatewayEvent")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Contracts/AdapterContract/AdapterRequest"},"AdapterRequest")),(0,n.kt)("h2",{id:"method-getresponse"},"(method) getResponse"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"getResponse({ headers: responseHeaders, body, isBase64Encoded, statusCode, }: GetResponseAdapterProps<HuaweiApiGatewayEvent>): HuaweiApiGatewayResponse;\n")),(0,n.kt)("h3",{id:"parameters-4"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"{ headers: responseHeaders, body, isBase64Encoded, statusCode, }"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/GetResponseAdapterProps"},"GetResponseAdapterProps")," ","<",(0,n.kt)("a",{parentName:"td",href:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent"},"HuaweiApiGatewayEvent")," ",">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Types/Huawei/HuaweiApiGatewayResponse"},"HuaweiApiGatewayResponse")),(0,n.kt)("h2",{id:"method-onerrorwhileforwarding"},"(method) onErrorWhileForwarding"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"onErrorWhileForwarding({ error, delegatedResolver, respondWithErrors, event, log, }: OnErrorProps<HuaweiApiGatewayEvent, HuaweiApiGatewayResponse>): void;\n")),(0,n.kt)("h3",{id:"parameters-5"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"{ error, delegatedResolver, respondWithErrors, event, log, }"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/Contracts/AdapterContract/OnErrorProps"},"OnErrorProps")," ","<",(0,n.kt)("a",{parentName:"td",href:"/docs/api/Types/Huawei/HuaweiApiGatewayEvent"},"HuaweiApiGatewayEvent")," , ",(0,n.kt)("a",{parentName:"td",href:"/docs/api/Types/Huawei/HuaweiApiGatewayResponse"},"HuaweiApiGatewayResponse")," ",">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("p",null,"Returns:"),(0,n.kt)("p",null,"void"),(0,n.kt)("h2",{id:"property-options"},"(property) options"),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly options?: HuaweiApiGatewayOptions | undefined;\n")))}m.isMDXComponent=!0}}]);