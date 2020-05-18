import { contains } from "../../../common/validation/contains"
import { first } from "../../../common/validation/first"
import { isArray } from "../../../common/validation/isArray"
import { isShape } from "../../../common/validation/isShape"
import { isString } from "../../../common/validation/isString"
import { length } from "../../../common/validation/length"
import { optional } from "../../../common/validation/optional"
import { requiresKey } from "../../../common/validation/requiresKey"
import type { Validator } from "../../../common/validation/Validator"
import { isEmbed } from "./isEmbed"

export const isMessage: Validator = first(
  requiresKey("content", "embeds"),
  isShape({
    content: optional(first(isString, length(1, 2000))),
    embeds: optional(first(isArray, length(1, 10), contains(isEmbed))),
    username: optional(first(isString, length(1, 256))),
    avatar_url: optional(isString),
  }),
)
