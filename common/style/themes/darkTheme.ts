import { rgb, rgba } from "polished"
import type { ColorTheme } from "./ColorTheme"
import { COMMON_THEME } from "./commonTheme"

export const DARK_THEME: ColorTheme = {
  ...COMMON_THEME,
  header: {
    primary: rgb(255, 255, 255),
    secondary: rgb(185, 187, 190),
  },
  text: {
    normal: rgb(220, 221, 222),
    muted: rgb(114, 118, 125),
    link: rgb(0, 176, 244),
  },
  interactive: {
    normal: rgb(185, 187, 190),
    hover: rgb(220, 221, 222),
    active: rgb(255, 255, 255),
    muted: rgb(79, 84, 92),
  },
  background: {
    primary: rgb(54, 57, 63),
    secondary: rgb(47, 49, 54),
    tertiary: rgb(32, 34, 37),
    accent: rgb(79, 84, 92),
    floating: rgb(24, 25, 28),
  },
  backgroundModifier: {
    hover: rgba(79, 84, 92, 0.16),
    active: rgba(79, 84, 92, 0.24),
    selected: rgba(79, 84, 92, 0.32),
    accent: rgba(255, 255, 255, 0.06),
  },
  elavation: {
    stroke: `0 0 0 1px ${rgba(4, 4, 5, 0.15)}`,
    low: [
      `0 1px 0 ${rgba(4, 4, 5, 0.2)}`,
      `0 1.5px 0 ${rgba(6, 6, 7, 0.05)}`,
      `0 2px 0 ${rgba(4, 4, 5, 0.05)}`,
    ].join(","),
    medium: `0 4px 4px ${rgba(0, 0, 0, 0.16)}`,
    high: `0 8px 16px ${rgba(0, 0, 0, 0.24)}`,
  },
}
