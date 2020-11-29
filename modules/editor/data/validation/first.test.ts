import { first } from "./first"

describe("first", () => {
  it("can compose multiple validators", () => {
    const pass = jest.fn(() => [])

    const validate = first(pass, pass)

    expect(validate(undefined, "$")).toEqual([])
    expect(pass).toHaveBeenCalledTimes(2)
  })

  it("breaks at the first fail", () => {
    const pass = jest.fn(() => [])
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = first(fail, pass)

    expect(validate(undefined, "$")).toEqual(["$: Fail"])
    expect(fail).toHaveBeenCalledTimes(1)
    expect(pass).toHaveBeenCalledTimes(0)
  })
})
