"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2773],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>h});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},m=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),u=p(a),h=r,c=u["".concat(l,".").concat(h)]||u[h]||d[h]||i;return a?n.createElement(c,s(s({ref:t},m),{},{components:a})):n.createElement(c,s({ref:t},m))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,s=new Array(i);s[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var p=2;p<i;p++)s[p]=a[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},1309:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={slug:"the-beginning",title:"The Beginning",authors:["h4ad"],tags:["serverless-adapter"]},s=void 0,o={permalink:"/blog/the-beginning",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/blog/2022-06-17-the-beginning.mdx",source:"@site/blog/2022-06-17-the-beginning.mdx",title:"The Beginning",description:"Hello, welcome to my new library to help you integrate your API with the serverless world.",date:"2022-06-17T00:00:00.000Z",formattedDate:"June 17, 2022",tags:[{label:"serverless-adapter",permalink:"/blog/tags/serverless-adapter"}],readingTime:1.89,hasTruncateMarker:!1,authors:[{name:"Vin\xedcius Louren\xe7o",title:"Maintainer of Serverless Adapter",url:"https://github.com/h4ad",imageURL:"https://github.com/h4ad.png",key:"h4ad"}],frontMatter:{slug:"the-beginning",title:"The Beginning",authors:["h4ad"],tags:["serverless-adapter"]},prevItem:{title:"Updates and Releases",permalink:"/blog/updates-and-releases"}},l={authorsImageUrls:[void 0]},p=[{value:"The development",id:"the-development",level:2},{value:"About me",id:"about-me",level:2},{value:"Inspiration",id:"inspiration",level:2},{value:"Credits",id:"credits",level:2},{value:"You can use it right now!",id:"you-can-use-it-right-now",level:2}],m={toc:p};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Hello, welcome to my new library to help you integrate your API with the serverless world."),(0,r.kt)("h2",{id:"the-development"},"The development"),(0,r.kt)("p",null,"It took me almost 5 months to build this library, refactoring was easy and testing was challenging, but documenting this library was the hardest part."),(0,r.kt)("p",null,"It took me almost 2 weeks to refactor ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/vendia/serverless-express"},"@vendia/serverless-express"),",\nabout 1 and a half month to create tests with 99% coverage and the rest of the time I spent creating documentation for this library."),(0,r.kt)("p",null,"I currently added support for:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"AWS",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/lambda/latest/dg/services-alb.html"},"AWS Load Balancer")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/aws/alb"},"AlbAdapter"),")"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html"},"AWS Api Gateway V1")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/aws/api-gateway-v1"},"ApiGatewayV1Adapter"),")"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html"},"AWS Api Gateway V2")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/aws/api-gateway-v2"},"ApiGatewayV2Adapter"),")"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html"},"AWS DynamoDB")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/aws/dynamodb"},"DynamoDBAdapter"),")"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html"},"AWS Event Bridge / CloudWatch Events")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/aws/event-bridge"},"EventBridgeAdapter"),")"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html"},"AWS Lambda Edge")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/aws/lambda-edge"},"LambdaEdgeAdapter"),")"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sns.html"},"AWS SNS")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/aws/sns"},"SNSAdapter"),")"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sqs.html"},"AWS SQS")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/aws/sqs"},"SQSAdapter"),")"))),(0,r.kt)("li",{parentName:"ul"},"Huawei",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://support.huaweicloud.com/intl/en-us/usermanual-functiongraph/functiongraph_01_1442.html"},"Http Function"),": Look ",(0,r.kt)("a",{parentName:"li",href:"/docs/main/handlers/huawei#http-function"},"this section"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://support.huaweicloud.com/intl/en-us/usermanual-functiongraph/functiongraph_01_1441.html"},"Event Function"),": Look ",(0,r.kt)("a",{parentName:"li",href:"/docs/main/handlers/huawei#event-function"},"this section"),".",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://support.huaweicloud.com/intl/en-us/devg-functiongraph/functiongraph_02_0102.html#functiongraph_02_0102__li5178638110137"},"Api Gateway")," by using (",(0,r.kt)("a",{parentName:"li",href:"/docs/main/adapters/huawei/huawei-api-gateway"},"HuaweiApiGatewayAdapter"),").")))))),(0,r.kt)("p",null,"But it's just the beginning, I'm going to build more adapters to integrate with as much of the cloud as possible, just to be able to deploy my APIs on any cloud."),(0,r.kt)("h2",{id:"about-me"},"About me"),(0,r.kt)("p",null,"I am a student at ",(0,r.kt)("a",{parentName:"p",href:"https://facens.br/"},"Facens")," university and I work for ",(0,r.kt)("a",{parentName:"p",href:"https://liga.facens.br/"},"Liga"),", which is a sector within Facens that develops applications, websites, games and much more fun stuff."),(0,r.kt)("p",null,"I currently work on this library only in my spare time and I need to balance my Final Theses and my overtime projects so it was very challenging but I am happy with the end result of this library."),(0,r.kt)("h2",{id:"inspiration"},"Inspiration"),(0,r.kt)("p",null,"This library was originally created to help my company reduce costs with AWS SQS, but it has since turned into something I can spend my time developing and learning English because I'm not a native speaker (as typing problems might suggest) writing all the documentation in English."),(0,r.kt)("h2",{id:"credits"},"Credits"),(0,r.kt)("p",null,"I need to thank ",(0,r.kt)("a",{parentName:"p",href:"https://vendia.net/"},"@vendia")," for developing ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/vendia/serverless-express"},"@vendia/serverless-express"),", all logic and code I finished to refactor from the code I read on serverless-express.\nI also have many thanks to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/guichaguri"},"Chaguri"),", ",(0,r.kt)("a",{parentName:"p",href:"https://liga.facens.br/"},"Liga")," and many other people who gave me time and insights to create this library."),(0,r.kt)("h2",{id:"you-can-use-it-right-now"},"You can use it right now!"),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"/docs/main/intro"},"Introduction")," section to know more about the library."))}d.isMDXComponent=!0}}]);