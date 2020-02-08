import { rgb, rgba } from "polished"
import { ColorTheme } from "../types/ColorTheme"
import { commonTheme } from "./commonTheme"

export const lightTheme: ColorTheme = {
  ...commonTheme,
  header: {
    primary: rgb(6, 6, 7),
    secondary: rgb(79, 86, 96),
  },
  text: {
    normal: rgb(46, 51, 56),
    muted: rgb(116, 127, 141),
    link: rgb(0, 103, 224),
  },
  interactive: {
    normal: rgb(79, 86, 96),
    hover: rgb(46, 51, 56),
    active: rgb(6, 6, 7),
    muted: rgb(199, 204, 209),
  },
  background: {
    primary: rgb(255, 255, 255),
    secondary: rgb(242, 243, 245),
    tertiary: rgb(227, 229, 232),
    accent: rgb(116, 127, 141),
    floating: rgb(255, 255, 255),
  },
  backgroundModifier: {
    hover: rgba(116, 127, 141, 0.08),
    active: rgba(116, 127, 141, 0.16),
    selected: rgba(116, 127, 141, 0.24),
    accent: rgba(6, 6, 7, 0.08),
  },
  elavation: {
    low: [
      `0 1px 0 ${rgba(6, 6, 7, 0.1)}`,
      `0 1.5px 0 ${rgba(6, 6, 7, 0.025)}`,
      `0 2px 0 ${rgba(6, 6, 7, 0.025)}`,
    ].join(","),
    high: `0 8px 16px ${rgba(0, 0, 0, 0.16)}`,
  },
}
