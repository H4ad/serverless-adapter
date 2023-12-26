"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6475],{7784:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=s(5893),i=s(1151),o=s(1007);const a={slug:"dual-package-publish",title:"Support for Dual Package Publish",authors:["h4ad"],tags:["serverless-adapter","cjs","esm","npm","package","publish"],image:"https://images.unsplash.com/photo-1429743305873-d4065c15f93e"},r=void 0,l={permalink:"/blog/dual-package-publish",editUrl:"https://github.com/H4ad/serverless-adapter/tree/main/www/blog/2023-12-25-dual-package-publish.mdx",source:"@site/blog/2023-12-25-dual-package-publish.mdx",title:"Support for Dual Package Publish",description:"Two paths inside a forest!",date:"2023-12-25T00:00:00.000Z",formattedDate:"December 25, 2023",tags:[{label:"serverless-adapter",permalink:"/blog/tags/serverless-adapter"},{label:"cjs",permalink:"/blog/tags/cjs"},{label:"esm",permalink:"/blog/tags/esm"},{label:"npm",permalink:"/blog/tags/npm"},{label:"package",permalink:"/blog/tags/package"},{label:"publish",permalink:"/blog/tags/publish"}],readingTime:8.415,hasTruncateMarker:!1,authors:[{name:"Vin\xedcius Louren\xe7o",title:"Maintainer of Serverless Adapter",url:"https://github.com/h4ad",imageURL:"https://github.com/h4ad.png",key:"h4ad"}],frontMatter:{slug:"dual-package-publish",title:"Support for Dual Package Publish",authors:["h4ad"],tags:["serverless-adapter","cjs","esm","npm","package","publish"],image:"https://images.unsplash.com/photo-1429743305873-d4065c15f93e"},unlisted:!1,nextItem:{title:"AWS Lambda Response Streaming",permalink:"/blog/aws-lambda-response-streaming"}},d={authorsImageUrls:[void 0]},c=[{value:"Vite",id:"vite",level:2},{value:"Suggestions from Twitter",id:"suggestions-from-twitter",level:2},{value:"Re-exporting on mjs",id:"re-exporting-on-mjs",level:3},{value:"tsup",id:"tsup",level:3},{value:"package.json exports",id:"packagejson-exports",level:3},{value:"Module not found on moduleResolution <code>node</code>",id:"module-not-found-on-moduleresolution-node",level:3},{value:"publint",id:"publint",level:3},{value:"verdaccio",id:"verdaccio",level:3},{value:"Wrong <code>moduleResolution</code>",id:"wrong-moduleresolution",level:3},{value:"Doubling the package size",id:"doubling-the-package-size",level:2},{value:"Conclusions",id:"conclusions",level:2}];function h(e){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:"https://images.unsplash.com/photo-1429743305873-d4065c15f93e",alt:"Two paths inside a forest!"})}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["Image by ",(0,n.jsx)(t.a,{href:"https://unsplash.com/@madebyjens",children:"Jens Lelie"})," on ",(0,n.jsx)(t.a,{href:"https://unsplash.com",children:"Unsplash"})]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["This feature was initially asked by ",(0,n.jsx)(t.a,{href:"https://github.com/ClementCornut",children:"ClementCornut"})," on issue ",(0,n.jsx)(t.a,{href:"https://github.com/H4ad/serverless-adapter/issues/127",children:"#127"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Initially I was a little unsure whether to publish ",(0,n.jsx)(t.code,{children:"esm"})," and ",(0,n.jsx)(t.code,{children:"cjs"}),", but then I started to like the idea of exporting\nmy packages as ",(0,n.jsx)(t.code,{children:"@h4ad/serverless-adapter/adapters/aws"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"You can use it by installing the new version:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"npm i @h4ad/serverless-adapter@4.0.1\n"})}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsx)(t.p,{children:"The version 4.0.0 was released with a bug that didn't include the package files, so I released the version 4.0.1 to fix this issue."}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["In the previous version, since I only export to ",(0,n.jsx)(t.code,{children:"commonjs"}),", you need to import the files as ",(0,n.jsx)(t.code,{children:"/lib/adapters/aws"}),", which is not bad, but not exactly good.\nThis was necessary because I can't export all files in the default ",(0,n.jsx)(t.code,{children:"export"})," as this will lead you to install all frameworks supported by this library."]}),"\n",(0,n.jsx)(t.p,{children:"But ok, I had some problems while adding support for dual-package publishing which I want to share with you only,\nand especially for my future version if you want to add support for dual-package publishing in your modules."}),"\n",(0,n.jsx)(t.h2,{id:"vite",children:"Vite"}),"\n",(0,n.jsxs)(t.p,{children:["I already use ",(0,n.jsx)(t.code,{children:"vitest"})," test my package and to build the previous versions,\nit works great and is specially fast to run the tests (5.82s to run 456 tests across 52 files)."]}),"\n",(0,n.jsx)(t.p,{children:"But the configuration to build was a little bit nightmare:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",metastring:'title="vite.config.ts"',children:"// some initial configuration lines...\n  ...(!isTest && {\n    esbuild: {\n      format: 'cjs',\n      platform: 'node',\n      target: 'node18',\n      sourcemap: 'external',\n      minifyIdentifiers: false,\n    },\n    build: {\n      outDir: 'lib',\n      emptyOutDir: true,\n      sourcemap: true,\n      lib: {\n        entry: path.resolve(__dirname, 'src/index.ts'),\n        formats: ['cjs'],\n      },\n      rollupOptions: {\n        external: ['yeoman-generator'],\n        input: glob.sync(path.resolve(__dirname, 'src/**/*.ts')),\n        output: {\n          preserveModules: true,\n          entryFileNames: entry => {\n            const { name } = entry;\n\n            const fileName = `${name}.js`;\n\n            return fileName;\n          },\n        },\n      },\n    },\n  }),\n"})}),"\n",(0,n.jsxs)(t.p,{children:["All of this configuration was necessary as I need to build my package to match exactly the same structure as ",(0,n.jsx)(t.code,{children:"src"}),",\nwhich was needed for users to import as ",(0,n.jsx)(t.code,{children:"/lib/adapters/aws"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["On the first attempt, I just tried to extend this configuration, but I spent a few hours and managed to generate\na good package output, but it was missing some details that were very painful to bear, such as correctly emitting ",(0,n.jsx)(t.code,{children:"d.cts"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["If you want to see how it turned out, if you want to try doing this using ",(0,n.jsx)(t.code,{children:"vite"})," directly,\n",(0,n.jsx)(t.a,{href:"https://github.com/H4ad/serverless-adapter/blob/f642739334687b0a22312074a6e225e9f8ac8124/vite.config.ts",children:"here is vite.config.ts"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["But then I started to give up and ",(0,n.jsx)(t.a,{href:"https://twitter.com/vinii_joga10/status/1738954683853451760",children:"tweeted about it"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"suggestions-from-twitter",children:"Suggestions from Twitter"}),"\n",(0,n.jsx)(t.p,{children:"I got some incredible helpful messages on twitter and I will cover those suggestions that I applied to be able to finally support dual package publish."}),"\n",(0,n.jsx)(t.h3,{id:"re-exporting-on-mjs",children:"Re-exporting on mjs"}),"\n",(0,n.jsxs)(t.p,{children:["This was a suggestion from ",(0,n.jsx)(t.a,{href:"https://twitter.com/matteocollina",children:"Matteo Collina"}),", he also sent me the package ",(0,n.jsx)(t.a,{href:"https://github.com/mcollina/snap",children:"snap"})," which does this re-export,\nwhich I also saw being used in ",(0,n.jsx)(t.a,{href:"https://github.com/oramasearch/orama/blob/main/packages/orama/src/cjs/index.cts",children:"Orama"}),", is basically doing this:"]}),"\n",(0,n.jsxs)(o.Z,{url:"https://nodejs.org/api/packages.html#approach-2-isolate-state",children:[(0,n.jsx)(t.p,{children:"Your state:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="./node_modules/pkg/state.cjs"',children:"import Date from 'date';\nconst someDate = new Date();\n"})}),(0,n.jsxs)(t.p,{children:["Define/export on ",(0,n.jsx)(t.code,{children:"cjs"}),"."]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="./node_modules/pkg/index.cjs"',children:"const state = require('./state.cjs');\nmodule.exports.state = state;\n"})}),(0,n.jsxs)(t.p,{children:["Re-export on ",(0,n.jsx)(t.code,{children:"mjs"}),"."]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="./node_modules/pkg/index.mjs"',children:"import state from './state.cjs';\nexport {\nstate,\n};\n"})})]}),"\n",(0,n.jsx)(t.p,{children:"This way, I solve the problem of state isolation, but I will need:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"or manually export all these files"}),"\n",(0,n.jsx)(t.li,{children:"or use a tool to automate this process"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Both ways will be a bit painful to maintain, so I didn't go that route."}),"\n",(0,n.jsx)(t.p,{children:"This approach can be fine if your library maintains state and the codebase is pure javascript."}),"\n",(0,n.jsx)(t.h3,{id:"tsup",children:"tsup"}),"\n",(0,n.jsxs)(t.p,{children:["Instead of trying to go through this configuration hell in ",(0,n.jsx)(t.code,{children:"vite"}),", ",(0,n.jsx)(t.a,{href:"https://twitter.com/MicheleRivaCode",children:"Michele Riva"}),"\nsuggested ",(0,n.jsx)(t.a,{href:"https://tsup.egoist.dev/",children:"tsup"})," which is incredibly easy to use."]}),"\n",(0,n.jsxs)(t.p,{children:["I spent less than 10 minutes to generate almost the same output as the previous configuration with ",(0,n.jsx)(t.code,{children:"vite"}),",\nbut this time the output was correct, with ",(0,n.jsx)(t.code,{children:"d.cts"})," files being generated."]}),"\n",(0,n.jsx)(t.p,{children:"My configuration file now looks like this:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",metastring:'title="tsup.config.ts"',children:"export default defineConfig({\n  outDir: './lib',\n  clean: true,\n  dts: true,\n  format: ['esm', 'cjs'],\n  outExtension: ({ format }) => ({\n    js: format === 'cjs' ? '.cjs' : '.mjs',\n  }),\n  cjsInterop: true,\n  // the libEntries is basically all the entries I need to export,\n  // like: adapters/aws, frameworks/fastify, etc...\n  entry: ['src/index.ts', ...libEntries],\n  sourcemap: true,\n  skipNodeModulesBundle: true,\n  minify: true,\n  target: 'es2022',\n  tsconfig: './tsconfig.build.json',\n  keepNames: true,\n  bundle: true,\n});\n"})}),"\n",(0,n.jsx)(t.h3,{id:"packagejson-exports",children:"package.json exports"}),"\n",(0,n.jsxs)(t.p,{children:["Since I have a lot of things to export, I also automate the configuration of ",(0,n.jsx)(t.code,{children:"exports"})," in ",(0,n.jsx)(t.code,{children:"package.json"})," with:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",metastring:'title="tsup.config.ts"',children:"// I do the same for adapters, frameworks and handlers\nconst resolvers = ['aws-context', 'callback', 'dummy', 'promise'];\n\nconst libEntries = [\n  ...resolvers.map(resolver => `src/resolvers/${resolver}/index.ts`),\n];\n\nconst createExport = (filePath: string) => ({\n  import: {\n    types: `./lib/${filePath}.d.ts`,\n    default: `./lib/${filePath}.mjs`,\n  },\n  require: {\n    types: `./lib/${filePath}.d.cts`,\n    default: `./lib/${filePath}.cjs`,\n  },\n});\n\nconst createExportReducer =\n  (initialPath: string) => (acc: object, name: string) => {\n    acc[`./${initialPath}/${name}`] = createExport(\n      `${initialPath}/${name}/index`,\n    );\n\n    acc[`./lib/${initialPath}/${name}`] = createExport(\n      `${initialPath}/${name}/index`,\n    );\n\n    return acc;\n  };\n\nconst packageExports = {\n  '.': createExport('index'),\n  ...resolvers.reduce(createExportReducer('resolvers'), {}),\n  // and I also do the same for adapters, frameworks and handlers.\n};\n\n// this command does the magic to update my package.json\nexecSync(`npm pkg set exports='${JSON.stringify(packageExports)}' --json`);\n"})}),"\n",(0,n.jsxs)(t.p,{children:["This works incredible and also keep my ",(0,n.jsx)(t.code,{children:"package.json"})," updated."]}),"\n",(0,n.jsxs)(t.h3,{id:"module-not-found-on-moduleresolution-node",children:["Module not found on moduleResolution ",(0,n.jsx)(t.code,{children:"node"})]}),"\n",(0,n.jsxs)(t.p,{children:["But there is one thing you should pay attention to, did you see that I export files with the prefix ",(0,n.jsx)(t.code,{children:"./lib"}),"?"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",metastring:'title="package.json"',children:'  "exports": {\n    "./adapters/apollo-server": {...},\n    "./lib/adapters/apollo-server": {...},\n  }\n'})}),"\n",(0,n.jsxs)(t.p,{children:["The content of both is the same, but I do this to be compatible with the resolution of ",(0,n.jsx)(t.code,{children:"node"}),".\nWithout this configuration, the ",(0,n.jsx)(t.code,{children:"IDE"})," will show the import to ",(0,n.jsx)(t.code,{children:"@h4ad/serverless-adapter/adapters/apollo-server"})," as resolved, but\n",(0,n.jsx)(t.code,{children:"node"})," will not be able to find the file during the runtime."]}),"\n",(0,n.jsxs)(t.p,{children:["And the interesting part of doing this is that people who import this package with ",(0,n.jsx)(t.code,{children:"/lib"})," will still be able to import the code,\nand they won't need any code modifications."]}),"\n",(0,n.jsx)(t.p,{children:"Maybe I could release this feature without it being a breaking change with this change, but to be on the safe side,\nI released it as a breaking change anyway."}),"\n",(0,n.jsx)(t.h3,{id:"publint",children:"publint"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.a,{href:"https://publint.dev/",children:"publint"})," is a tool that I learned on ",(0,n.jsx)(t.a,{href:"https://blog.isquaredsoftware.com/2023/08/esm-modernization-lessons/#early-attempts",children:"ESM Modernization Lessons"})," inside ",(0,n.jsx)(t.code,{children:"Early Attempts"}),",\nthis article was a suggestion by ",(0,n.jsx)(t.a,{href:"https://twitter.com/LucaRams23",children:"Luca Micieli"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["With this tool, I detect several problems with the ",(0,n.jsx)(t.code,{children:"exports"})," configuration and this will make your life a lot easier."]}),"\n",(0,n.jsxs)(t.p,{children:["But this tool has a problem that they didn't catch, and this problem was pointed out by ",(0,n.jsx)(t.a,{href:"https://twitter.com/MicheleRivaCode",children:"Michele Riva"}),", instead:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",metastring:'title="package.json"',children:'"exports": {\n  "resolvers/promise": {\n'})}),"\n",(0,n.jsxs)(t.p,{children:["I should export it with the prefix ",(0,n.jsx)(t.code,{children:"./"}),":"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",metastring:'title="package.json"',children:'"exports": {\n  "./resolvers/promise": {\n'})}),"\n",(0,n.jsx)(t.p,{children:"This small detail can make your configuration fail."}),"\n",(0,n.jsx)(t.h3,{id:"verdaccio",children:"verdaccio"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.a,{href:"https://verdaccio.org/",children:"verdaccio"})," was suggested by ",(0,n.jsx)(t.a,{href:"https://twitter.com/imabhiprasad",children:"Abhijeet Prasad"}),", with this tool you can have your private registry that you can use to test,\nAbhijeet use this tool on ",(0,n.jsx)(t.a,{href:"https://sentry.io/",children:"Sentry"})," SDKs to do e2e tests."]}),"\n",(0,n.jsx)(t.p,{children:"With this tool, I was able to make sure the package was working correctly with the new dual package publish."}),"\n",(0,n.jsxs)(t.h3,{id:"wrong-moduleresolution",children:["Wrong ",(0,n.jsx)(t.code,{children:"moduleResolution"})]}),"\n",(0,n.jsx)(t.p,{children:"It took me a while to realize, but while testing the changes in a sample project, the imports still failed because TypeScript couldn't find the files."}),"\n",(0,n.jsxs)(t.p,{children:["So I remember the suggestion from ",(0,n.jsx)(t.a,{href:"https://twitter.com/samijaber_",children:"sami"})," who gave me some examples of projects he uses\nin ",(0,n.jsx)(t.a,{href:"https://github.com/BuilderIO/hydration-overlay/tree/main/tests",children:"BuilderIO/hidration-overlay"}),",\nand I understand the difference between ",(0,n.jsx)(t.code,{children:"moduleResolution"}),", in my project it was configured for ",(0,n.jsx)(t.code,{children:"node"}),",\nin his project it was configured for ",(0,n.jsx)(t.code,{children:"bundler"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["When I changed this setting, all imports started working and imports using ",(0,n.jsx)(t.code,{children:"/lib/adapters/aws"})," started failing."]}),"\n",(0,n.jsx)(t.p,{children:"If you're like me and have no idea what this setting is about, the documentation says:"}),"\n",(0,n.jsxs)(o.Z,{url:"https://www.typescriptlang.org/tsconfig#moduleResolution",children:[(0,n.jsx)(t.p,{children:"Specify the module resolution strategy:"}),(0,n.jsx)(t.p,{children:"'node16' or 'nodenext' for modern versions of Node.js. Node.js v12 and later supports both ECMAScript imports and\nCommonJS require, which resolve using different algorithms. These moduleResolution values, when combined with the\ncorresponding module values, picks the right algorithm for each resolution based on whether Node.js will see an import\nor require in the output JavaScript code."}),(0,n.jsx)(t.p,{children:"'node10' (previously called 'node') for Node.js versions older than v10, which only support CommonJS require. You\nprobably won\u2019t need to use node10 in modern code."}),(0,n.jsx)(t.p,{children:'\'bundler\' for use with bundlers. Like node16 and nodenext, this mode supports package.json "imports" and "exports",\nbut unlike the Node.js resolution modes, bundler never requires file extensions on relative paths in imports.'})]}),"\n",(0,n.jsxs)(t.p,{children:["Make sense why it was not working at all, ",(0,n.jsx)(t.code,{children:"node"})," was not built to support ",(0,n.jsx)(t.code,{children:"exports"}),", and only ",(0,n.jsx)(t.code,{children:"nodenext"})," and ",(0,n.jsx)(t.code,{children:"bundler"})," should work correctly."]}),"\n",(0,n.jsx)(t.h2,{id:"doubling-the-package-size",children:"Doubling the package size"}),"\n",(0,n.jsxs)(t.p,{children:["Something I saw that made me a little worried was the size of this package, since I need to export the code, types and source maps twice, the package\nwent from ",(0,n.jsx)(t.code,{children:"~600Kb"})," to ",(0,n.jsx)(t.code,{children:"~1.5Mb"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"I enabled minification to try to reduce the amount of code shipped, but if you use this library and don't have any kind of minification/bundling\nduring your build, I highly recommend you look into these libraries to help you with the size of your zip file being uploaded:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/H4ad/node-modules-packer",children:"@h4ad/node-modules-packer"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/vercel/ncc",children:"ncc"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/netlify/zip-it-and-ship-it",children:"zip-it-and-ship-it"})}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"conclusions",children:"Conclusions"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"esm"})," packages was a nightmare to support some time ago but the ecosystem is starting solving problems with new tools to bundle your project\ninstead of having to fight with your own configuration files."]}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"cjs"})," is a no-brain solution, almost no configuration and it works great but maybe is not ideal for your consumers/clients, some of them can have issues\nlike ",(0,n.jsx)(t.a,{href:"https://github.com/ClementCornut",children:"ClementCornut"})," that needed to import the files with the full path ",(0,n.jsx)(t.code,{children:'import awsPkg from "@h4ad/serverless-adapter/lib/adapters/aws/index.js";'}),"."]}),"\n",(0,n.jsx)(t.p,{children:"When I started adding this feature, I had no knowledge of how to publish double packages, I basically go-horse in the early hours\nof my implementation and then I started learning more about how it works and how to properly configure the package."}),"\n",(0,n.jsx)(t.p,{children:"This makes me realize that dual-package publishing isn't the nightmare I initially thought, I just didn't learn from the\nprevious mistakes other people made and I should have read more articles about it before I started implementing it."}),"\n",(0,n.jsx)(t.p,{children:"My sincere thanks to:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://twitter.com/imabhiprasad",children:"Abhijeet Prasad"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://twitter.com/LucaRams23",children:"Luca Micieli"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://twitter.com/matteocollina",children:"Matteo Collina"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://twitter.com/MicheleRivaCode",children:"Michele Riva"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://twitter.com/samijaber_",children:"sami"})}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Without you, it will probably take me a lot longer to be able to convince myself to go ahead and try again to add support\nfor dual-package publish after the first failures."})]})}function p(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},1007:(e,t,s)=>{s.d(t,{Z:()=>a});var n=s(512);s(7294);const i={browserWindow:"browserWindow_my1Q",browserWindowHeader:"browserWindowHeader_jXSR",row:"row_KZDM",buttons:"buttons_uHc7",right:"right_oyze",browserWindowAddressBar:"browserWindowAddressBar_Pd8y",dot:"dot_giz1",browserWindowMenuIcon:"browserWindowMenuIcon_Vhuh",bar:"bar_rrRL",browserWindowBody:"browserWindowBody_Idgs"};var o=s(5893);function a(e){let{children:t,minHeight:s,url:a="http://localhost:3000"}=e;return(0,o.jsxs)("div",{className:i.browserWindow,style:{minHeight:s},children:[(0,o.jsxs)("div",{className:i.browserWindowHeader,children:[(0,o.jsxs)("div",{className:i.buttons,children:[(0,o.jsx)("span",{className:i.dot,style:{background:"#f25f58"}}),(0,o.jsx)("span",{className:i.dot,style:{background:"#fbbe3c"}}),(0,o.jsx)("span",{className:i.dot,style:{background:"#58cb42"}})]}),(0,o.jsx)("div",{className:(0,n.Z)(i.browserWindowAddressBar,"text--truncate"),children:(0,o.jsx)("a",{href:a,target:"_blank",rel:"noopener",children:a})}),(0,o.jsx)("div",{className:i.browserWindowMenuIcon,children:(0,o.jsxs)("div",{children:[(0,o.jsx)("span",{className:i.bar}),(0,o.jsx)("span",{className:i.bar}),(0,o.jsx)("span",{className:i.bar})]})})]}),(0,o.jsx)("div",{className:i.browserWindowBody,children:t})]})}},1151:(e,t,s)=>{s.d(t,{Z:()=>r,a:()=>a});var n=s(7294);const i={},o=n.createContext(i);function a(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);