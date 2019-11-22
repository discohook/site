import { Draft, produce } from "immer"
import { Embed, Image } from "../message/Message"
import { id } from "../message/uid"

export type ImageWithId = Image & { [id]: number }
export type EmbedWithGallery = Embed & { readonly gallery: ImageWithId[] }

export const getEmbedsWithGallery = (
  embeds: readonly Embed[],
): readonly EmbedWithGallery[] =>
  produce(embeds, (embeds: Draft<EmbedWithGallery[]>) => {
    let lastEmbed: EmbedWithGallery | undefined
    const deletionQueue: number[] = []

    for (const [index, embed] of embeds.entries()) {
      embed.gallery = []

      if (lastEmbed?.url && lastEmbed?.url === embed.url) {
        deletionQueue.unshift(index)
      } else {
        lastEmbed = embed
      }

      if (embed.image && lastEmbed.gallery.length < 4) {
        lastEmbed.gallery.push({
          ...embed.image,
          [id]: embed[id],
        })
      }
    }

    for (const index of deletionQueue) {
      embeds.splice(index, 1)
    }

    return embeds
  })
