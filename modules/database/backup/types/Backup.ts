import type { MessageData } from "../../../message/data/MessageData"

export type Backup = {
  id?: number
  name: string
  webhookUrl?: string
  message: MessageData
}
