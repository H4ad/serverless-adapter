// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Serverless Adapter',
  tagline:
    'Run REST APIs and other web applications using your existing Node.js application framework (Express, Koa, Hapi and Fastify), on top of AWS Lambda, Amazon API Gateway and many other event sources.',
  url: 'https://h4ad.github.io/serverless-adapter',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'h4ad', // Usually your GitHub org/user name.
  projectName: 'serverless-adapter', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Serverless Adapter',
        logo: {
          alt: 'Serverless Adapter',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'main/intro',
            position: 'left',
            label: 'Docs',
            sidebarId: 'main',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'api',
            label: 'API',
          },
          {
            href: 'https://github.com/h4ad/serverless-adapter',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/main/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'H4ad Twitter',
                href: 'https://twitter.com/vinii.joga10',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/h4ad/serverless-adapter',
              },
            ],
          },
          {
            title: 'Sponsors',
            items: [
              {
                label: 'LIGA',
                to: 'https://liga.facens.br/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Serverless Adapter. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
