import { requiresKey } from "./requiresKey"

describe("requiresKey", () => {
  it("validates if a key exists in an object", () => {
    const validate = requiresKey("foo")

    expect(validate({ foo: "bar" }, "$")).toHaveLength(0)
    expect(validate({}, "$")).not.toHaveLength(0)
  })

  it("validates if any keys from a set exist in an object", () => {
    const validate = requiresKey("foo", "bar")

    expect(validate({ foo: "haha" }, "$")).toHaveLength(0)
    expect(validate({ bar: "funny" }, "$")).toHaveLength(0)
    expect(validate({}, "$")).not.toHaveLength(0)
  })

  it("ignores excessive object keys", () => {
    const validate = requiresKey("foo")

    expect(validate({ foo: "bar", baz: "qux" }, "$")).toHaveLength(0)
  })
})
