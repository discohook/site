import { Message } from "../../message/Message";
import { toCamelCase, toSnakeCase } from "./casing";
import { isMessage } from "./validation";

export const stringifyMessage = (message: Message) => {
  return JSON.stringify(toSnakeCase(message), undefined, 2)
}

export const parseMessage = (json: string) => {
  try {
    const object = toCamelCase(JSON.parse(json))

    const errors = isMessage(object, "message").map((error) => {
      const [key, ...message] = error.split(": ")
      return [
        key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`),
        ...message,
      ].join(": ")
    })
    if (errors.length > 0) return errors

    return object as Message
  } catch (error) {
    return [`message: ${error.message}`]
  }
}
