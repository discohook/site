import { id } from "./uid"

export type Message = {
  content?: string
  embeds?: Embed[]
  username?: string
  avatarUrl?: string
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

export type Image = {
  url?: string
}

export type MessageWithoutIds = Omit<Message, "embeds"> & {
  embeds?: (Omit<Embed, symbol | "fields"> & {
    fields?: (Omit<Field, symbol>)[]
  })[]
}
