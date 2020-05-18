import { first } from "./first"
import { isArray } from "./isArray"
import type { Validator } from "./Validator"

export const contains = (validate: Validator): Validator =>
  first(isArray, (value, key) =>
    (value as unknown[]).flatMap((item, index) =>
      validate(item, `${key}[${index}]`),
    ),
  )
