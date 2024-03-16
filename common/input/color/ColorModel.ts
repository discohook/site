import { Instance, types } from "mobx-state-tree"

const colorValue = types.custom<number | null, number>({
  name: "ColorValue",
  fromSnapshot(value) {
    return value ?? Number.NaN
  },
  toSnapshot(value) {
    return Number.isNaN(value) ? null : value
  },
  isTargetType(value) {
    return typeof value === "number"
  },
  getValidationMessage(value: unknown) {
    if (typeof value === "number" || value === null) return ""
    return "Value is not a number or null"
  },
})

export const ColorModel = types
  .model("ColorModel", {
    hue: types.optional(colorValue, Number.NaN),
    saturation: types.optional(colorValue, Number.NaN),
    value: types.optional(colorValue, Number.NaN),
  })
  .views(self => ({
    get valid() {
      return ![self.hue, self.saturation, self.value].some(n => Number.isNaN(n))
    },

    get raw() {
      if (!this.valid) return null

      const f = (n: number) => {
        const k = (n + self.hue / 60) % 6

        return (
          self.value -
          self.value * self.saturation * Math.max(Math.min(k, 4 - k, 1), 0)
        )
      }

      return (
        // red
        Math.round(f(5) * 255) * 0x010000 +
        // green
        Math.round(f(3) * 255) * 0x000100 +
        // blue
        Math.round(f(1) * 255)
      )
    },

    get hex() {
      if (!this.valid) return
      return `#${this.raw?.toString(16).padStart(6, "0")}`
    },
  }))
  .actions(self => ({
    invalidate() {
      self.hue = Number.NaN
      self.saturation = 0
      self.value = 0
    },

    setHue(value: number) {
      self.hue = value
    },
    setSaturation(value: number) {
      self.saturation = value
    },
    setValue(value: number) {
      self.value = value
    },

    setRaw(value: number | null) {
      this.setHex(
        typeof value === "number"
          ? `#${value.toString(16).padStart(6, "0")}`
          : "",
      )
    },

    setHex(hex: string) {
      if (!hex) {
        this.invalidate()
        return
      }

      const [, red = 0, green = 0, blue = 0] =
        /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i
          .exec(hex)
          ?.map(hex => Number.parseInt(hex, 16)) ?? []

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

      self.hue = hue
      self.saturation = saturation
      self.value = value
    },
  }))

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface ColorLike extends Instance<typeof ColorModel> {}
