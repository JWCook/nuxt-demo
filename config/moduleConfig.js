import URL from 'url-parse'
import siteConfig from './_siteConfig'

// Axios config
let url = false
let axiosSettings = {}
if (process.env.URL && process.argv[2] === 'generate') {
  url = new URL(process.env.URL)
  axiosSettings = {
    baseURL: url
  }
}

const moduleConfig = {
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faTimes', 'faSearch', 'faEnvelope', 'faUser', 'faBriefcase']
      }
    ]
  },
  styleResources: {
    scss: ['./assets/scss/_vars.scss']
  },
  axios: axiosSettings,
  responsiveLoader: {
    name: 'uploads/[hash:7]-[width].[ext]',
    min: 640, // minimum image width generated
    max: 1800, // maximum image width generated
    steps: 4, // five sizes per image will be generated
    placeholder: false, // no placeholder will be generated
    quality: 65, // images are compressed with medium quality
    adapter: require('responsive-loader/sharp'),
    disable: process.env.NODE_ENV === 'development'
  },
  'google-gtag': {
    id: siteConfig.googleAnalytics.id
  },
  purgeCSS: {
    paths: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
    css: ['./assets/scss/styles.scss'],
    whitelist: [
      'html',
      'body',
      'is-1by1',
      'is-5by4',
      'is-5by4',
      'is-4by3',
      'is-3by2',
      'is-5by3',
      'is-16by9',
      'is-2by1',
      'is-3by1',
      'is-4by5',
      'is-3by4',
      'is-2by3',
      'is-3by5',
      'is-9by16',
      'nuxt__build_indicator',
      '__nuxt',
      'svg',
      'table',
      'td',
      'th',
      'tr',
      'tbody',
      'thead',
      'tfoot'
    ],
    whitelistPatterns: [/theme/g, /spinner-position/, /fa/, /table/g]
  }
}

export default moduleConfig
