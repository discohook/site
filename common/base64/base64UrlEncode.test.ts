import { base64UrlEncode } from "./base64UrlEncode"

describe("base64UrlEncode", () => {
  it("encodes url safe base 64", () => {
    expect(base64UrlEncode("hello")).toEqual("aGVsbG8")
    expect(base64UrlEncode(">>>")).toEqual("Pj4-")
    expect(base64UrlEncode(">>?")).toEqual("Pj4_")
  })
})
