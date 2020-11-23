module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'eslint-config-fusion',
    'plugin:vue/essential',
  ],
  env: {
    'jest/globals': true,
    'node': true,
  },
  globals: {
    module: true,   // hot reloading
    scenario: true, // mocha
  },
  plugins: ['jest', 'import', 'eslint-plugin-header'],
  rules: {
    curly: ['error', 'all'],
    'dot-notation': 'error',
    'flowtype/require-valid-file-annotation': [2, 'never'],
    'header/header': [
      'error',
      'line',
      [
        ' Copyright (c) 2017-2020 Uber Technologies Inc.',
        '',
        ' Permission is hereby granted, free of charge, to any person obtaining a copy',
        ' of this software and associated documentation files (the "Software"), to deal',
        ' in the Software without restriction, including without limitation the rights',
        ' to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
        ' copies of the Software, and to permit persons to whom the Software is',
        ' furnished to do so, subject to the following conditions:',
        '',
        ' The above copyright notice and this permission notice shall be included in',
        ' all copies or substantial portions of the Software.',
        '',
        ' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
        ' IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
        ' FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
        ' AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
        ' LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
        ' OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN',
        ' THE SOFTWARE.'
      ],
      2
    ],
    'import/order': [
      'error',
      { 'groups': ['builtin', 'external', 'parent', 'sibling', 'index'] }
    ],
    'jest/consistent-test-it': [
      'error',
      { 'fn': 'test', 'withinDescribe': 'it' }
    ],
    'jest/lowercase-name': [
      'error',
      {
        'ignore': ['describe', 'test']
      }
    ],
    'no-var': 'error',
    'no-use-before-define': 'error',
    'no-useless-constructor': 'error',
    'object-curly-spacing': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
      { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
      {
        'blankLine': 'any',
        'prev': ['const', 'let', 'var'],
        'next': ['const', 'let', 'var']
      },
      { 'blankLine': 'always', 'prev': 'directive', 'next': '*' },
      { 'blankLine': 'any', 'prev': 'directive', 'next': 'directive' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'if' },
      { 'blankLine': 'always', 'prev': 'if', 'next': '*' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'function' }
    ],
    'prefer-const': 'error',
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        singleQuote: true,
        trailingComma: 'es5',
        jsxBracketSameLine: false
      },
    ],
    'space-before-blocks': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};
