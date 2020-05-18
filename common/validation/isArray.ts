import type { Validator } from "./Validator"

export const isArray: Validator = (value, key) =>
  Array.isArray(value) ? [] : [`${key}: Must be array`]
