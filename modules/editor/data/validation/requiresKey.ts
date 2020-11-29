import { first } from "./first"
import { isObject } from "./isObject"
import type { Validator } from "./Validator"

export const requiresKey = (...keys: string[]): Validator =>
  first(isObject, (value, key) =>
    keys
      .map(requiredKey =>
        Object.prototype.hasOwnProperty.call(
          value as Record<string, unknown>,
          requiredKey,
        ),
      )
      .some(result => result)
      ? []
      : keys.length === 1
      ? [`${key}: Expected key ${JSON.stringify(keys[0])}`]
      : [
          `${key}: Expected one of following keys: ${keys
            .map(key => JSON.stringify(key))
            .join(", ")}`,
        ],
  )
