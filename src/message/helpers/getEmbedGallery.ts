import { Gallery } from "../types/Gallery"

type Embed = import("../classes/Embed").Embed

export const getEmbedGallery = (embed: Embed) => {
  if (!embed.url) return

  const embedIndex = embed.message.embeds.indexOf(embed)
  if (embedIndex === -1) return

  const gallery: Gallery = []

  for (const sibling of embed.message.embeds.slice(embedIndex)) {
    if (embed.url !== sibling.url) break

    if (sibling.image) {
      gallery.push({
        id: sibling.id,
        image: sibling.image,
      })
    }

    if (gallery.length >= 4) return gallery
  }

  if (gallery.length === 0) return
  if (gallery.length === 1 && gallery[0].image === embed.image) return

  return gallery
}
