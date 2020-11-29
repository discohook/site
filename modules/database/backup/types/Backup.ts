import type { MessageData } from "../../../message/state/data/MessageData"

export type Backup = {
  id?: number
  name: string
  messages: MessageData[]
  target: {
    url?: string
    message?: string
  }
}
