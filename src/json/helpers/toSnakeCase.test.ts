/* eslint-disable @typescript-eslint/naming-convention */

import { toSnakeCase } from "./toSnakeCase"

describe("toSnakeCase", () => {
  it("converts object keys", () => {
    expect(toSnakeCase({})).toEqual({})

    expect(toSnakeCase({ key: 1 })).toEqual({ key: 1 })

    expect(toSnakeCase({ multipleWords: "test" })).toEqual({
      multiple_words: "test",
    })

    expect(toSnakeCase({ keyOne: "one", keyTwo: "two" })).toEqual({
      key_one: "one",
      key_two: "two",
    })
  })

  it("does not convert arrays to objects", () => {
    expect(toSnakeCase({ someArray: [1, 2, 3] })).toEqual({
      some_array: [1, 2, 3],
    })
  })

  it("recurses over nested objects", () => {
    expect(toSnakeCase({ nestedObjects: { areVeryCool: "!" } })).toEqual({
      nested_objects: { are_very_cool: "!" },
    })
  })

  it("iterates over arrays", () => {
    expect(toSnakeCase({ nestedObjects: [{ inArrays: true }] })).toEqual({
      nested_objects: [{ in_arrays: true }],
    })

    expect(toSnakeCase([{ arraysOf: "objects" }])).toEqual([
      { arrays_of: "objects" },
    ])
  })
})
