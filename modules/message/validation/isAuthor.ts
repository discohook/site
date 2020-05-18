import { first } from "../../../common/validation/first"
import { isShape } from "../../../common/validation/isShape"
import { isString } from "../../../common/validation/isString"
import { length } from "../../../common/validation/length"
import { optional } from "../../../common/validation/optional"
import { requiresKey } from "../../../common/validation/requiresKey"
import type { Validator } from "../../../common/validation/Validator"

export const isAuthor: Validator = first(
  requiresKey("name"),
  isShape({
    name: first(isString, length(1, 256)),
    url: optional(isString),
    icon_url: optional(isString),
  }),
)
