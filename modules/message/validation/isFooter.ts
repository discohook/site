import { first } from "../../../common/validation/first"
import { isShape } from "../../../common/validation/isShape"
import { isString } from "../../../common/validation/isString"
import { length } from "../../../common/validation/length"
import { optional } from "../../../common/validation/optional"
import { requiresKey } from "../../../common/validation/requiresKey"
import type { Validator } from "../../../common/validation/Validator"

export const isFooter: Validator = first(
  requiresKey("text"),
  isShape({
    text: first(isString, length(1, 2048)),
    icon_url: optional(isString),
  }),
)
