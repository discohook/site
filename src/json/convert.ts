import { applyIds } from "../message/applyIds"
import { Message } from "../message/Message"
import { toCamelCase, toSnakeCase } from "./casing"
import { isMessage } from "./validation"

export const stringifyMessage = (message: Message) => {
  return JSON.stringify(toSnakeCase(message), undefined, 2)
}

const parseJson = (json: string) => {
  try {
    return { value: JSON.parse(json) }
  } catch (error) {
    const message = error.message.replace(/^JSON\.parse: /, "")
    return { error: message }
  }
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
