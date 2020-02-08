import { isShape } from "./isShape"

describe("isShape", () => {
  it("does nothing on empty shapes", () => {
    const validate = isShape({})

    expect(validate({}, "$")).toHaveLength(0)
  })

  it("validates object shapes", () => {
    const pass = jest.fn(() => [])

    const validate = isShape({ key: pass })

    expect(validate({ key: "value" }, "$")).toHaveLength(0)

    expect(pass).toHaveBeenCalledTimes(1)
    expect(pass).toHaveBeenCalledWith("value", "$.key")
  })

  it("validates object shapes with multiple keys", () => {
    const pass = jest.fn(() => [])

    const validate = isShape({ one: pass, two: pass })

    expect(validate({ one: 1, two: 2 }, "$")).toHaveLength(0)

    expect(pass).toHaveBeenCalledTimes(2)
    expect(pass).toHaveBeenCalledWith(1, "$.one")
    expect(pass).toHaveBeenCalledWith(2, "$.two")
  })

  it("ignores excessive keys", () => {
    const pass = jest.fn(() => [])

    const validate = isShape({ foo: pass })

    expect(validate({ foo: "bar", baz: "qux" }, "$")).toHaveLength(0)

    expect(pass).toHaveBeenCalledTimes(1)
  })

  it("ignores missing keys", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = isShape({ key: fail })

    expect(validate({}, "$")).toHaveLength(0)

    expect(fail).toHaveBeenCalledTimes(0)
  })

  it("fails when a validator does not match", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = isShape({ key: fail })

    expect(validate({ key: "oh no" }, "$")).not.toHaveLength(0)

    expect(fail).toHaveBeenCalledTimes(1)
  })
})
