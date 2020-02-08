import { Color } from "../types/Color"

export const hexToNumber = (hex: string): Color => parseInt(hex.slice(1), 16)
