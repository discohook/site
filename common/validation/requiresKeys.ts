import { all } from "./all"
import { first } from "./first"
import { isObject } from "./isObject"
import { requiresKey } from "./requiresKey"
import type { Validator } from "./Validator"

export const requiresKeys = (...keys: string[]): Validator =>
  first(isObject, all(...keys.map(key => requiresKey(key))))
