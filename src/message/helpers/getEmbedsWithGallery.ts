import { Draft, produce } from "immer"
import { ID } from "../constants/id"
import { Embed } from "../types/Embed"
import { Image } from "../types/Image"

export type ImageWithId = Image & { [ID]: number }
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
              [ID]: lastEmbed[ID],
            })
          }
        }

        if (embed.image && (lastEmbed.gallery?.length ?? 0) < 4) {
          lastEmbed.gallery?.push({
            ...embed.image,
            [ID]: embed[ID],
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
