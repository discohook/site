import { rgb, rgba } from "polished"
import { ColorTheme, Theme } from "./Theme"

const accents = {
  primary: rgb(114, 137, 218),
  success: rgb(67, 181, 129),
  warning: rgb(250, 166, 26),
  danger: rgb(240, 71, 71),
}

const fonts = {
  sans: [
    "Whitney",
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    "sans-serif",
  ].join(),
  mono: [
    "Consolas",
    "Andale Mono WT",
    "Andale Mono",
    "Lucida Console",
    "Lucida Sans Typewriter",
    "DejaVu Sans Mono",
    "Bitstream Vera Sans Mono",
    "Liberation Mono",
    "Nimbus Mono L",
    "Monaco",
    "Courier New",
    "Courier",
    "monospace",
  ].join(),
}

export const darkTheme: ColorTheme = {
  accent: accents,
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
  font: fonts,
  elavation: {
    low: [
      `0 1px 0 ${rgba(4, 4, 5, 0.2)}`,
      `0 1.5px 0 ${rgba(6, 6, 7, 0.05)}`,
      `0 2px 0 ${rgba(4, 4, 5, 0.05)}`,
    ].join(","),
    high: `0 8px 16px ${rgba(0, 0, 0, 0.24)}`,
  },
}

export const lightTheme: ColorTheme = {
  accent: accents,
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
  font: fonts,
  elavation: {
    low: [
      `0 1px 0 ${rgba(6, 6, 7, 0.1)}`,
      `0 1.5px 0 ${rgba(6, 6, 7, 0.025)}`,
      `0 2px 0 ${rgba(6, 6, 7, 0.025)}`,
    ].join(","),
    high: `0 8px 16px ${rgba(0, 0, 0, 0.16)}`,
  },
}

export const themes: Record<Theme["appearance"]["color"], ColorTheme> = {
  dark: darkTheme,
  light: lightTheme,
}
