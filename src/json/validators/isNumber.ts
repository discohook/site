import type { Validator } from "../types/Validator"

export const isNumber: Validator = (value, key) =>
  typeof value === "number" ? [] : [`${key}: Must be number`]
