import { Color, HsvColor } from "./Color"

export const numberToHex = (number: Color): string =>
  typeof number === "number" ? `#${number.toString(16).padStart(6, "0")}` : ""

export const hexToNumber = (hex: string): Color => parseInt(hex.slice(1), 16)

// https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
export const numberToHsv = (color: Color) => {
  const [, red = 0, green = 0, blue = 0] =
    /#(\w{2})(\w{2})(\w{2})/
      .exec(numberToHex(color))
      ?.map(hex => parseInt(hex, 16)) ?? []

  const max = Math.max(red, blue, green)
  const min = Math.min(red, blue, green)
  const delta = max - min

  const value = max / 255
  const saturation = max && (max - min) / max

  let hue = 0
  if (max === red) hue = 60 * ((green - blue) / delta)
  if (max === green) hue = 60 * (2 + (blue - red) / delta)
  if (max === blue) hue = 60 * (4 + (red - green) / delta)
  if (delta === 0) hue = 0

  if (hue < 0) hue += 360

  return {
    hue,
    saturation,
    value,
  }
}

/* eslint-disable id-length */
// https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
export const hsvToNumber = (color: HsvColor) => {
  const { hue, saturation, value } = color

  const f = (n: number) => {
    const k = (n + hue / 60) % 6
    return value - value * saturation * Math.max(Math.min(k, 4 - k, 1), 0)
  }

  const red = Math.round(f(5) * 255)
    .toString(16)
    .padStart(2, "0")
  const green = Math.round(f(3) * 255)
    .toString(16)
    .padStart(2, "0")
  const blue = Math.round(f(1) * 255)
    .toString(16)
    .padStart(2, "0")

  return hexToNumber(`#${red}${green}${blue}`)
}
/* eslint-enable id-length */
