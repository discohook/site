import { Author } from "./Author"
import { Field } from "./Field"
import { Footer } from "./Footer"
import { Image } from "./Image"
import { Thumbnail } from "./Thumbnail"

export interface Embed {
  title?: string
  type?: string
  description?: string
  url?: string
  timestamp?: string
  color?: number
  footer?: Footer
  image?: Image
  thumbnail?: Thumbnail
  author?: Author
  fields?: Field[]
}
