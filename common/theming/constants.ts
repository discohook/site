import type { Appearance } from "./Appearance"
import type { ColorTheme } from "./ColorTheme"
import { DARK_THEME } from "./darkTheme"
import { LIGHT_THEME } from "./lightTheme"

export const COLOR_THEMES = ["dark", "light"] as const

export const DISPLAY_THEMES = ["cozy", "compact"] as const

export const FONT_SIZES = [12, 14, 15, 16, 18, 20, 24] as const

export const THEMES: Record<Appearance["color"], ColorTheme> = {
  dark: DARK_THEME,
  light: LIGHT_THEME,
}
