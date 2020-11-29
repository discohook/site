import type { Validator } from "./Validator"

export const isNumber: Validator = (value, key) =>
  typeof value === "number" ? [] : [`${key}: Must be number`]
