import type { Validator } from "./Validator"

export const optional = (validate: Validator): Validator => (value, key) =>
  value === undefined ? [] : validate(value, key)
