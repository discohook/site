import { first } from "./first"
import { isString } from "./isString"
import type { Validator } from "./Validator"

export const isUsername: Validator = first(isString, (value, key) =>
  !/(^(everyone|here)$)|discord|clyde|```|system message/i.test(value as string)
    ? []
    : [
        `${key}: Cannot contain "discord", "clyde", "system message", or "\`\`\`", and cannot be "here" or "everyone"`,
      ],
)
