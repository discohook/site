/* eslint-disable @typescript-eslint/no-var-requires */

const config = {
  target: "serverless",
  poweredByHeader: false,
  distDir: "build",
  reactStrictMode: true,
}

try {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  })

  module.exports = withBundleAnalyzer(config)
} catch (error) {
  module.exports = config
}
