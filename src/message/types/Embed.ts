import { Color } from "../../color/types/Color"
import { ID } from "../constants/id"
import { Author } from "./Author"
import { Field } from "./Field"
import { Footer } from "./Footer"
import { Image } from "./Image"

export type Embed = {
  readonly [ID]: number
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
