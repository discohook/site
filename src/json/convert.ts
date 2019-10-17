import { applyIds } from "../message/applyIds"
import { Message } from "../message/Message"
import { toCamelCase, toSnakeCase } from "./casing"
import { parseJson } from "./parseJson"
import { isMessage } from "./validation"

export const stringifyMessage = (message: Message) => {
  return JSON.stringify(toSnakeCase(message), undefined, 2)
}

export const parseMessage = (json: string) => {
  const { value: parsedJson, error: jsonError } = parseJson(json)

  if (jsonError) return { errors: [jsonError] }

  const camelCase = toCamelCase(parsedJson)

  const errors = isMessage(camelCase, "$").map(error => {
    const [, key, message] = /(.*): (.*)/.exec(error)
    const snakeCaseKey = key.replace(/[A-Z]/g, m => `_${m.toLowerCase()}`)
    return `${snakeCaseKey}: ${message}`
  })

  return {
    message: applyIds(camelCase),
    errors,
  }
}
