import { numberToHsv } from "./numberToHsv"

describe("numberToHsv", () => {
  it("converts numbers to hsv", () => {
    const black = numberToHsv(0x000000)
    expect(black.hue).toBeCloseTo(0.0, 2)
    expect(black.saturation).toBeCloseTo(0.0, 4)
    expect(black.value).toBeCloseTo(0.0, 4)

    const white = numberToHsv(0xffffff)
    expect(white.hue).toBeCloseTo(0.0, 2)
    expect(white.saturation).toBeCloseTo(0.0, 4)
    expect(white.value).toBeCloseTo(1, 4)

    const accent = numberToHsv(0x7289da)
    expect(accent.hue).toBeCloseTo(226.73, 2)
    expect(accent.saturation).toBeCloseTo(0.4771, 4)
    expect(accent.value).toBeCloseTo(0.8549, 4)

    const green = numberToHsv(0x43b581)
    expect(green.hue).toBeCloseTo(152.63, 2)
    expect(green.saturation).toBeCloseTo(0.6298, 4)
    expect(green.value).toBeCloseTo(0.7098, 4)

    const yellow = numberToHsv(0xfaa61a)
    expect(yellow.hue).toBeCloseTo(37.5, 2)
    expect(yellow.saturation).toBeCloseTo(0.896, 4)
    expect(yellow.value).toBeCloseTo(0.9804, 4)

    const red = numberToHsv(0xf04747)
    expect(red.hue).toBeCloseTo(0.0, 2)
    expect(red.saturation).toBeCloseTo(0.7042, 4)
    expect(red.value).toBeCloseTo(0.9412, 4)
  })
})
