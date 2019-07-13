import { Message } from "../../message/Message"

export interface Backup {
  message: Message
  files: FakeFile[]
}

export interface FakeFile {
  name: string
  type: string
  size: number
}
