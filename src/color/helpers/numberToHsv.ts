import type { DiscordColor } from "../types/DiscordColor"
import { numberToHex } from "./numberToHex"

// https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
export const numberToHsv = (color: DiscordColor) => {
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
