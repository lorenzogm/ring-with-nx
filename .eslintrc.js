module.exports = {
  extends: [
    '@lorenzogm/eslint-config-react',
    '@lorenzogm/eslint-config-react/nextjs',
  ],
  globals: {
    localStorage: true,
  },
  rules: {
    'arrow-body-style': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/unbound-method': 'off',
  },
}
