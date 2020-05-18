import { all } from "./all"

describe("all", () => {
  it("can compose multiple validators", () => {
    const pass = jest.fn(() => [])
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = all(fail, pass)

    expect(validate(undefined, "$")).toEqual(["$: Fail"])
    expect(fail.mock.calls.length).toBe(1)
    expect(pass.mock.calls.length).toBe(1)
  })

  it("combines error messages", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    const validate = all(fail, fail)

    expect(validate(undefined, "$")).toEqual(["$: Fail", "$: Fail"])
    expect(fail.mock.calls.length).toBe(2)
  })
})
