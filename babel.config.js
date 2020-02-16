module.exports = api => {
  const production = api.env("production")
  api.cache.using(() => production)

  const presets = [
    ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
  ]

  const plugins = [
    ["@babel/plugin-transform-runtime"],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "babel-plugin-styled-components",
      production ? { displayName: false } : {},
    ],
  ]

  if (production) {
    plugins.push(["babel-plugin-react-remove-properties"])
  }

  return {
    presets,
    plugins,
    ignore: ["node_modules"],
  }
}
