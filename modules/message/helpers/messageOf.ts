import type { SnapshotIn } from "mobx-state-tree"
import { ColorModel } from "../../../common/input/color/ColorModel"
import type { MessageData } from "../state/data/MessageData"
import type { MessageModel } from "../state/models/MessageModel"

export const messageOf = (data: MessageData) => {
  const snapshot: Record<string, unknown> = {}

  snapshot.content = data.content ?? ""
  snapshot.username = data.username ?? ""
  snapshot.avatar = data.avatar_url ?? ""

  const embeds: Record<string, unknown>[] = []
  snapshot.embeds = embeds

  for (const embedData of data.embeds ?? []) {
    let embed = embeds.length > 0 ? embeds[embeds.length - 1] : undefined

    if (embed?.url && embed.url === embedData.url) {
      const gallery = embed.gallery as string[]
      if (embedData.image?.url && gallery.length < 4) {
        gallery.push(embedData.image.url)
      }

      continue
    }

    embed = {}
    embeds.push(embed)

    embed.title = embedData.title ?? ""
    embed.description = embedData.description ?? ""
    embed.url = embedData.url ?? ""
    embed.author = embedData.author?.name ?? ""
    embed.authorUrl = embedData.author?.url ?? ""
    embed.authorIcon = embedData.author?.icon_url ?? ""
    embed.footer = embedData.footer?.text ?? ""
    embed.footerIcon = embedData.footer?.icon_url ?? ""
    embed.timestamp = new Date(embedData.timestamp ?? Number.NaN)
    embed.gallery = [embedData.image?.url ?? ""].filter(Boolean)
    embed.thumbnail = embedData.thumbnail?.url ?? ""

    const color = ColorModel.create()
    color.setRaw(embedData.color ?? null)
    embed.color = color

    const fields: Record<string, unknown>[] = []
    embed.fields = fields

    for (const fieldData of embedData.fields ?? []) {
      const field: Record<string, unknown> = {}
      fields.push(field)

      field.name = fieldData.name ?? ""
      field.value = fieldData.value ?? ""
      field.inline = fieldData.inline ?? false
    }
  }

  return snapshot as SnapshotIn<typeof MessageModel>
}
