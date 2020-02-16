import { base64UrlEncode } from "../../base64/helpers/base64UrlEncode"
import { MessageData } from "../../message/types/MessageData"

export const setUrlToMessage = (message: MessageData) => {
  const json = JSON.stringify({ message })
  const base64 = base64UrlEncode(json)

  history.replaceState(undefined, "", `?backup=${base64}`)
}
