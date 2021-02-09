module.exports = {
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
          "~components": "./client/components",
          "~containers": "./client/containers",
          "~constants": "./client/constants",
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
