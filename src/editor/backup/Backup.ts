import { Message } from "../../message/Message"

export type Backup = {
  message: Message
  files: FileLike[]
}

export type FileLike = {
  name: string
  type: string
  size: number
}
