module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
