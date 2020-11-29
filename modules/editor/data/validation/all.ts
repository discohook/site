import type { Validator } from "./Validator"

export const all = (...validators: Validator[]): Validator => (value, key) =>
  validators.flatMap(validate => validate(value, key))
