// @ts-check
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable import/newline-after-import */

const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path")
const PreloadWebpackPlugin = require("preload-webpack-plugin")
const { DefinePlugin, HashedModuleIdsPlugin } = require("webpack")

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
      chunks: chunk => !/^vendor\.hljs\.[\w-]+$/.test(chunk.name),
      minSize: 0,
      maxInitialRequests: Infinity,
      automaticNameDelimiter: "-",
      cacheGroups: {
        main: {
          test: /src/,
          name: module => {
            const path =
              module.constructor.name === "NormalModule"
                ? module.resource.replace(__dirname, "")
                : module.context.replace(__dirname, "")

            let name = "main"

            const chunks = module.getChunks()
            if (!chunks.some(chunk => chunk.name === "main")) {
              name += `.${chunks[0].name}`
            }

            if (/[/\\]constants\.ts|[/\\]constants[/\\]/.test(path)) {
              name += ".data"
            }

            return name
          },
        },
        vendor: {
          test: /node_modules/,
          name: module => {
            const re = /node_modules[/\\](?:\.pnpm[/\\][^/\\]+[/\\])?(@[^/\\]+[/\\][^/\\]+|[^/\\]+)(?:[/\\]|$)/
            const path = module.context.replace(__dirname, "")
            const [, package] = re.exec(path) || []

            const cacheGroups = {
              polyfill: [
                "core-js",
                "regenerator-runtime",
                "@babel/runtime",
                "tslib",
                "object-assign",
              ],
              react: [
                "react",
                "react-dom",
                "react-is",
                "prop-types",
                "scheduler",
              ],
              mobx: ["mobx", "mobx-react", "mobx-react-lite"],
              css: [
                "styled-components",
                "@emotion/is-prop-valid",
                "@emotion/memoize",
                "@emotion/stylis",
                "@emotion/unitless",
                "polished",
              ],
              markdown: ["simple-markdown", "highlight.js"],
            }

            for (const [group, packages] of Object.entries(cacheGroups)) {
              if (packages.includes(package)) return `vendor.${group}`
            }

            return "vendor"
          },
        },
      },
    },
  },
  plugins: [
    new HashedModuleIdsPlugin(),
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
      include: "initial",
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
  node: false,
}
