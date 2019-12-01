import { applyIds } from "../message/applyIds"
import { Message } from "../message/Message"
import { toCamelCase, toSnakeCase } from "./objectCasing"
import { parseJson } from "./parseJson"
import { isMessage } from "./validation"

export const stringifyMessage = (message: Message, pretty = true) => {
  return JSON.stringify(toSnakeCase(message), undefined, pretty ? 2 : undefined)
}

export const parseMessage = (json: string) => {
  const { value: parsedJson, error } = parseJson(json)

  if (error) {
    return { errors: [error] }
  }

  return {
    message:
      typeof parsedJson === "object" && parsedJson !== null
        ? applyIds(toCamelCase(parsedJson))
        : parsedJson,
    errors: isMessage(parsedJson, "$"),
  }
}
