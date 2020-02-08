import { stringifyMessage } from "../../json/helpers/stringifyMessage"
import { FileLike } from "../../message/types/FileLike"
import { Message } from "../../message/types/Message"

export const executeWebhook = async (
  webhookUrl: string,
  message: Message,
  files: readonly (File | FileLike)[],
) => {
  const formData = new FormData()

  const json = stringifyMessage(message, false)
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
