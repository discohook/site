import { Message } from "../../message/Message"
import { getUniqueId, id } from "../../uid"
import { toCamelCase, toSnakeCase } from "./casing"
import { isMessage } from "./validation"

export const stringifyMessage = (message: Message) => {
  return JSON.stringify(toSnakeCase(message), undefined, 2)
}

export const parseMessage = (json: string) => {
  try {
    const message = toCamelCase(JSON.parse(json)) as Message

    const errors = isMessage(message, "$").map(error => {
      const [key, ...message] = error.split(": ")
      return [
        key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`),
        ...message,
      ].join(": ")
    })

    for (const embed of Array.from(message.embeds || [])) {
      embed[id] = getUniqueId()
      for (const field of Array.from(embed.fields || [])) {
        field[id] = getUniqueId()
      }
    }

    return {
      message,
      errors,
    }
  } catch (error) {
    return {
      errors: [error.message.replace(/^JSON\.parse(?: Error)?: /, "")],
    }
  }
}
