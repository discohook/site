import { EmbedWithoutIds } from "./EmbedWithoutIds"
import { Message } from "./Message"

export type MessageWithoutIds = Omit<Message, "embeds"> & {
  readonly embeds?: readonly EmbedWithoutIds[]
}
