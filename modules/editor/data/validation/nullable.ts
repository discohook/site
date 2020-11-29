import type { Validator } from "./Validator"

export const nullable = (validate: Validator): Validator => (value, key) =>
  value === null ? [] : validate(value, key)
