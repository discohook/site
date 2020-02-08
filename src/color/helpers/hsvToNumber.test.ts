import { hsvToNumber } from "./hsvToNumber"

describe("hsvToNumber", () => {
  it("converts hsv to numbers", () => {
    expect(
      hsvToNumber({
        hue: 0,
        saturation: 0,
        value: 0,
      }),
    ).toEqual(0x000000)

    expect(
      hsvToNumber({
        hue: 0,
        saturation: 0,
        value: 1,
      }),
    ).toEqual(0xffffff)

    expect(
      hsvToNumber({
        hue: 226.73,
        saturation: 0.4771,
        value: 0.8549,
      }),
    ).toEqual(0x7289da)

    expect(
      hsvToNumber({
        hue: 152.63,
        saturation: 0.6298,
        value: 0.7098,
      }),
    ).toEqual(0x43b581)

    expect(
      hsvToNumber({
        hue: 37.5,
        saturation: 0.896,
        value: 0.9804,
      }),
    ).toEqual(0xfaa61a)

    expect(
      hsvToNumber({
        hue: 0,
        saturation: 0.7042,
        value: 0.9412,
      }),
    ).toEqual(0xf04747)
  })
})
