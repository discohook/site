import { computed, observable } from "mobx"
import { THEMES } from "./constants"
import type { Appearance } from "./themes/Appearance"
import type { Theme } from "./themes/Theme"

export class AppearanceManager {
  @observable color: Appearance["color"]
  @observable display: Appearance["display"]
  @observable fontSize: Appearance["fontSize"]
  @observable mobile: Appearance["mobile"]

  constructor(appearance?: Partial<Appearance>) {
    this.color = appearance?.color ?? "dark"
    this.display = appearance?.display ?? "cozy"
    this.fontSize = appearance?.fontSize ?? 16
    this.mobile = appearance?.mobile ?? false
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  @computed.struct get theme(): Theme {
    return {
      ...THEMES[this.color],
      appearance: {
        color: this.color,
        display: this.display,
        fontSize: this.fontSize,
        mobile: this.mobile,
      },
    }
  }
}
