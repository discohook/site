import type { MessageData } from "../data/MessageData"

export const stringifyMessage = (message: MessageData, pretty = true) => {
  return JSON.stringify(
    { ...message, files: undefined },
    undefined,
    pretty ? 2 : undefined,
  )
}
