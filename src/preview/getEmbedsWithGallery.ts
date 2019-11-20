import { Draft, produce } from "immer"
import { Embed, Image } from "../message/Message"
import { id } from "../message/uid"

export type ImageWithId = Image & { [id]: number }
export type EmbedWithGallery = Embed & { readonly gallery: ImageWithId[] }

export const getEmbedsWithGallery = produce((embeds: Draft<Embed[]>) => {
  const embedsWithGallery: EmbedWithGallery[] = []

  for (const embed of embeds) {
    const lastEmbed = embedsWithGallery.pop()
    if (lastEmbed) embedsWithGallery.push(lastEmbed)

    if (lastEmbed?.url && lastEmbed.url === embed.url) {
      if (embed.image && lastEmbed.gallery.length < 4) {
        lastEmbed.gallery.push({ ...embed.image, [id]: embed[id] })
      }

      continue
    }

    const withGallery: EmbedWithGallery = { ...embed, gallery: [] }
    if (withGallery.image) {
      withGallery.gallery.push({
        ...withGallery.image,
        [id]: withGallery[id],
      })
    }
    embedsWithGallery.push(withGallery)
  }

  return embedsWithGallery
})
