"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3648],{3905:(e,r,t)=>{t.d(r,{Zo:()=>m,kt:()=>d});var o=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=o.createContext({}),i=function(e){var r=o.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},m=function(e){var r=i(e.components);return o.createElement(s.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},u=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),u=i(t),d=n,k=u["".concat(s,".").concat(d)]||u[d]||l[d]||a;return t?o.createElement(k,p(p({ref:r},m),{},{components:t})):o.createElement(k,p({ref:r},m))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,p=new Array(a);p[0]=u;var c={};for(var s in r)hasOwnProperty.call(r,s)&&(c[s]=r[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,p[1]=c;for(var i=2;i<a;i++)p[i]=t[i];return o.createElement.apply(null,p)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},2398:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>p,default:()=>l,frontMatter:()=>a,metadata:()=>c,toc:()=>i});var o=t(7462),n=(t(7294),t(3905));const a={},p=void 0,c={unversionedId:"api/Frameworks/TrpcFramework/TrpcFrameworkOptions",id:"api/Frameworks/TrpcFramework/TrpcFrameworkOptions",title:"TrpcFrameworkOptions",description:"@h4ad/serverless-adapter &gt; TrpcFrameworkOptions",source:"@site/docs/api/Frameworks/TrpcFramework/TrpcFrameworkOptions.md",sourceDirName:"api/Frameworks/TrpcFramework",slug:"/api/Frameworks/TrpcFramework/TrpcFrameworkOptions",permalink:"/docs/api/Frameworks/TrpcFramework/TrpcFrameworkOptions",draft:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/api/Frameworks/TrpcFramework/TrpcFrameworkOptions.md",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"TrpcAdapterContext",permalink:"/docs/api/Frameworks/TrpcFramework/TrpcAdapterContext"},next:{title:"AzureHandler",permalink:"/docs/api/Handlers/AzureHandler/"}},s={},i=[{value:"(type) TrpcFrameworkOptions",id:"type-trpcframeworkoptions",level:2}],m={toc:i};function l(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,o.Z)({},m,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/Introduction"},"@h4ad/serverless-adapter")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/TrpcFramework/TrpcFrameworkOptions"},"TrpcFrameworkOptions")),(0,n.kt)("h2",{id:"type-trpcframeworkoptions"},"(type) TrpcFrameworkOptions"),(0,n.kt)("p",null,"The options to customize the ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/TrpcFramework"},"TrpcFramework")),(0,n.kt)("p",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type TrpcFrameworkOptions<TContext> = Omit<NodeHTTPHandlerOptions<AnyRouter<TContext>, IncomingMessage, ServerResponse>, 'router' | 'createContext'> & {\n    createContext?: (opts: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>) => Omit<TContext, keyof TrpcAdapterBaseContext> | Promise<Omit<TContext, keyof TrpcAdapterBaseContext>>;\n};\n")),(0,n.kt)("p",null,"References: ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/Frameworks/TrpcFramework/TrpcAdapterBaseContext"},"TrpcAdapterBaseContext")))}l.isMDXComponent=!0}}]);