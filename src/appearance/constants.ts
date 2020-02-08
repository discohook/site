import { darkTheme } from "./themes/darkTheme"
import { lightTheme } from "./themes/lightTheme"
import { ColorTheme } from "./types/ColorTheme"
import { Theme } from "./types/Theme"

export const COLOR_THEMES = ["dark", "light"] as const

export const DISPLAY_THEMES = ["cozy", "compact"] as const

export const FONT_SIZES = [12, 14, 15, 16, 18, 20, 24] as const

export const THEMES: Record<Theme["appearance"]["color"], ColorTheme> = {
  dark: darkTheme,
  light: lightTheme,
}
