/* eslint-disable @typescript-eslint/naming-convention */

import { Validator } from "../types/Validator"
import { first } from "./first"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { length } from "./length"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"

export const isAuthor: Validator = first(
  requiresKey("name"),
  isShape({
    name: first(isString, length(1, 256)),
    url: optional(isString),
    icon_url: optional(isString),
  }),
)
