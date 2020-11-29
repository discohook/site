import { first } from "./first"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { isUrl } from "./isUrl"
import { length } from "./length"
import { noExcessiveKeys } from "./noExcessiveKeys"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"
import type { Validator } from "./Validator"

export const isFooter: Validator = first(
  requiresKey("text"),
  noExcessiveKeys("text", "icon_url"),
  isShape({
    text: first(isString, length(1, 2048)),
    icon_url: optional(isUrl),
  }),
)
