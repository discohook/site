import { Color } from "../types/Color"

export const numberToHex = (number: Color): string =>
  typeof number === "number" ? `#${number.toString(16).padStart(6, "0")}` : ""
