/** @type {import('eslint').Linter.Config} */

import pluginQuery from '@typescript-eslint/eslint-plugin-query'

module.exports = {
  extends: ['next/core-web-vitals'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: {
    query: pluginQuery,
  },
  rules: {
    '@tanstack/query/exhaustive-deps': 'error',
  },
}