import { requiresKey } from "./requiresKey"
import { requiresKeys } from "./requiresKeys"

describe("requiresKeys", () => {
  it("validates if all keys exist", () => {
    const validate = requiresKeys("foo", "bar")

    expect(validate({ foo: 1, bar: 2 }, "$")).toHaveLength(0)
    expect(validate({ foo: 1 }, "$")).not.toHaveLength(0)
    expect(validate({ bar: 2 }, "$")).not.toHaveLength(0)
    expect(validate({}, "$")).not.toHaveLength(0)
  })

  it("ignores excessive object keys", () => {
    const validate = requiresKey("foo")

    expect(validate({ foo: "bar", baz: "qux" }, "$")).toHaveLength(0)
  })
})
