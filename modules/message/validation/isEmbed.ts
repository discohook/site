import { between } from "../../../common/validation/between"
import { contains } from "../../../common/validation/contains"
import { first } from "../../../common/validation/first"
import { isArray } from "../../../common/validation/isArray"
import { isDate } from "../../../common/validation/isDate"
import { isShape } from "../../../common/validation/isShape"
import { isString } from "../../../common/validation/isString"
import { length } from "../../../common/validation/length"
import { nullable } from "../../../common/validation/nullable"
import { optional } from "../../../common/validation/optional"
import { requiresKey } from "../../../common/validation/requiresKey"
import type { Validator } from "../../../common/validation/Validator"
import { isAuthor } from "./isAuthor"
import { isField } from "./isField"
import { isFooter } from "./isFooter"

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
