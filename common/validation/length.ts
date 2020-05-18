import { first } from "./first"
import { maxLength } from "./maxLength"
import { minLength } from "./minLength"
import type { Validator } from "./Validator"

export const length = (min: number, max: number): Validator =>
  first(minLength(min), maxLength(max))
