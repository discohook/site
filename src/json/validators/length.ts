import type { Validator } from "../types/Validator"
import { first } from "./first"
import { maxLength } from "./maxLength"
import { minLength } from "./minLength"

export const length = (min: number, max: number): Validator =>
  first(minLength(min), maxLength(max))
