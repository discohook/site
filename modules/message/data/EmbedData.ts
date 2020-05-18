import type { AuthorData } from "./AuthorData"
import type { FieldData } from "./FieldData"
import type { FooterData } from "./FooterData"
import type { ImageData } from "./ImageData"

export type EmbedData = {
  readonly id?: number
  readonly title?: string
  readonly description?: string
  readonly url?: string
  readonly timestamp?: string
  readonly color?: number | null
  readonly footer?: FooterData
  readonly image?: ImageData
  readonly thumbnail?: ImageData
  readonly author?: AuthorData
  readonly fields?: readonly FieldData[]
}
