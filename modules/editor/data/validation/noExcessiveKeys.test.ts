import { noExcessiveKeys } from "./noExcessiveKeys"

describe("noExcessiveKeys", () => {
  it("errors with excessive object keys", () => {
    const validate = noExcessiveKeys("foo")

    expect(validate({ foo: "bar", baz: "qux" }, "$")).not.toHaveLength(0)
  })
})
