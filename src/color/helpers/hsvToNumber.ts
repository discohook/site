/* eslint-disable id-length */

import { HsvColor } from "../types/HsvColor"

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
export const hsvToNumber = (color: HsvColor) => {
  const { hue, saturation, value } = color

  const f = (n: number) => {
    const k = (n + hue / 60) % 6
    return value - value * saturation * Math.max(Math.min(k, 4 - k, 1), 0)
  }

  const red = Math.round(f(5) * 255)
  const green = Math.round(f(3) * 255)
  const blue = Math.round(f(1) * 255)

  return red * 0x010000 + green * 0x000100 + blue
}
