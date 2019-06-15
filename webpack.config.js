// @ts-check
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path")

const dev = process.env.NODE_ENV === "development"

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: dev ? "development" : "production",
  entry: [
    "core-js/stable",
    "regenerator-runtime/runtime",
    resolve(__dirname, "src", "index.tsx"),
  ],
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      { test: /\.[jt]sx?$/, use: "babel-loader" },
      { enforce: "pre", test: /\.js$/, use: "source-map-loader" },
    ],
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
      filename: resolve(__dirname, "dist", "index.html"),
      template: resolve(__dirname, "public", "index.html"),
      minify: !dev && { collapseWhitespace: true, removeComments: true },
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
}
