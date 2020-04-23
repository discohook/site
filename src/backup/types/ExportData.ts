import type { MessageData } from "../../message/types/MessageData"
import type { Backup } from "./Backup"

export type ExportData =
  | {
      version: 1
      name: string
      message: object
    }
  | {
      version: 2
      name: string
      message: MessageData
    }
  | {
      version: 3
      backups: Backup[]
    }
