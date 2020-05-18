import { first } from "./first"
import { isNumber } from "./isNumber"
import type { Validator } from "./Validator"

export const between = (min: number, max: number): Validator =>
  first(isNumber, (value, key) =>
    min > (value as number) || max < (value as number)
      ? [`${key}: Must be between ${min} and ${max} inclusive`]
      : [],
  )
