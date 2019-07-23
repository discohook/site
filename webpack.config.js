// @ts-check
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path")
const PreloadWebpackPlugin = require("preload-webpack-plugin")
const { DefinePlugin, optimize: webpackOptimize } = require("webpack")
const { LimitChunkCountPlugin } = webpackOptimize

if (!process.env.NODE_ENV) process.env.NODE_ENV = "development"
const dev = process.env.NODE_ENV === "development"

/**
 * @typedef {import("webpack").Configuration & {
 *   devServer?: import("webpack-dev-server").Configuration
 * }} Configuration
 */

/** @type {Configuration} */
const appConfig = {
  entry: [
    "core-js/stable",
    "regenerator-runtime/runtime",
    resolve(__dirname, "src/index.tsx"),
  ],
  mode: dev ? "development" : "production",
  output: {
    filename: "[name].js?q=[chunkhash]",
    chunkFilename: "[name].js?q=[chunkhash]",
    path: resolve(__dirname, "dist/public"),
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: "babel-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader",
      },
      {
        enforce: "pre",
        test: /\.[js]sx?$/,
        use: "eslint-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  optimization: {
    splitChunks: {
      chunks: chunk => !/^hljs-[\w\-]+$/.test(chunk.name),
      automaticNameDelimiter: "-",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, "dist/public/index.html"),
      template: resolve(__dirname, "public/index.html"),
      minify: !dev && {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      include: ["main", "vendors-main", "app", "vendors-app"],
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "public"),
        ignore: [resolve(__dirname, "public/index.html")],
      },
    ]),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.SSR": JSON.stringify(false),
    }),
  ],
  devServer: {
    host: "localhost",
    port: 3000,
  },
  devtool: "source-map",
  performance: {
    assetFilter: name => /\.js$/.test(name),
  },
}

/** @type {Configuration} */
const serverConfig = {
  entry: [
    "core-js/stable",
    "regenerator-runtime/runtime",
    resolve(__dirname, "src/server.tsx"),
  ],
  mode: "production",
  output: {
    filename: "main.js",
    chunkFilename: "[name].js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: "babel-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader",
      },
      {
        enforce: "pre",
        test: /\.[ts]sx?$/,
        use: "eslint-loader",
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

/** @type {Configuration[]} */
module.exports = dev ? [appConfig] : [appConfig, serverConfig]
