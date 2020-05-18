import { base64Encode } from "./base64Encode"

describe("base64Encode", () => {
  it("encodes base 64", () => {
    expect(base64Encode("hey")).toEqual("aGV5")
    expect(base64Encode("hello")).toEqual("aGVsbG8=")
    expect(base64Encode(">>>")).toEqual("Pj4+")
    expect(base64Encode(">>?")).toEqual("Pj4/")
  })
})
