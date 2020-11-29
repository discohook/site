import { matchesRegex } from "./matchesRegex"

export const isUrl = () => matchesRegex(/^https?:\/\//, "Invalid URL")
