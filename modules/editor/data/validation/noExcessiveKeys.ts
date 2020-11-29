import { first } from "./first"
import { isObject } from "./isObject"
import type { Validator } from "./Validator"

export const noExcessiveKeys = (...keys: string[]): Validator =>
  first(isObject, (value, key) =>
    Object.keys(value as Record<string, unknown>)
      .filter(key => !keys.includes(key))
      .map(
        excessiveKey => `${key}: Excessive key ${JSON.stringify(excessiveKey)}`,
      ),
  )
