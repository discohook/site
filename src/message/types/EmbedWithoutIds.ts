import { Embed } from "./Embed"
import { FieldWithoutIds } from "./FieldWithoutIds"

export type EmbedWithoutIds = Omit<Embed, symbol | "fields"> & {
  readonly fields?: readonly FieldWithoutIds[]
}
