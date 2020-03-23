import { base64UrlEncode } from "../../base64/helpers/base64UrlEncode"
import type { MessageData } from "../../message/types/MessageData"

export const setUrlToMessage = (message: MessageData) => {
  const json = JSON.stringify({ message: { ...message, files: undefined } })
  const base64 = base64UrlEncode(json)

  history.replaceState(undefined, "", `?message=${base64}`)
}
