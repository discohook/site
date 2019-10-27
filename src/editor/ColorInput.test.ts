import { hexToNumber, numberToHex } from "./ColorInput"

describe("ColorInput", () => {
  it.each<[string, number]>([
    ["#000000", 0x0],
    ["#000001", 0x1],
    ["#ffffff", 0xffffff],
    ["#fffffe", 0xfffffe],
    ["#7289da", 0x7289da],
    ["#43b581", 0x43b581],
    ["#faa61a", 0xfaa61a],
    ["#f04747", 0xf04747],
  ])("converts between hex and numbers (%p <-> %p)", (hex, number) => {
    expect(hexToNumber(hex)).toEqual(number)
    expect(numberToHex(number)).toEqual(hex)
  })
})
