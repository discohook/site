import { numberToHex } from "./numberToHex"

describe("numberToHex", () => {
  it("converts numbers to hex", () => {
    expect(numberToHex(0x000000)).toEqual("#000000")
    expect(numberToHex(0x000001)).toEqual("#000001")
    expect(numberToHex(0xffffff)).toEqual("#ffffff")
    expect(numberToHex(0xfffffe)).toEqual("#fffffe")
    expect(numberToHex(0x7289da)).toEqual("#7289da")
    expect(numberToHex(0x43b581)).toEqual("#43b581")
    expect(numberToHex(0xfaa61a)).toEqual("#faa61a")
    expect(numberToHex(0xf04747)).toEqual("#f04747")
  })
})
