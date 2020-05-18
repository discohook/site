import { first } from "./first"
import { isObject } from "./isObject"
import type { Validator } from "./Validator"

export const isShape = (shape: Record<string, Validator>): Validator =>
  first(isObject, (value, key) =>
    Object.entries(shape).flatMap(([shapeKey, validate]) =>
      Object.prototype.hasOwnProperty.call(value, shapeKey)
        ? validate(
            (value as Record<string, unknown>)[shapeKey],
            `${key}.${shapeKey}`,
          )
        : [],
    ),
  )
