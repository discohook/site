import { MessageData } from "../../message/types/MessageData"

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
