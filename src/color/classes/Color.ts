import { action, computed, observable } from "mobx"
import { hexToNumber } from "../helpers/hexToNumber"
import { hsvToNumber } from "../helpers/hsvToNumber"
import { numberToHex } from "../helpers/numberToHex"
import { numberToHsv } from "../helpers/numberToHsv"
import { DiscordColor } from "../types/DiscordColor"

export class Color {
  @observable hue = 0
  @observable saturation = 0
  @observable value = 0

  constructor(color: DiscordColor) {
    this.color = color
  }

  @computed get valid() {
    return !Number.isNaN(this.hue)
  }

  @action invalidate() {
    this.hue = NaN
    this.saturation = 0
    this.value = 0
  }

  @computed get hex() {
    if (!this.valid) return

    return numberToHex(
      hsvToNumber({
        hue: this.hue,
        saturation: this.saturation,
        value: this.value,
      }),
    )
  }
  set hex(hex) {
    if (!hex) {
      this.invalidate()
      return
    }

    const hsv = numberToHsv(hexToNumber(hex))

    this.hue = hsv.hue
    this.saturation = hsv.saturation
    this.value = hsv.value
  }

  @computed get color(): DiscordColor {
    if (!this.valid) return null

    return hsvToNumber({
      hue: this.hue,
      saturation: this.saturation,
      value: this.value,
    })
  }
  set color(value) {
    this.hex = numberToHex(value)
  }

  toJS(): DiscordColor {
    return this.color
  }
}
