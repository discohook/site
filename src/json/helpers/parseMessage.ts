import { applyIds } from "../../message/helpers/applyIds"
import { isMessage } from "../validators/isMessage"
import { parseJson } from "./parseJson"
import { toCamelCase } from "./toCamelCase"

export const parseMessage = (json: string) => {
  const { value: parsedJson, error } = parseJson(json)
  if (error) {
    return { errors: [error] }
  }
  const errors = isMessage(parsedJson, "$")
  return {
    message:
      errors.length === 0
        ? applyIds(toCamelCase(parsedJson as object))
        : undefined,
    errors,
  }
}
