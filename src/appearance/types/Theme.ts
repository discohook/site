import type { Appearance } from "./Appearance"
import type { ColorTheme } from "./ColorTheme"

export type Theme = ColorTheme & {
  appearance: Appearance
}
