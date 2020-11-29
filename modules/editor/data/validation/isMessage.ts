import { contains } from "./contains"
import { first } from "./first"
import { isEmbed } from "./isEmbed"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { isUrl } from "./isUrl"
import { length } from "./length"
import { noExcessiveKeys } from "./noExcessiveKeys"
import { nullable } from "./nullable"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"
import type { Validator } from "./Validator"

export const isMessage: Validator = first(
  noExcessiveKeys("content", "embeds", "username", "avatar_url"),
  requiresKey("content", "embeds"),
  isShape({
    content: optional(nullable(first(isString, length(1, 2000)))),
    embeds: optional(nullable(first(contains(isEmbed), length(1, 10)))),
    username: optional(first(isString, length(1, 256))),
    avatar_url: optional(isUrl),
  }),
)
