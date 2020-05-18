module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/testing/setup.ts"],
  collectCoverageFrom: ["**/*.ts", "**/*.tsx"],
  coveragePathIgnorePatterns: ["/node_modules/", ".d.ts$"],
}
