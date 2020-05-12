import type { Validator } from "../types/Validator"
import { contains } from "./contains"
import { first } from "./first"
import { isArray } from "./isArray"
import { isEmbed } from "./isEmbed"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { length } from "./length"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"

export const isMessage: Validator = first(
  requiresKey("content", "embeds"),
  isShape({
    content: optional(first(isString, length(1, 2000))),
    embeds: optional(first(isArray, length(1, 10), contains(isEmbed))),
    username: optional(first(isString, length(1, 256))),
    avatar_url: optional(isString),
  }),
)
