import type { MessageData } from "../../../message/state/data/MessageData"

export type Backup = {
  id?: number
  name: string
  messages: {
    data: MessageData
    reference?: string
  }[]
  target: {
    url?: string
  }
}
