// @ts-check
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path")
const PreloadWebpackPlugin = require("preload-webpack-plugin")
const { DefinePlugin } = require("webpack")

if (!process.env.NODE_ENV) process.env.NODE_ENV = "development"
const dev = process.env.NODE_ENV === "development"

/** @type {import("webpack").Configuration} */
module.exports = {
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
