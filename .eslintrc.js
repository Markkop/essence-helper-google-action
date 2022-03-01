module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: [
    '**/lib/**/*',
    '**/node_modules/**',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'quotes': ['error', 'single'],
    'require-jsdoc': 0,
    'import/no-unresolved': 0,
    'object-curly-spacing': 0,
    'max-len': ['error', { 'code': 120 }],
    'semi': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 0,
  },
}
