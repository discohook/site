import { computed, observable } from "mobx"
import { THEMES } from "../theming/constants"
import type { Theme } from "../theming/Theme"
import { DEFAULT_PREFERENCES } from "./defaultPreferences"
import type { Preferences } from "./Preferences"

export class PreferenceManager {
  @observable settings: Preferences = { ...DEFAULT_PREFERENCES }

  load() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = this.settings as any

    const storedSettings: Partial<Preferences> =
      typeof window === "undefined"
        ? {}
        : JSON.parse(localStorage.getItem("settings") ?? "{}")

    for (const [key, value] of Object.entries(storedSettings)) {
      if (!Object.keys(settings).includes(key)) continue

      settings[key] = value
    }
  }

  dump() {
    const json = JSON.stringify(this.settings)
    localStorage.setItem("settings", json)
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  @computed.struct get theme(): Theme {
    const { color, display, fontSize } = this.settings

    return {
      ...THEMES[color],
      appearance: {
        color,
        display,
        fontSize,
      },
    }
  }
}
