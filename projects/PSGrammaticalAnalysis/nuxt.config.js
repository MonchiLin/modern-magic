import path from 'path'
require('dotenv').config()

export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
  },
  loading: {color: '#fff'},
  css: [],
  plugins: [
    '@/plugins/composition-api',
    '@/plugins/antd',
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-purgecss',
  ],
  env: {
    BASE_URL: process.env.BASE_URL,
    BD_KEY: process.env.BD_KEY,
    BD_APP_ID: process.env.BD_APP_ID,
  },

  tailwindcss: {
    configPath: '~/config/tailwind.config.js',
    purgeCSSInDev: false
  },
  purgeCSS: {
    // 忽略 antd 的样式
    whitelistPatterns: [/ant.*/]
  },
  axios: {},
  build: {
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, './config/tailwind.config.js')
      }
    },
    extend(config, {isDev, isClient}) {
      if (isDev) {
        config.devtool = 'eval-source-map' // Something you like
      }
    }
  }
}
