// @ts-check
const { resolve } = require("path")
const { DefinePlugin, optimize: webpackOptimize } = require("webpack")
const { LimitChunkCountPlugin } = webpackOptimize

if (!process.env.NODE_ENV) process.env.NODE_ENV = "production"

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: [
    "regenerator-runtime/runtime",
    resolve(__dirname, "src/core/server.tsx"),
  ],
  mode: "production",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: "babel-loader?cacheDirectory",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.SSR": JSON.stringify(true),
    }),
  ],
  devtool: "source-map",
  target: "node",
  externals: {
    "any-promise": "Promise",
  },
  node: false,
}
