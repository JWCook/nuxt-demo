import path from 'path'
import glob from 'glob'
import head from './config/head'
import moduleConfig from './config/moduleConfig'

export const routeMap = {
  '': 'posts/*.md',
  '/categories': 'categories/*.md'
}

export const otherRoutes = []

export default {
  target: 'static',
  loading: { color: '#fff' },
  head: head,
  generate: {
    routes: otherRoutes.concat(getDynamicPaths(routeMap))
  },
  css: ['./assets/scss/styles.scss'],
  plugins: [
    '~/plugins/Globals',
    '~/plugins/OptiImage',
    '~/plugins/Disqus',
    '~/plugins/EventBus',
    '~/plugins/Components'
  ],
  modules: [
    '@nuxtjs/axios', // See https://axios.nuxtjs.org/usage
    //'@nuxtjs/google-gtag',  // TODO: Set up analytics ID
    '@nuxtjs/style-resources',
    'nuxt-fontawesome',
    'nuxt-responsive-loader'
  ],
  buildModules: ['@nuxtjs/eslint-module', 'nuxt-purgecss'],
  ...moduleConfig,
  build: {
    // Extend webpack config
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: [{ loader: 'gray-matter-loader' }]
      })
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
    postcss: { plugins: [] }
  }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map((url) => {
      const filepathGlob = urlFilepathTable[url]
      return glob.sync(filepathGlob, { cwd: 'content' }).map((filepath) => {
        return `${url}/${path.basename(filepath, '.md')}`
      })
    })
  )
}
