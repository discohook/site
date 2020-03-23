import type { Validator } from "../types/Validator"

export const isArray: Validator = (value, key) =>
  Array.isArray(value) ? [] : [`${key}: Must be array`]
