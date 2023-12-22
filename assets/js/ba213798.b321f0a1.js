"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3439],{5447:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var r=n(5893),a=n(1151),s=n(5162),l=n(4866);const i={title:"Installation",position:1,description:"See more about how to install this library."},o=void 0,u={id:"main/getting-started/installation",title:"Installation",description:"See more about how to install this library.",source:"@site/docs/main/getting-started/installation.mdx",sourceDirName:"main/getting-started",slug:"/main/getting-started/installation",permalink:"/docs/main/getting-started/installation",draft:!1,unlisted:!1,editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/docs/main/getting-started/installation.mdx",tags:[],version:"current",frontMatter:{title:"Installation",position:1,description:"See more about how to install this library."},sidebar:"main",previous:{title:"Getting Started",permalink:"/docs/category/getting-started"},next:{title:"Usage",permalink:"/docs/main/getting-started/usage"}},c={},d=[{value:"Requirements",id:"requirements",level:2},{value:"Installing",id:"installing",level:2}];function h(e){const t={code:"code",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)("a",{href:"https://www.npmjs.com/package/@h4ad/serverless-adapter",children:"Serverless Adapter package"})," has everything you need to start."]}),"\n",(0,r.jsx)(t.h2,{id:"requirements",children:"Requirements"}),"\n",(0,r.jsx)(t.p,{children:"Current versions supported by this library are 18.x and 20.x."}),"\n",(0,r.jsx)(t.h2,{id:"installing",children:"Installing"}),"\n",(0,r.jsx)(t.p,{children:"First, inside your project, run the following command:"}),"\n",(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(s.Z,{value:"npm",label:"NPM",default:!0,children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"  npm run i --save @h4ad/serverless-adapter\n"})})}),(0,r.jsx)(s.Z,{value:"yarn",label:"Yarn",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"yarn add @h4ad/serverless-adapter\n"})})})]})]})}function p(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},5162:(e,t,n)=>{n.d(t,{Z:()=>l});n(7294);var r=n(512);const a={tabItem:"tabItem_Ymn6"};var s=n(5893);function l(e){let{children:t,hidden:n,className:l}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.Z)(a.tabItem,l),hidden:n,children:t})}},4866:(e,t,n)=>{n.d(t,{Z:()=>j});var r=n(7294),a=n(512),s=n(2466),l=n(6550),i=n(469),o=n(1980),u=n(7392),c=n(12);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const a=(0,l.k6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o._X)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(a.location.search);t.set(s,e),a.replace({...a.location,search:t.toString()})}),[s,a])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,s=h(e),[l,o]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[u,d]=m({queryString:n,groupId:a}),[b,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,s]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:a}),g=(()=>{const e=u??b;return p({value:e,tabValues:s})?e:null})();(0,i.Z)((()=>{g&&o(g)}),[g]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),f(e)}),[d,f,s]),tabValues:s}}var f=n(2389);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=n(5893);function x(e){let{className:t,block:n,selectedValue:r,selectValue:l,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:u}=(0,s.o5)(),c=e=>{const t=e.currentTarget,n=o.indexOf(t),a=i[n].value;a!==r&&(u(t),l(a))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;t=o[n]??o[0];break}case"ArrowLeft":{const n=o.indexOf(e.currentTarget)-1;t=o[n]??o[o.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>o.push(e),onKeyDown:d,onClick:c,...s,className:(0,a.Z)("tabs__item",g.tabItem,s?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:a}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function w(e){const t=b(e);return(0,v.jsxs)("div",{className:(0,a.Z)("tabs-container",g.tabList),children:[(0,v.jsx)(x,{...e,...t}),(0,v.jsx)(y,{...e,...t})]})}function j(e){const t=(0,f.Z)();return(0,v.jsx)(w,{...e,children:d(e.children)},String(t))}},1151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>l});var r=n(7294);const a={},s=r.createContext(a);function l(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);