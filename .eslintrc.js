// see https://github.com/uber-web/uber-eslint for settings

module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:chai-friendly/recommended',
    'plugin:vue/essential',
    'eslint:recommended',
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
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: false,
        jsxBracketSameLine: false,
        rangeStart: 0,
        rangeEnd: Infinity,
      },
    ],
    // see https://stackoverflow.com/questions/44939304/eslint-should-be-listed-in-the-projects-dependencies-not-devdependencies#answer-55863857
    // "import/no-extraneous-dependencies": [
    //   "error",
    //   {
    //     "devDependencies": [
    //       "client/test/index.js",
    //       "client/test/scenario.js",
    //       "**/*.test.js",
    //       "**/*.spec.js",
    //     ],
    //   },
    // ],
  },
};
