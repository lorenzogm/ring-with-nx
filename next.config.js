module.exports = {
  i18n: {
    locales: ['es-ES'],
    defaultLocale: 'es-ES',
  },
  images: {
    domains: ['images.prismic.io'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
