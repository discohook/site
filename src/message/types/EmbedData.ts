import type { DiscordColor } from "../../color/types/DiscordColor"
import type { AuthorData } from "./AuthorData"
import type { FieldData } from "./FieldData"
import type { FooterData } from "./FooterData"
import type { Image } from "./Image"

export type EmbedData = {
  readonly title?: string
  readonly description?: string
  readonly url?: string
  readonly timestamp?: string
  readonly color?: DiscordColor
  readonly footer?: FooterData
  readonly image?: Image
  readonly thumbnail?: Image
  readonly author?: AuthorData
  readonly fields?: readonly FieldData[]
}
