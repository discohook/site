import { Message } from "../../message/Message"
import { toCamelCase, toSnakeCase } from "./casing"

export const stringifyMessage = (message: Message) => {
  return JSON.stringify(toSnakeCase(message), undefined, 2)
}

export const parseMessage = (json: string) => {
  return toCamelCase(JSON.parse(json)) as Message
}
