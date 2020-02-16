import { MessageData } from "../../message/types/MessageData"
import { toSnakeCase } from "./toSnakeCase"

export const stringifyMessage = (message: MessageData, pretty = true) => {
  return JSON.stringify(
    toSnakeCase(message),
    (key, value) => (key === "files" ? undefined : value),
    pretty ? 2 : undefined,
  )
}
