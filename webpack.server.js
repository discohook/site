// @ts-check
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { resolve } = require("path")

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: [
    "core-js/stable",
    "regenerator-runtime/runtime",
    resolve(__dirname, "src", "server.tsx"),
  ],
  mode: "production",
  output: {
    filename: "main.js",
    chunkFilename: "[name].js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      { test: /\.[jt]sx?$/, use: "babel-loader" },
      { enforce: "pre", test: /\.js$/, use: "source-map-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  optimization: { minimize: false },
  plugins: [new CleanWebpackPlugin()],
  devtool: "source-map",
  target: "node",
  externals: { "any-promise": "Promise" },
  node: false,
}
