module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'jest',
    'vue',
  ],
  rules: {
  },
};
