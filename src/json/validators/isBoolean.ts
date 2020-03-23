import type { Validator } from "../types/Validator"

export const isBoolean: Validator = (value, key) =>
  typeof value === "boolean" ? [] : [`${key}: Must be boolean`]
