import { Draft, produce } from "immer"
import { Embed } from "../types/Embed"
import { Image } from "../types/Image"
import { id } from "./getUniqueId"

export type ImageWithId = Image & { [id]: number }
export type EmbedWithGallery = Embed & { readonly gallery?: ImageWithId[] }

export const getEmbedsWithGallery = (
  embeds: readonly Embed[],
): readonly EmbedWithGallery[] =>
  produce(embeds, (embeds: Draft<EmbedWithGallery[]>) => {
    let lastEmbed: Draft<EmbedWithGallery> | undefined
    const deletionQueue: number[] = []

    for (const [index, embed] of embeds.entries()) {
      if (lastEmbed?.url && lastEmbed.url === embed.url) {
        if (!lastEmbed.gallery && embed.image) {
          lastEmbed.gallery = []
          if (lastEmbed.image) {
            lastEmbed.gallery.push({
              ...lastEmbed.image,
              [id]: lastEmbed[id],
            })
          }
        }

        if (embed.image && (lastEmbed.gallery?.length ?? 0) < 4) {
          lastEmbed.gallery?.push({
            ...embed.image,
            [id]: embed[id],
          })
        }

        deletionQueue.unshift(index)
      } else {
        lastEmbed = embed
      }
    }

    for (const index of deletionQueue) {
      embeds.splice(index, 1)
    }

    return embeds
  })
