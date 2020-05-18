import type { Validator } from "./Validator"

export const isString: Validator = (value, key) =>
  typeof value === "string" ? [] : [`${key}: Must be string`]
