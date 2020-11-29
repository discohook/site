import { between } from "./between"
import { contains } from "./contains"
import { first } from "./first"
import { isAuthor } from "./isAuthor"
import { isDate } from "./isDate"
import { isField } from "./isField"
import { isFooter } from "./isFooter"
import { isShape } from "./isShape"
import { isString } from "./isString"
import { isUrl } from "./isUrl"
import { length } from "./length"
import { noExcessiveKeys } from "./noExcessiveKeys"
import { nullable } from "./nullable"
import { optional } from "./optional"
import { requiresKey } from "./requiresKey"
import type { Validator } from "./Validator"

export const isEmbed: Validator = first(
  noExcessiveKeys(
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
    url: optional(isUrl),
    timestamp: optional(isDate),
    color: optional(nullable(between(0, 0xffffff))),
    footer: optional(isFooter),
    image: optional(
      first(
        noExcessiveKeys("url"),
        requiresKey("url"),
        isShape({ url: isUrl }),
      ),
    ),
    thumbnail: optional(
      first(
        noExcessiveKeys("url"),
        requiresKey("url"),
        isShape({ url: isUrl }),
      ),
    ),
    author: optional(isAuthor),
    fields: optional(first(contains(isField), length(1, 25))),
  }),
)
