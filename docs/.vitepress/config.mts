//@ts-check
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tealina',
  description: 'Tealina document',
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: 'https://cn.tealina.dev/',
    },
  },
  themeConfig: {

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' },
      {
        text: 'v1.1.3',
        items: [
          {
            text: 'Release Notes',
            link: 'https://github.com/tealina/tealina/releases',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/tealina/tealina/blob/main/CONTRIBUTING.md'
          }
        ]
      }
      // { text: 'Commands', link: '/api' },
      // { text: 'Configration', link: '/config' },
      // { text: 'Family', link: '/family' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/guide' },
          { text: 'Why Tealina', link: '/why' },
          { text: 'How it work', link: '/how-it-work' },
          { text: 'Conventions', link: '/conventions' },
          { text: 'CLI', link: '/commands/cli' },
          // { text: 'Limitation', link: '/limitation' },

        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Templates', link: '/configuration/templates' },
          { text: 'Type Generation', link: '/configuration/gtype' },
          { text: 'Multiple api-dir', link: '/configuration/multiple-api-dir' },
        ]
      },
      {
        text: 'Family',
        items: [
          { text: '@tealina/doc-ui', link: '/family/doc-ui' },
          { text: '@tealina/doc-types', link: '/family/doc-types' },
        ]
      },
      {
        text: 'Edgecase',
        link: '/edgecase'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tealina/tealina' },
    ],
  },
})
