import type { Validator } from "../types/Validator"
import { first } from "./first"
import { isArray } from "./isArray"

export const contains = (validate: Validator): Validator =>
  first(isArray, (value, key) =>
    (value as unknown[]).flatMap((item, index) =>
      validate(item, `${key}[${index}]`),
    ),
  )
