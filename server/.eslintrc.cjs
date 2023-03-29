module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'],
  overrides: [
  ],
  ignorePatterns: ['dist/**/*.js', '*.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off"
  }
}
