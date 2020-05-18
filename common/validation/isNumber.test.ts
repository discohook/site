import { isNumber } from "./isNumber"

describe("isNumber", () => {
  it("can validate if a value is a number", () => {
    expect(isNumber(0, "$")).toHaveLength(0)
    expect(isNumber(2, "$")).toHaveLength(0)
    expect(isNumber(Infinity, "$")).toHaveLength(0)
    expect(isNumber(-Infinity, "$")).toHaveLength(0)
    expect(isNumber(Number.NaN, "$")).toHaveLength(0)
  })

  it("can validate if a value is not a number", () => {
    expect(isNumber("definitely a string", "$")).not.toHaveLength(0)
    expect(isNumber(false, "$")).not.toHaveLength(0)
    expect(isNumber({}, "$")).not.toHaveLength(0)
    expect(isNumber({ foo: "bar" }, "$")).not.toHaveLength(0)
    expect(isNumber([], "$")).not.toHaveLength(0)
    expect(isNumber(null, "$")).not.toHaveLength(0)
    expect(isNumber(undefined, "$")).not.toHaveLength(0)
  })
})
