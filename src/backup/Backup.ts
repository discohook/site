import { FileLike } from "../message/FileLike"
import { Message } from "../message/Message"

export type Backup = {
  message: Message
  files: FileLike[]
}
