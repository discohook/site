/* eslint-disable @typescript-eslint/camelcase */

import { toCamelCase, toSnakeCase } from "./objectCasing"

const cases = [
  {
    camelCase: {},
    snakeCase: {},
  },
  {
    camelCase: { key: 1 },
    snakeCase: { key: 1 },
  },
  {
    camelCase: { multipleWords: "test" },
    snakeCase: { multiple_words: "test" },
  },
  {
    camelCase: { keyOne: "one", keyTwo: "two" },
    snakeCase: { key_one: "one", key_two: "two" },
  },
  {
    camelCase: { someArray: [1, 2, 3] },
    snakeCase: { some_array: [1, 2, 3] },
  },
  {
    camelCase: { nestedObjects: { areVeryCool: "!" } },
    snakeCase: { nested_objects: { are_very_cool: "!" } },
  },
  {
    camelCase: { nestedObjects: [{ inArrays: true }] },
    snakeCase: { nested_objects: [{ in_arrays: true }] },
  },
  {
    camelCase: [{ arraysOf: "objects" }],
    snakeCase: [{ arrays_of: "objects" }],
  },
] as const

describe("toCamelCase", () => {
  it("converts camel case to snake case", () => {
    for (const { camelCase, snakeCase } of cases) {
      expect(toSnakeCase(camelCase)).toEqual(snakeCase)
    }
  })
})

describe("toSnakeCase", () => {
  it("converts snake case to camel case", () => {
    for (const { camelCase, snakeCase } of cases) {
      expect(toCamelCase(snakeCase)).toEqual(camelCase)
    }
  })
})
