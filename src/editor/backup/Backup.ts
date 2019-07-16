import { Message } from "../../message/Message"

export type Backup = {
  message: Message
  files: FakeFile[]
}

export type FakeFile = {
  name: string
  type: string
  size: number
}
