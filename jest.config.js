/* eslint-disable @typescript-eslint/naming-convention */

module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  rootDir: "src",
  globals: {
    ENV: "test",
    PROD: true,
    DEV: false,
    TEST: true,
    SERVER: true,
  },
  setupFilesAfterEnv: ["<rootDir>/testing/setup.ts"],
  collectCoverageFrom: ["**/*"],
  coverageDirectory: "../coverage",
}
