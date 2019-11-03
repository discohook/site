import { base64Decode, base64Encode } from "./base64"

describe("base64Encode", () => {
  it("encodes base 64", () => {
    expect(base64Encode("hey")).toEqual("aGV5")
    expect(base64Encode("hello")).toEqual("aGVsbG8=")
    expect(base64Encode(">>>")).toEqual("Pj4+")
    expect(base64Encode(">>?")).toEqual("Pj4/")
  })

  it("encodes url safe base 64", () => {
    expect(base64Encode("hello", true)).toEqual("aGVsbG8")
    expect(base64Encode(">>>", true)).toEqual("Pj4-")
    expect(base64Encode(">>?", true)).toEqual("Pj4_")
  })
})

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
