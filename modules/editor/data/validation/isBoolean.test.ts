import { isBoolean } from "./isBoolean"

describe("isBoolean", () => {
  it("can validate if a value is a boolean", () => {
    expect(isBoolean(true, "$")).toHaveLength(0)
    expect(isBoolean(false, "$")).toHaveLength(0)
  })

  it("can validate if a value is not a boolean", () => {
    expect(isBoolean("trust me it's a string", "$")).not.toHaveLength(0)
    expect(isBoolean(1234567890, "$")).not.toHaveLength(0)
    expect(isBoolean(-(-(-Infinity)), "$")).not.toHaveLength(0)
    expect(isBoolean({}, "$")).not.toHaveLength(0)
    expect(isBoolean({ foo: "bar" }, "$")).not.toHaveLength(0)
    expect(isBoolean([], "$")).not.toHaveLength(0)
    expect(isBoolean(null, "$")).not.toHaveLength(0)
    expect(isBoolean(undefined, "$")).not.toHaveLength(0)
  })
})
