import { isArray } from "./isArray"

describe("isArray", () => {
  it("can validate if a value is an object", () => {
    expect(isArray([], "$")).toHaveLength(0)
    expect(isArray([1, 2, 3], "$")).toHaveLength(0)
    expect(
      isArray(["arrays can contain", expect.anything()], "$"),
    ).toHaveLength(0)
    expect(isArray([{ badPun: "I am sorry" }], "$")).toHaveLength(0)
  })

  it("can validate if a value is not an object", () => {
    expect(isArray("still a string", "$")).not.toHaveLength(0)
    expect(isArray(1, "$")).not.toHaveLength(0)
    expect(isArray(Infinity, "$")).not.toHaveLength(0)
    expect(isArray(NaN, "$")).not.toHaveLength(0)
    expect(isArray(false, "$")).not.toHaveLength(0)
    expect(isArray({}, "$")).not.toHaveLength(0)
    expect(isArray({ foo: "bar" }, "$")).not.toHaveLength(0)
    expect(isArray(null, "$")).not.toHaveLength(0)
    expect(isArray(undefined, "$")).not.toHaveLength(0)
  })
})
