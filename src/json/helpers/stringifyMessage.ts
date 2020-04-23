import type { MessageData } from "../../message/types/MessageData"

export const stringifyMessage = (message: MessageData, pretty = true) => {
  return JSON.stringify(
    {
      ...message,
      files: undefined,
    },
    undefined,
    pretty ? 2 : undefined,
  )
}
