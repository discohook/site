/* eslint-disable @typescript-eslint/camelcase */

import { toCamelCase, toSnakeCase } from "./casing"

const cases = [
  [{}, {}],
  [{ key: 1 }, { key: 1 }],
  [{ multipleWords: "test" }, { multiple_words: "test" }],
  [{ keyOne: "one", keyTwo: "two" }, { key_one: "one", key_two: "two" }],
  [{ someArray: [1, 2, 3] }, { some_array: [1, 2, 3] }],
  [
    { nestedObjects: { areVeryCool: "!" } },
    { nested_objects: { are_very_cool: "!" } },
  ],
  [
    { nestedObjects: [{ inArrays: true }] },
    { nested_objects: [{ in_arrays: true }] },
  ],
  [[{ arraysOf: "objects" }], [{ arrays_of: "objects" }]],
] as const

describe("casing", () => {
  it("converts camel case to snake case", () => {
    for (const [camelCase, snakeCase] of cases) {
      expect(toSnakeCase(camelCase)).toEqual(snakeCase)
    }
  })

  it("converts snake case to camel case", () => {
    for (const [camelCase, snakeCase] of cases) {
      expect(toCamelCase(snakeCase)).toEqual(camelCase)
    }
  })
})
