import type { EmbedData } from "./EmbedData"

export type MessageData = {
  readonly content?: string | null
  readonly embeds?: readonly EmbedData[] | null
  readonly username?: string
  readonly avatar_url?: string
  readonly files?: readonly File[]
}
