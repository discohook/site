import { hexToNumber } from "./hexToNumber"

describe("hexToNumber", () => {
  it("converts hex to numbers", () => {
    expect(hexToNumber("#000000")).toEqual(0x000000)
    expect(hexToNumber("#000001")).toEqual(0x000001)
    expect(hexToNumber("#ffffff")).toEqual(0xffffff)
    expect(hexToNumber("#fffffe")).toEqual(0xfffffe)
    expect(hexToNumber("#7289da")).toEqual(0x7289da)
    expect(hexToNumber("#43b581")).toEqual(0x43b581)
    expect(hexToNumber("#faa61a")).toEqual(0xfaa61a)
    expect(hexToNumber("#f04747")).toEqual(0xf04747)
  })
})
