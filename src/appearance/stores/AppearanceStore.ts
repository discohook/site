import { computed, observable } from "mobx"
import { InitializableStore } from "../../state/classes/InitializableStore"
import { THEMES } from "../constants"
import { Appearance } from "../types/Appearance"
import { Theme } from "../types/Theme"

export class AppearanceStore extends InitializableStore {
  @observable color: Appearance["color"] = "dark"
  @observable display: Appearance["display"] = "cozy"
  @observable fontSize: Appearance["fontSize"] = 16
  @observable mobile: Appearance["mobile"] = false

  async initialise() {
    const { ssrStore } = this.manager.stores
    await ssrStore.initialised

    const userAgent = ssrStore.context
      ? ssrStore.context.get("User-Agent")
      : navigator.userAgent
    this.mobile = /mobile/i.test(userAgent)
  }

  @computed get theme(): Theme {
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
