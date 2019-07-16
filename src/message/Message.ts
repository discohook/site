import { id } from "../uid"

export interface Message {
  content?: string
  embeds?: Embed[]
  username?: string
  avatarUrl?: string
}

export interface Embed {
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

export interface Author {
  name?: string
  url?: string
  iconUrl?: string
}

export interface Footer {
  text?: string
  iconUrl?: string
}

export interface Field {
  [id]: number
  name?: string
  value?: string
  inline?: boolean
}

export interface Image {
  url?: string
}
