import { Message } from "../../message/Message"
import { toCamelCase, toSnakeCase } from "./casing"

export const stringifyMessage = (message: Message) => {
  return JSON.stringify(
    toSnakeCase(message),
    (key, value) => {
      if (key === "timestamp" && value instanceof Date) {
        return value.toISOString()
      }

      return value
    },
    2,
  )
}

export const parseMessage = (json: string) => {
  return toCamelCase(
    JSON.parse(json, (key, value) => {
      if (key === "timestamp" && typeof value === "string") {
        return new Date(value)
      }

      return value
    }),
  ) as Message
}
