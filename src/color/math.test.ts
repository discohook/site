import { hexToNumber, hsvToNumber, numberToHex, numberToHsv } from "./math"

const colors = [
  {
    number: 0x000000,
    hex: "#000000",
    hsv: { hue: 0, saturation: 0, value: 0 },
  },
  {
    number: 0x000001,
    hex: "#000001",
    hsv: { hue: 240, saturation: 1, value: 0.0039 },
  },
  {
    number: 0xffffff,
    hex: "#ffffff",
    hsv: { hue: 0, saturation: 0, value: 1 },
  },
  {
    number: 0xfffffe,
    hex: "#fffffe",
    hsv: { hue: 60, saturation: 0.0039, value: 1 },
  },
  {
    number: 0x7289da,
    hex: "#7289da",
    hsv: { hue: 226.73, saturation: 0.4771, value: 0.8549 },
  },
  {
    number: 0x43b581,
    hex: "#43b581",
    hsv: { hue: 152.63, saturation: 0.6298, value: 0.7098 },
  },
  {
    number: 0xfaa61a,
    hex: "#faa61a",
    hsv: { hue: 37.5, saturation: 0.896, value: 0.9804 },
  },
  {
    number: 0xf04747,
    hex: "#f04747",
    hsv: { hue: 0, saturation: 0.7042, value: 0.9412 },
  },
] as const

describe("hexToNumber", () => {
  it("converts hex to numbers", () => {
    for (const { number, hex } of colors) {
      expect(hexToNumber(hex)).toEqual(number)
    }
  })
})

describe("numberToHex", () => {
  it("converts numbers to hex", () => {
    for (const { number, hex } of colors) {
      expect(numberToHex(number)).toEqual(hex)
    }
  })
})

describe("numberToHsv", () => {
  it("converts numbers to hsv", () => {
    for (const { number, hsv } of colors) {
      const { hue, saturation, value } = numberToHsv(number)

      expect(hue).toBeCloseTo(hsv.hue, 2)
      expect(saturation).toBeCloseTo(hsv.saturation, 4)
      expect(value).toBeCloseTo(hsv.value, 4)
    }
  })
})

describe("hsvToNumber", () => {
  it("converts hsv to numbers", () => {
    for (const { number, hsv } of colors) {
      expect(hsvToNumber(hsv)).toEqual(number)
    }
  })
})
