import { Appearance } from "./Appearance"
import { ColorTheme } from "./ColorTheme"

export type Theme = ColorTheme & {
  appearance: Appearance
}
