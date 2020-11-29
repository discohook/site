import { first } from "./first"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { isUrl } from "./isUrl"
import { length } from "./length"
import { noExcessiveKeys } from "./noExcessiveKeys"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"
import type { Validator } from "./Validator"

export const isAuthor: Validator = first(
  noExcessiveKeys("name", "url", "icon_url"),
  requiresKey("name"),
  isShape({
    name: first(isString, length(1, 256)),
    url: optional(isUrl),
    icon_url: optional(isUrl),
  }),
)
