import type { Validator } from "../types/Validator"

export const nullable = (validate: Validator): Validator => (value, key) =>
  value === null ? [] : validate(value, key)
