import type { MessageData } from "../../message/types/MessageData"

export type Schema = {
  backups: {
    key: string
    value: {
      name: string
      webhookUrl?: string
      message: MessageData
    }
  }
}
