import { Validator } from "../types/Validator"

export const optional = (validate: Validator): Validator => (value, key) =>
  value === undefined ? [] : validate(value, key)
