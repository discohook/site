import type { Validator } from "../types/Validator"

export const minLength = (length: number): Validator => (value, key) =>
  typeof value === "string" && value.trim().length < length
    ? [`${key}: Must be at least ${length} character long`]
    : Array.isArray(value) && value.length < length
    ? [`${key}: Must contain at least ${length} value`]
    : []
