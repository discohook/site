import type { Validator } from "../types/Validator"
import { between } from "./between"
import { contains } from "./contains"
import { first } from "./first"
import { isArray } from "./isArray"
import { isAuthor } from "./isAuthor"
import { isDate } from "./isDate"
import { isField } from "./isField"
import { isFooter } from "./isFooter"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { length } from "./length"
import { nullable } from "./nullable"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"

export const isEmbed: Validator = first(
  requiresKey(
    "title",
    "description",
    "url",
    "timestamp",
    "color",
    "footer",
    "image",
    "thumbnail",
    "author",
    "fields",
  ),
  isShape({
    title: optional(first(isString, length(1, 256))),
    description: optional(first(isString, length(1, 2048))),
    url: optional(isString),
    timestamp: optional(isDate),
    color: optional(nullable(between(0, 0xffffff))),
    footer: optional(isFooter),
    image: optional(first(requiresKey("url"), isShape({ url: isString }))),
    thumbnail: optional(first(requiresKey("url"), isShape({ url: isString }))),
    author: optional(isAuthor),
    fields: optional(first(isArray, length(1, 25), contains(isField))),
  }),
)
