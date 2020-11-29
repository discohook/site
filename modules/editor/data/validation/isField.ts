import { first } from "./first"
import { isBoolean } from "./isBoolean"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { length } from "./length"
import { noExcessiveKeys } from "./noExcessiveKeys"
import { optional } from "./optional"
import { requiresKeys } from "./requiresKeys"
import type { Validator } from "./Validator"

export const isField: Validator = first(
  noExcessiveKeys("name", "value", "inline"),
  requiresKeys("name", "value"),
  isShape({
    name: first(isString, length(1, 256)),
    value: first(isString, length(1, 1024)),
    inline: optional(isBoolean),
  }),
)
