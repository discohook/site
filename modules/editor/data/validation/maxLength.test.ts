import { maxLength } from "./maxLength"

describe("maxLength", () => {
  it("validates maximum length of strings", () => {
    expect(maxLength(10)("this is a long string", "$")).not.toHaveLength(0)
    expect(maxLength(1)("", "$")).toHaveLength(0)
    expect(maxLength(1)("1", "$")).toHaveLength(0)
    expect(maxLength(1)("12", "$")).not.toHaveLength(0)
  })

  it("validates maximum length of arrays", () => {
    expect(maxLength(10)([1, 2, 3], "$")).toHaveLength(0)
    expect(maxLength(5)(["a value", "another value"], "$")).toHaveLength(0)
    expect(maxLength(5)([1, 2, 3, 4, 5], "$")).toHaveLength(0)
    expect(maxLength(5)([1, 2, 3, 4, 5, 6], "$")).not.toHaveLength(0)
  })
})
