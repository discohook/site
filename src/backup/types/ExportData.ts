import type { MessageData } from "../../message/types/MessageData"

export type ExportData =
  | {
      version: 1
      name: string
      message: MessageData
    }
  | {
      version: 2
      name: string
      message: object
    }
  | {
      version: 3
      backups: {
        name: string
        webhookUrl?: string
        message: object
      }[]
    }
