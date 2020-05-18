import { between } from "./between"

describe("between", () => {
  it("validates number ranges", () => {
    expect(between(0, 1)(-1, "$")).not.toHaveLength(0)
    expect(between(0, 1)(0, "$")).toHaveLength(0)
    expect(between(0, 1)(1, "$")).toHaveLength(0)
    expect(between(0, 1)(2, "$")).not.toHaveLength(0)
    expect(between(5, 10)(4, "$")).not.toHaveLength(0)
    expect(between(5, 10)(5, "$")).toHaveLength(0)
    expect(between(5, 10)(10, "$")).toHaveLength(0)
    expect(between(5, 10)(11, "$")).not.toHaveLength(0)
  })
})
