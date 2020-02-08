import { optional } from "./optional"

describe("optional", () => {
  it("allows undefined", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = optional(fail)

    expect(validate(undefined, "$")).toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(0)
  })

  it("rejects null values", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = optional(fail)

    expect(validate(null, "$")).not.toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(1)
  })
})
