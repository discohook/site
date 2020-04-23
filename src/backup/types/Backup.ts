import type { MessageData } from "../../message/types/MessageData"

export type Backup = {
  id?: number
  name: string
  webhookUrl?: string
  message: MessageData
}
