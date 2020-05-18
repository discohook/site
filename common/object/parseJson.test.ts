import { parseJson } from "./parseJson"

describe("parseJson", () => {
  it("parses json", () => {
    expect(parseJson('{"foo":"bar"}')).toEqual({ value: { foo: "bar" } })
    expect(parseJson("[1,2,3]")).toEqual({ value: [1, 2, 3] })
    expect(parseJson("null")).toEqual({ value: null })
  })

  it("gives an error on invalid json", () => {
    expect(parseJson("{")).toEqual({ error: expect.any(String) })
    expect(parseJson('{test:"cool"}')).toEqual({ error: expect.any(String) })
  })
})
