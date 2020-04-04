import { isObject } from "./isObject"

describe("isObject", () => {
  it("can validate if a value is an object", () => {
    expect(isObject({}, "$")).toHaveLength(0)
    expect(isObject({ foo: "bar" }, "$")).toHaveLength(0)
    expect(
      isObject({ theQuickBrownFoxJumpsOverTheLazyDog: "like always" }, "$"),
    ).toHaveLength(0)
  })

  it("can validate if a value is not an object", () => {
    expect(isObject("still a string", "$")).not.toHaveLength(0)
    expect(isObject(1, "$")).not.toHaveLength(0)
    expect(isObject(Infinity, "$")).not.toHaveLength(0)
    expect(isObject(Number.NaN, "$")).not.toHaveLength(0)
    expect(isObject(false, "$")).not.toHaveLength(0)
    expect(isObject([], "$")).not.toHaveLength(0)
    expect(isObject(null, "$")).not.toHaveLength(0)
    expect(isObject(undefined, "$")).not.toHaveLength(0)
  })
})
