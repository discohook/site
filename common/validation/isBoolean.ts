import type { Validator } from "./Validator"

export const isBoolean: Validator = (value, key) =>
  typeof value === "boolean" ? [] : [`${key}: Must be boolean`]
