module.exports = {
  extends: [
    require.resolve('eslint-config-fusion'),
    'plugin:vue/essential',
  ],
  rules: {
    "flowtype/require-valid-file-annotation": [2, "never"],
  },
};
