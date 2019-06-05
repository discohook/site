// @ts-check
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const dev = process.env.NODE_ENV === "development"

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: dev ? "development" : "production",
  entry: resolve(__dirname, "src", "index.tsx"),
  output: {
    filename: "[id].[hash].js",
    chunkFilename: "[id].[hash].js",
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, "dist", "index.html"),
      template: resolve(__dirname, "public", "index.html"),
      minify: !dev && {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: { host: "localhost", port: 3000 },
}
