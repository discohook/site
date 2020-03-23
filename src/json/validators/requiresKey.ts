import type { Validator } from "../types/Validator"
import { first } from "./first"
import { isObject } from "./isObject"

export const requiresKey = (...keys: string[]): Validator =>
  first(isObject, (value, key) =>
    keys
      .map(requiredKey =>
        Object.prototype.hasOwnProperty.call(value as object, requiredKey),
      )
      .some(result => result)
      ? []
      : keys.length === 1
      ? [`${key}: Expected key "${keys[0]}"`]
      : [
          `${key}: Expected one of following keys: ${keys
            .map(key => `"${key}"`)
            .join(", ")}`,
        ],
  )
