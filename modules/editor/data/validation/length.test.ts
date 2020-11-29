import { length } from "./length"

describe("length", () => {
  it("validates minimum and maximum length of strings", () => {
    expect(length(1, 5)("1", "$")).toHaveLength(0)
    expect(length(0, 5)("12345", "$")).toHaveLength(0)
    expect(length(1, 5)("long string", "$")).not.toHaveLength(0)
  })

  it("validates minimum and maximum length of arrays", () => {
    expect(length(0, 5)([1, 2, 3], "$")).toHaveLength(0)
    expect(length(0, 5)([1, 2, 3, 4, 5, 6], "$")).not.toHaveLength(0)
    expect(length(1, 5)([], "$")).not.toHaveLength(0)
  })
})
