import { DiscordColor } from "../../color/types/DiscordColor"
import { Author } from "./Author"
import { FieldData } from "./FieldData"
import { FooterData } from "./FooterData"
import { Image } from "./Image"

export type EmbedData = {
  readonly title?: string
  readonly description?: string
  readonly url?: string
  readonly timestamp?: string
  readonly color?: DiscordColor
  readonly footer?: FooterData
  readonly image?: Image
  readonly thumbnail?: Image
  readonly author?: Author
  readonly fields?: readonly FieldData[]
}
