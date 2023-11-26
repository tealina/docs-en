//@ts-check
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tealina',
  description: 'Tealina document',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' },
      // { text: 'Commands', link: '/api' },
      // { text: 'Configration', link: '/config' },
      // { text: 'Family', link: '/family' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/guide' },
          { text: 'Why Tealina?', link: '/why' },
          { text: 'How it work?', link: '/how-it-work' },
          { text: 'Conventions', link: '/conventions' },
          // { text: 'Limitation', link: '/limitation' },
      
      ],
      },
      {
        text: 'Commands',
        items: [
          { text: 'capi', link: '/commands/capi' },
          { text: 'dapi', link: '/commands/dapi' },
          { text: 'sapi', link: '/commands/sapi' },
          { text: 'gpure', link: '/commands/gpure' },
          { text: 'gdoc', link: '/commands/gdoc' },
        ],
      },
      {
        text:'Configuration',
        items:[
          {text:'Code Generation',link:'/configuration/templates'},
          {text:'Type Generation',link:'/configuration/gpure'},
        ]
      },
      {
        text:'Setup',
        items:[
          {text:'Registe Router',link:'/configuration/router-registe'},
          {text:'Multiple api-dir',link:'/configuration/multiple-api-dir'},
        ]
      },
      {
        text:'Family',
        items:[
          {text:'@tealina/doc-ui',link:'/family/doc-ui'},
          {text:'@tealina/doc-types',link:'/family/doc-types'},
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tealina/tealina' },
    ],
  },
})
