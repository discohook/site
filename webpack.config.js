// @ts-check
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path")
const PreloadWebpackPlugin = require("preload-webpack-plugin")

const dev = process.env.NODE_ENV === "development"

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: [
    "core-js/stable",
    "regenerator-runtime/runtime",
    resolve(__dirname, "src", "index.tsx"),
  ],
  mode: dev ? "development" : "production",
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      { test: /\.[jt]sx?$/, use: "babel-loader" },
      { enforce: "pre", test: /\.js$/, use: "source-map-loader" },
      { enforce: "pre", test: /\.[ts]sx?$/, use: "eslint-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  optimization: {
    splitChunks: {
      chunks: (chunk) =>
        typeof chunk.name === "string" ? !chunk.name.startsWith("hljs") : true,
      automaticNameDelimiter: "-",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, "build", "index.html"),
      template: resolve(__dirname, "public", "index.html"),
      minify: !dev && { collapseWhitespace: true, removeComments: true },
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      include: ["main", "vendors-main", "app", "vendors-app"],
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "public"),
        ignore: [resolve(__dirname, "public", "index.html")],
      },
    ]),
  ],
  devServer: { host: "localhost", port: 3000 },
  devtool: "source-map",
}
