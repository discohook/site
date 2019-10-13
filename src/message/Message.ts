import { id } from "./uid"

export type Message = {
  content?: string
  embeds?: Embed[]
  username?: string
  avatarUrl?: string
}

export type MessageWithoutIds = Omit<Message, "embeds"> & {
  embeds?: EmbedWithoutIds[]
}

export type Embed = {
  [id]: number
  title?: string
  description?: string
  url?: string
  timestamp?: string
  color?: number | null
  footer?: Footer
  image?: Image
  thumbnail?: Image
  author?: Author
  fields?: Field[]
}

export type EmbedWithoutIds = Omit<Embed, symbol | "fields"> & {
  fields?: FieldWithoutIds[]
}

export type Author = {
  name?: string
  url?: string
  iconUrl?: string
}

export type Footer = {
  text?: string
  iconUrl?: string
}

export type Field = {
  [id]: number
  name?: string
  value?: string
  inline?: boolean
}

export type FieldWithoutIds = Omit<Field, symbol>

export type Image = {
  url?: string
}
