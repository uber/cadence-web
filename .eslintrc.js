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
  plugins: ['jest', 'import'],
  rules: {
    curly: ['error', 'all'],
    'dot-notation': 'error',
    'flowtype/require-valid-file-annotation': [2, 'never'],
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
};
