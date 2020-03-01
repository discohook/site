import { computed, observable } from "mobx"
import { InitialisableStore } from "../../state/classes/InitialisableStore"
import { THEMES } from "../constants"
import { Appearance } from "../types/Appearance"
import { Theme } from "../types/Theme"

export class AppearanceStore extends InitialisableStore {
  @observable color: Appearance["color"] = "dark"
  @observable display: Appearance["display"] = "cozy"
  @observable fontSize: Appearance["fontSize"] = 16
  @observable mobile: Appearance["mobile"] = false

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
