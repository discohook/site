import type { MessageData } from "../../message/types/MessageData"

export type Backup = {
  name: string
  webhookUrl?: string
  message: MessageData
}
