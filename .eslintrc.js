module.exports = {
  extends: [
    '@valtech-ch/eslint-config/config/react',
    '@valtech-ch/eslint-config/rules/react',
    '@valtech-ch/eslint-config/rules/nextjs',
  ],
  globals: {
    localStorage: true,
  },
}
