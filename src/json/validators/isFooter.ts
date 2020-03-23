/* eslint-disable @typescript-eslint/naming-convention */

import type { Validator } from "../types/Validator"
import { first } from "./first"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { length } from "./length"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"

export const isFooter: Validator = first(
  requiresKey("text"),
  isShape({
    text: first(isString, length(1, 2048)),
    icon_url: optional(isString),
  }),
)
