import { Validator } from "../types/Validator"
import { all } from "./all"
import { first } from "./first"
import { isObject } from "./isObject"
import { requiresKey } from "./requiresKey"

export const requiresKeys = (...keys: string[]): Validator =>
  first(isObject, all(...keys.map(key => requiresKey(key))))
