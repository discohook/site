import { rgb } from "polished"
import { Theme } from "../types/Theme"

export const COMMON_THEME: Pick<Theme, "accent" | "font"> = {
  accent: {
    primary: rgb(114, 137, 218),
    success: rgb(67, 181, 129),
    warning: rgb(250, 166, 26),
    danger: rgb(240, 71, 71),
  },
  font: {
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
  },
}
