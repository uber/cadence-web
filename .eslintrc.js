module.exports = {
  ignorePatterns: ['src/__generated__/'],
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:storybook/recommended',
  ],
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': ['error'],

    // Typescript rules
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        caughtErrors: 'all',
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // Import rules
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',
    'import/named': 'error',
    // React 19: stock DatePicker → MaskedInput → react-input-mask → findDOMNode.
    // Use DateTimePicker or StatefulCalendar / Calendar / TimePicker instead.
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-input-mask',
            message:
              'react-input-mask uses findDOMNode (removed in React 19). Do not import it.',
          },
          {
            name: 'baseui/datepicker',
            importNames: [
              'DatePicker',
              'Datepicker',
              'StatefulDatePicker',
              'Datepicker_DO_NOT_USE',
              'DatepickerOverrides',
            ],
            message:
              'Banned for React 19. Use @/components/date-time-picker or StatefulCalendar / Calendar / TimePicker / TimezonePicker.',
          },
          {
            name: 'baseui/input',
            importNames: ['MaskedInput'],
            message:
              'MaskedInput pulls react-input-mask (findDOMNode). Use baseui Input instead.',
          },
        ],
        patterns: [
          {
            group: ['baseui/datepicker/*', 'baseui/datepicker/**'],
            message:
              'Do not deep-import baseui/datepicker. Use DateTimePicker or allowed calendar/time exports from baseui/datepicker.',
          },
          {
            group: [
              'baseui/input/masked-input',
              'baseui/input/masked-input/*',
              '**/react-input-mask',
              '**/react-input-mask/*',
            ],
            message:
              'Masked input / react-input-mask is banned (findDOMNode / React 19).',
          },
        ],
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        groups: [
          ['external', 'builtin'],
          'internal',
          'parent',
          ['sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/test-utils/rtl',
            group: 'internal',
            position: 'before',
          },
        ],
        distinctGroup: true,
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: '/',
      },
    },
  },
};
