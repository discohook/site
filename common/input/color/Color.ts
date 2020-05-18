import { action, computed, observable } from "mobx"

export class Color {
  @observable hue = 0
  @observable saturation = 0
  @observable value = 0

  constructor(color: number | null = null) {
    this.raw = color
  }

  @computed get valid() {
    return !Number.isNaN(this.hue)
  }

  @action invalidate() {
    this.hue = Number.NaN
    this.saturation = 0
    this.value = 0
  }

  @computed get hex() {
    if (!this.valid) return undefined

    return `#${this.raw?.toString(16).padStart(6, "0")}`
  }
  set hex(hex) {
    if (!hex) {
      this.invalidate()
      return
    }

    const [, red = 0, green = 0, blue = 0] =
      /#(\w{2})(\w{2})(\w{2})/
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

    this.hue = hue
    this.saturation = saturation
    this.value = value
  }

  @computed get raw() {
    if (!this.valid) return null

    const f = (n: number) => {
      const k = (n + this.hue / 60) % 6

      return (
        this.value -
        this.value * this.saturation * Math.max(Math.min(k, 4 - k, 1), 0)
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
  }
  set raw(value) {
    this.hex =
      typeof value === "number" ? `#${value.toString(16).padStart(6, "0")}` : ""
  }
}
