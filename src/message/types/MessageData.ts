import type { EmbedData } from "./EmbedData"

export type MessageData = {
  readonly content?: string
  readonly embeds?: readonly EmbedData[]
  readonly username?: string
  readonly avatar_url?: string
  readonly files?: readonly File[]
}
