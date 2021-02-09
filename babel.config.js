module.exports = {
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
          "~components": "./client/components",
          "~constants": "./client/constants",
          "~containers": "./client/containers",
          "~helpers": "./client/helpers",
          "~services": "./client/services",
        },
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
