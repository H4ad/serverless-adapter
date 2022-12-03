"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5774],{3905:(r,e,a)=>{a.d(e,{Zo:()=>c,kt:()=>k});var t=a(7294);function o(r,e,a){return e in r?Object.defineProperty(r,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[e]=a,r}function n(r,e){var a=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),a.push.apply(a,t)}return a}function d(r){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach((function(e){o(r,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(a,e))}))}return r}function s(r,e){if(null==r)return{};var a,t,o=function(r,e){if(null==r)return{};var a,t,o={},n=Object.keys(r);for(t=0;t<n.length;t++)a=n[t],e.indexOf(a)>=0||(o[a]=r[a]);return o}(r,e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);for(t=0;t<n.length;t++)a=n[t],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(r,a)&&(o[a]=r[a])}return o}var l=t.createContext({}),p=function(r){var e=t.useContext(l),a=e;return r&&(a="function"==typeof r?r(e):d(d({},e),r)),a},c=function(r){var e=p(r.components);return t.createElement(l.Provider,{value:e},r.children)},m={inlineCode:"code",wrapper:function(r){var e=r.children;return t.createElement(t.Fragment,{},e)}},i=t.forwardRef((function(r,e){var a=r.components,o=r.mdxType,n=r.originalType,l=r.parentName,c=s(r,["components","mdxType","originalType","parentName"]),i=p(a),k=o,u=i["".concat(l,".").concat(k)]||i[k]||m[k]||n;return a?t.createElement(u,d(d({ref:e},c),{},{components:a})):t.createElement(u,d({ref:e},c))}));function k(r,e){var a=arguments,o=e&&e.mdxType;if("string"==typeof r||o){var n=a.length,d=new Array(n);d[0]=i;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=r,s.mdxType="string"==typeof r?r:o,d[1]=s;for(var p=2;p<n;p++)d[p]=a[p];return t.createElement.apply(null,d)}return t.createElement.apply(null,a)}i.displayName="MDXCreateElement"},1701:(r,e,a)=>{a.r(e),a.d(e,{assets:()=>l,contentTitle:()=>d,default:()=>m,frontMatter:()=>n,metadata:()=>s,toc:()=>p});var t=a(7462),o=(a(7294),a(3905));const n={},d=void 0,s={unversionedId:"api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework/UrlencodedBodyParserFramework",id:"api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework/UrlencodedBodyParserFramework",title:"UrlencodedBodyParserFramework",description:"@h4ad/serverless-adapter &gt; UrlencodedBodyParserFramework",source:"@site/docs/api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework/UrlencodedBodyParserFramework.md",sourceDirName:"api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework",slug:"/api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework/",permalink:"/docs/api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework/",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework/UrlencodedBodyParserFramework.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"TextBodyParserFrameworkOptions",permalink:"/docs/api/Frameworks/BodyParserFramework/TextBodyParserFramework/TextBodyParserFrameworkOptions"},next:{title:"UrlencodedBodyParserFrameworkOptions",permalink:"/docs/api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework/UrlencodedBodyParserFrameworkOptions"}},l={},p=[{value:"(class) UrlencodedBodyParserFramework",id:"class-urlencodedbodyparserframework",level:2},{value:"(constructor)",id:"constructor",level:2},{value:"Parameters",id:"parameters",level:3},{value:"(property) framework",id:"property-framework",level:2}],c={toc:p};function m(r){let{components:e,...a}=r;return(0,o.kt)("wrapper",(0,t.Z)({},c,a,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework"},"UrlencodedBodyParserFramework")),(0,o.kt)("h2",{id:"class-urlencodedbodyparserframework"},"(class) UrlencodedBodyParserFramework"),(0,o.kt)("p",null,"The body-parser class used to parse application/x-www-form-urlencoded."),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare class UrlencodedBodyParserFramework<TApp> extends BaseBodyParserFramework<TApp> implements FrameworkContract<TApp> \n")),(0,o.kt)("p",null,"Extends: ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/BodyParserFramework/BaseBodyParserFramework"},"BaseBodyParserFramework")),(0,o.kt)("p",null,"Implements: ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/Contracts/FrameworkContract"},"FrameworkContract")),(0,o.kt)("h2",{id:"constructor"},"(constructor)"),(0,o.kt)("p",null,"Default Constructor"),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"constructor(framework: FrameworkContract<TApp>, options?: UrlencodedBodyParserFrameworkOptions);\n")),(0,o.kt)("h3",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"framework"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"/docs/api/Contracts/FrameworkContract"},"FrameworkContract")," ","<","TApp",">"),(0,o.kt)("td",{parentName:"tr",align:null})),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"options"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"/docs/api/Frameworks/BodyParserFramework/UrlencodedBodyParserFramework/UrlencodedBodyParserFrameworkOptions"},"UrlencodedBodyParserFrameworkOptions")),(0,o.kt)("td",{parentName:"tr",align:null},"(Optional)")))),(0,o.kt)("h2",{id:"property-framework"},"(property) framework"),(0,o.kt)("p",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"protected readonly framework: FrameworkContract<TApp>;\n")))}m.isMDXComponent=!0}}]);