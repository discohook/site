import type { Validator } from "../types/Validator"
import { first } from "./first"
import { isObject } from "./isObject"

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
