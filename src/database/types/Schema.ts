import { MessageData } from "../../message/types/MessageData"

export type Schema = {
  backups: {
    key: string
    value: MessageData
  }
}
