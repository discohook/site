import type { EmbedData } from "./EmbedData"
import type { Image } from "./Image"

export type GalleryEmbedData = Omit<EmbedData, "image"> & {
  readonly gallery?: readonly Image[]
}
