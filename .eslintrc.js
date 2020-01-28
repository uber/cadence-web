module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:chai-friendly/recommended',
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended',
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
    'chai-friendly',
    'jest',
    'prettier',
    'vue',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    // see https://stackoverflow.com/questions/44939304/eslint-should-be-listed-in-the-projects-dependencies-not-devdependencies#answer-55863857
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "client/test/index.js",
          "client/test/scenario.js",
          "**/*.test.js",
          "**/*.spec.js",
        ],
      },
    ],
  },
};
