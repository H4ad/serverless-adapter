import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';
import { apiPages } from './api-pages';

const nav: DefaultTheme.NavItem[] = [{ text: 'Guide', link: '/guide/' }];

const sidebar: DefaultTheme.MultiSideBarConfig = {
  '/': [
    {
      text: 'Guide',
      children: [
        {
          text: 'Getting Started',
          link: '/guide/',
        },
      ],
    },
    {
      text: 'API',
      children: apiPages,
    },
  ],
};

const algolia: DefaultTheme.AlgoliaSearchOptions = {
  apiKey: process.env.API_KEY!,
  appId: process.env.APP_ID!,
  indexName: 'serverless-adapter',
};

const description =
  'Run REST APIs in Node.js applications frameworks (Express, Koa, Hapi and Fastify) on top of any Serverless Cloud.';

export default defineConfig({
  title: 'Serverless Adapter',
  description,
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#40af7c' }],
    [
      'meta',
      {
        name: 'og:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'description',
        content: description,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  ],
  themeConfig: {
    repo: '@h4ad/serverless-adapter',
    logo: '/logo.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
    nav,
    sidebar,
    algolia,
  },
});
