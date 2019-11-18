import { id } from "./uid"

export type Message = {
  readonly content?: string
  readonly embeds?: readonly Embed[]
  readonly username?: string
  readonly avatarUrl?: string
}

export type MessageWithoutIds = Omit<Message, "embeds"> & {
  readonly embeds?: readonly EmbedWithoutIds[]
}

export type Embed = {
  readonly [id]: number
  readonly title?: string
  readonly description?: string
  readonly url?: string
  readonly timestamp?: string
  readonly color?: number | null
  readonly footer?: Footer
  readonly image?: Image
  readonly thumbnail?: Image
  readonly author?: Author
  readonly fields?: readonly Field[]
}

export type EmbedWithoutIds = Omit<Embed, symbol | "fields"> & {
  readonly fields?: readonly FieldWithoutIds[]
}

export type Author = {
  readonly name?: string
  readonly url?: string
  readonly iconUrl?: string
}

export type Footer = {
  readonly text?: string
  readonly iconUrl?: string
}

export type Field = {
  readonly [id]: number
  readonly name?: string
  readonly value?: string
  readonly inline?: boolean
}

export type FieldWithoutIds = Omit<Field, symbol>

export type Image = {
  readonly url?: string
}
