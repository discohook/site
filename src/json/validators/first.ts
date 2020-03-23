import type { Validator } from "../types/Validator"

export const first = (...validators: Validator[]): Validator => (value, key) =>
  validators.reduce(
    (results, validate) =>
      results.some(result => typeof result === "string")
        ? results
        : validate(value, key),
    [] as string[],
  )
