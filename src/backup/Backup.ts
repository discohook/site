import { FileLike } from "../message/FileLike"
import { Message } from "../message/Message"

export type Backup = {
  readonly message: Message
  readonly files: readonly FileLike[]
}
