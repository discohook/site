import { hexToNumber, numberToHex } from "./ColorInput"

describe("ColorInput", () => {
  it.each<[string, number]>([
    ["#000000", 0x0],
    ["#000001", 0x1],
    ["#ffffff", 0xFFFFFF],
    ["#fffffe", 0xFFFFFE],
    ["#7289da", 0x7289DA],
    ["#43b581", 0x43B581],
    ["#faa61a", 0xFAA61A],
    ["#f04747", 0xF04747],
  ])("converts between hex and numbers (%p <-> %p)", (hex, number) => {
    expect(hexToNumber(hex)).toEqual(number)
    expect(numberToHex(number)).toEqual(hex)
  })
})
