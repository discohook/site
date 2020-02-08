// @ts-check
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/newline-after-import */

const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path")
const PreloadWebpackPlugin = require("preload-webpack-plugin")
const { DefinePlugin } = require("webpack")

if (!process.env.NODE_ENV) process.env.NODE_ENV = "development"
const development = process.env.NODE_ENV === "development"

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: resolve(__dirname, "src/core/client.tsx"),
  mode: development ? "development" : "production",
  output: {
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader?cacheDirectory",
          { loader: "eslint-loader", options: { cache: true } },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  optimization: {
    splitChunks: {
      chunks: chunk => !/^hljs-[\w-]+$/.test(chunk.name),
      minSize: 0,
      maxInitialRequests: Infinity,
      automaticNameDelimiter: "-",
      cacheGroups: {
        polyfill: {
          test: new RegExp(
            `[/\\\\]node_modules[/\\\\].*[/\\\\](${[
              "core-js",
              "regenerator-runtime",
              "@babel",
              "object-assign",
            ].join("|")})[/\\\\]`,
          ),
          name: "polyfill",
          priority: 1,
        },
        react: {
          test: new RegExp(
            `[/\\\\]node_modules[/\\\\].*[/\\\\](${[
              "react",
              "react-dom",
              "react-is",
              "prop-types",
              "scheduler",
            ].join("|")})[/\\\\]`,
          ),
          name: "react",
          priority: 1,
        },
        markdown: {
          test: new RegExp(
            `[/\\\\]node_modules[/\\\\].*[/\\\\](${[
              "simple-markdown",
              "highlight.js",
            ].join("|")})[/\\\\]`,
          ),
          name: "markdown",
          priority: 1,
        },
        css: {
          test: new RegExp(
            `[/\\\\]node_modules[/\\\\].*[/\\\\](${[
              "styled-components",
              "polished",
              "@emotion",
            ].join("|")})[/\\\\]`,
          ),
          name: "css",
          priority: 1,
        },
        emoji: {
          test: new RegExp(
            `[/\\\\]src[/\\\\].*[/\\\\](${[
              "emoji",
              "emojiData",
              "jumbosizeEmojis",
              "convertEmojiToNames",
            ].join("|")}).tsx?`,
          ),
          name: "emoji",
          priority: 1,
        },
        vendor: {
          test: /[/\\]node_modules[/\\]/,
          name: "vendor",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, "dist/index.html"),
      template: resolve(__dirname, "public/index.html"),
      minify: !development && {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      include: ["main", "vendor", "polyfill", "react", "markdown", "css"],
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "public"),
        ignore: [resolve(__dirname, "public/index.html")],
      },
    ]),
    new DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV),
      PROD: !development,
      DEV: !development,
      TEST: false,
      SERVER: false,
    }),
  ],
  devServer: {
    host: "localhost",
    port: 3000,
  },
  devtool: "source-map",
  performance: {
    maxEntrypointSize: Infinity,
    maxAssetSize: Infinity,
  },
}
