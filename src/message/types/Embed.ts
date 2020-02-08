import { Color } from "../../color/types/Color"
import { id } from "../helpers/getUniqueId"
import { Author } from "./Author"
import { Field } from "./Field"
import { Footer } from "./Footer"
import { Image } from "./Image"

export type Embed = {
  readonly [id]: number
  readonly title?: string
  readonly description?: string
  readonly url?: string
  readonly timestamp?: string
  readonly color?: Color
  readonly footer?: Footer
  readonly image?: Image
  readonly thumbnail?: Image
  readonly author?: Author
  readonly fields?: readonly Field[]
}
