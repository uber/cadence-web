module.exports = {
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
          "~constants": "./client/constants",
          "~components": "./client/components",
          "~helpers": "./client/helpers"
        }
      }
    ],
    ["@babel/plugin-transform-regenerator"]
  ],
  "presets": [
    [
      "env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    "@babel/preset-env"
  ]
};
