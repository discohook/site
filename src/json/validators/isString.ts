import type { Validator } from "../types/Validator"

export const isString: Validator = (value, key) =>
  typeof value === "string" ? [] : [`${key}: Must be string`]
