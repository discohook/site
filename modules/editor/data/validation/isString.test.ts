import { isString } from "./isString"

describe("isString", () => {
  it("can validate if a value is a string", () => {
    expect(isString("a string", "$")).toHaveLength(0)
    expect(isString("test", "$")).toHaveLength(0)
  })

  it("can validate if a value is not a string", () => {
    expect(isString(1, "$")).not.toHaveLength(0)
    expect(isString(Infinity, "$")).not.toHaveLength(0)
    expect(isString(Number.NaN, "$")).not.toHaveLength(0)
    expect(isString(false, "$")).not.toHaveLength(0)
    expect(isString({}, "$")).not.toHaveLength(0)
    expect(isString({ foo: "bar" }, "$")).not.toHaveLength(0)
    expect(isString([], "$")).not.toHaveLength(0)
    expect(isString(null, "$")).not.toHaveLength(0)
    expect(isString(undefined, "$")).not.toHaveLength(0)
  })
})
