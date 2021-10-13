const withPlugins = require('next-compose-plugins')
const nx = require('@nrwl/next/plugins/with-nx')
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([nx, bundleAnalyzer], {
  nx: {
    // Set this to false if you do not want to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  i18n: {
    localeDetection: false,
    locales: ['es'],
    defaultLocale: 'es',
  },
  images: {
    domains: ['a.storyblok.com'],
  },
  webpack: (config, { isServer }) => {
    applyUrlLoader(config)

    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.child_process = false
      config.resolve.fallback.request = false
      config.resolve.fallback.net = false
      config.resolve.fallback.worker_threads = false
      config.resolve.fallback.tls = false
    }

    return config
  },
})

const applyUrlLoader = (config) => {
  config.module.rules.push({
    test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader',
    options: {
      limit: 1000000,
    },
  })
}
