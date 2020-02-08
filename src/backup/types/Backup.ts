import { FileLike } from "../../message/types/FileLike"
import { Message } from "../../message/types/Message"

export type Backup = {
  readonly message: Message
  readonly files: readonly FileLike[]
}
