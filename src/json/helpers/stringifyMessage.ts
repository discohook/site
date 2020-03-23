import type { MessageData } from "../../message/types/MessageData"
import { toSnakeCase } from "./toSnakeCase"

export const stringifyMessage = (message: MessageData, pretty = true) => {
  return JSON.stringify(
    toSnakeCase({ ...message, files: undefined }),
    undefined,
    pretty ? 2 : undefined,
  )
}
