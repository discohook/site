import { DiscordColor } from "../types/DiscordColor"

export const numberToHex = (number: DiscordColor): string =>
  typeof number === "number" ? `#${number.toString(16).padStart(6, "0")}` : ""
