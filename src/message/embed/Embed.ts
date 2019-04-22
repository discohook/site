import { Author } from "./author/Author"
import { Field } from "./field/Field"
import { Footer } from "./footer/Footer"
import { Image } from "./image/Image"
import { Thumbnail } from "./thumbnail/Thumbnail"

export interface Embed {
  title?: string
  type?: string
  description?: string
  url?: string
  timestamp?: Date
  color?: number
  footer?: Footer
  image?: Image
  thumbnail?: Thumbnail
  author?: Author
  fields?: Field[]
}
