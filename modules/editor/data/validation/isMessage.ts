import { contains } from "./contains"
import { first } from "./first"
import { isEmbed } from "./isEmbed"
import { isNumber } from "./isNumber"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { isUrl } from "./isUrl"
import { isUsername } from "./isUsername"
import { length } from "./length"
import { noExcessiveKeys } from "./noExcessiveKeys"
import { nullable } from "./nullable"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"
import type { Validator } from "./Validator"

export const isMessage: Validator = first(
  noExcessiveKeys(
    "content",
    "embeds",
    "username",
    "avatar_url",
    "attachments",
    "thread_name",
    "flags",
    "allowed_mentions",
  ),
  requiresKey("content", "embeds"),
  isShape({
    content: optional(nullable(first(isString, length(1, 2000)))),
    embeds: optional(nullable(first(contains(isEmbed), length(1, 10)))),
    username: optional(first(isUsername, length(1, 80))),
    avatar_url: optional(isUrl),
    thread_name: optional(first(isString, length(1, 100))),
    flags: optional(isNumber),
  }),
)
