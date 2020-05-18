import { nullable } from "./nullable"

describe("nullable", () => {
  it("allows null values", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = nullable(fail)

    expect(validate(null, "$")).toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(0)
  })

  it("rejects undefined", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = nullable(fail)

    expect(validate(undefined, "$")).not.toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(1)
  })
})
