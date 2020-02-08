import { base64Decode } from "./base64Decode"

describe("base64Decode", () => {
  it("decodes base 64", () => {
    expect(base64Decode("aGV5")).toEqual("hey")
    expect(base64Decode("aGVsbG8=")).toEqual("hello")
    expect(base64Decode("Pj4+")).toEqual(">>>")
    expect(base64Decode("Pj4/")).toEqual(">>?")
  })

  it("decodes url safe base 64", () => {
    expect(base64Decode("aGVsbG8")).toEqual("hello")
    expect(base64Decode("Pj4-")).toEqual(">>>")
    expect(base64Decode("Pj4_")).toEqual(">>?")
  })
})
