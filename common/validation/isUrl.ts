import { first } from "./first"
import { isString } from "./isString"
import type { Validator } from "./Validator"

export const isUrl: Validator = first(isString, (value, key) =>
  /^https?:\/\//.test(value as string) ? [] : [`${key}: Must be URL`],
)
