import { Validator } from "../types/Validator"

export const maxLength = (length: number): Validator => (value, key) =>
  typeof value === "string" && value.trim().length > length
    ? [`${key}: Must be at most ${length} long`]
    : Array.isArray(value) && value.length > length
    ? [`${key}: Must contain at most ${length} values`]
    : []
