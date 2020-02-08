import { Message } from "../../message/types/Message"
import { toSnakeCase } from "./toSnakeCase"

export const stringifyMessage = (message: Message, pretty = true) => {
  return JSON.stringify(toSnakeCase(message), undefined, pretty ? 2 : undefined)
}
