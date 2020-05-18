import { first } from "../../../common/validation/first"
import { isBoolean } from "../../../common/validation/isBoolean"
import { isShape } from "../../../common/validation/isShape"
import { isString } from "../../../common/validation/isString"
import { length } from "../../../common/validation/length"
import { optional } from "../../../common/validation/optional"
import { requiresKeys } from "../../../common/validation/requiresKeys"
import type { Validator } from "../../../common/validation/Validator"

export const isField: Validator = first(
  requiresKeys("name", "value"),
  isShape({
    name: first(isString, length(1, 256)),
    value: first(isString, length(1, 1024)),
    inline: optional(isBoolean),
  }),
)
