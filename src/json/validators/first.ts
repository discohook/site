import type { Validator } from "../types/Validator"

export const first = (...validators: Validator[]): Validator => (value, key) =>
  validators.reduce<string[]>(
    (results, validate) =>
      results.some(result => typeof result === "string")
        ? results
        : validate(value, key),
    [],
  )
