import type { MessageData } from "../../../message/state/data/MessageData"

export type ExportData =
  | {
      version: 1
      name: string
      // camel case version of MessageData
      message: Record<string, unknown>
    }
  | {
      version: 2
      name: string
      message: MessageData
    }
  | {
      version: 3
      backups: {
        name: string
        webhookUrl?: string
        message: MessageData
      }[]
    }
  | {
      version: 4
      backups: {
        name: string
        webhookUrl?: string
        messages: MessageData[]
      }[]
    }
  | {
      version: 5
      backups: {
        name: string
        messages: MessageData[]
        target: {
          url?: string
          message?: string
        }
      }[]
    }
  | {
      version: 6
      backups: {
        name: string
        messages: {
          data: MessageData
          reference?: string
        }[]
        target: {
          url?: string
        }
      }[]
    }
  | {
      version: 7
      backups: {
        name: string
        messages: {
          data: MessageData
          reference?: string
        }[]
        targets: {
          url: string
        }[]
      }[]
    }
