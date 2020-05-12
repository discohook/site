import { toCamelCase } from "./toCamelCase"

describe("toCamelCase", () => {
  it("converts object keys", () => {
    expect(toCamelCase({})).toEqual({})

    expect(toCamelCase({ key: 1 })).toEqual({ key: 1 })

    expect(toCamelCase({ multiple_words: "test" })).toEqual({
      multipleWords: "test",
    })

    expect(toCamelCase({ key_one: "one", key_two: "two" })).toEqual({
      keyOne: "one",
      keyTwo: "two",
    })
  })

  it("does not convert arrays to objects", () => {
    expect(toCamelCase({ some_array: [1, 2, 3] })).toEqual({
      someArray: [1, 2, 3],
    })
  })

  it("recurses over nested objects", () => {
    expect(toCamelCase({ nested_objects: { are_very_cool: "!" } })).toEqual({
      nestedObjects: { areVeryCool: "!" },
    })
  })

  it("iterates over arrays", () => {
    expect(toCamelCase({ nested_objects: [{ in_arrays: true }] })).toEqual({
      nestedObjects: [{ inArrays: true }],
    })

    expect(toCamelCase([{ arrays_of: "objects" }])).toEqual([
      { arraysOf: "objects" },
    ])
  })
})
