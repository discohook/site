import { contains } from "./contains"

describe("contains", () => {
  it("does not call validators with an empty array", () => {
    const pass = jest.fn(() => [])

    const validate = contains(pass)

    expect(validate([], "$")).toHaveLength(0)

    expect(pass).toHaveBeenCalledTimes(0)
  })

  it("validates each item in the array", () => {
    const pass = jest.fn(() => [])

    const validate = contains(pass)

    expect(validate([1, 2, 3], "$")).toHaveLength(0)

    expect(pass).toHaveBeenCalledTimes(3)
    expect(pass).toHaveBeenCalledWith(1, "$[0]")
    expect(pass).toHaveBeenCalledWith(2, "$[1]")
    expect(pass).toHaveBeenCalledWith(3, "$[2]")
  })

  it("shows errors for each item", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = contains(fail)

    expect(validate([1, 2, 3], "$")).toHaveLength(3)

    expect(fail).toHaveBeenCalledTimes(3)
    expect(fail).toHaveBeenCalledWith(1, "$[0]")
    expect(fail).toHaveBeenCalledWith(2, "$[1]")
    expect(fail).toHaveBeenCalledWith(3, "$[2]")
  })
})
