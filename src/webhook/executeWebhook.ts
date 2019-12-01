import { stringifyMessage } from "../json/convert"
import { FileLike } from "../message/FileLike"
import { Message } from "../message/Message"
import { webhookUrlRegex } from "./webhookUrlRegex"

export const executeWebhook = async (
  webhookUrl: string,
  message: Message,
  files: readonly (File | FileLike)[],
) => {
  if (!webhookUrlRegex.test(webhookUrl)) return

  const formData = new FormData()

  const json = stringifyMessage(message)
  if (json !== "{}") formData.append("payload_json", json)

  for (const [index, file] of files.entries()) {
    if (file instanceof File) {
      formData.append(`file[${index}]`, file, file.name)
    }
  }

  const response = await fetch(`${webhookUrl}?wait=true`, {
    method: "POST",
    body: formData,
  })

  console.log("Webhook executed:", await response.json())
}
