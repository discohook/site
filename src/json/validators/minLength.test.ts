import { minLength } from "./minLength"

describe("minLength", () => {
  it("validates minimum length of strings", () => {
    expect(minLength(1)("test", "$")).toHaveLength(0)
    expect(minLength(0)("", "$")).toHaveLength(0)
    expect(minLength(1)("", "$")).not.toHaveLength(0)
  })

  it("validates minimum length of arrays", () => {
    expect(minLength(0)([1, 2, 3], "$")).toHaveLength(0)
    expect(minLength(0)(["some value"], "$")).toHaveLength(0)
    expect(minLength(1)([], "$")).not.toHaveLength(0)
    expect(minLength(0)([], "$")).toHaveLength(0)
  })
})
