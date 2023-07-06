import { first } from "./first"
import { isString } from "./isString"
import type { Validator } from "./Validator"

export const isUsername: Validator = first(isString, (value, key) =>
  !/(^(everyone|here)$)|discord|```/i.test(value as string) ? [] : [`${key}: Cannot be "here" or "everyone", cannot contain "discord" or "\`\`\`"`]
)
