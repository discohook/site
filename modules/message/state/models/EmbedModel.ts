/* eslint-disable import/no-cycle */

import { isValid } from "date-fns"
import {
  getParentOfType,
  Instance,
  SnapshotOrInstance,
  types,
} from "mobx-state-tree"
import { ColorModel } from "../../../../common/input/color/ColorModel"
import { getUniqueId } from "../../../../common/state/uid"
import type { AuthorData } from "../data/AuthorData"
import type { EmbedData } from "../data/EmbedData"
import type { FieldData } from "../data/FieldData"
import type { FooterData } from "../data/FooterData"
import { FieldModel } from "./FieldModel"
import { MessageLike, MessageModel } from "./MessageModel"

const nullableDate = types.custom<Date | number | null, Date>({
  name: "NullableDate",
  fromSnapshot(value) {
    return new Date(value ?? Number.NaN)
  },
  toSnapshot(value) {
    const time = value.getTime()
    return Number.isNaN(time) ? null : time
  },
  isTargetType(value) {
    return value instanceof Date
  },
  getValidationMessage(value: unknown) {
    if (value instanceof Date) return ""
    if (typeof value === "number") return ""
    if (value === null) return ""

    return "Value is not a Date, a unix milliseconds timestamp, or null"
  },
})

export const EmbedModel = types
  .model("EmbedModel", {
    id: types.optional(types.identifierNumber, getUniqueId),
    title: "",
    description: "",
    url: "",
    color: types.optional(ColorModel, {}),
    fields: types.array(types.late(() => FieldModel)),
    author: "",
    authorUrl: "",
    authorIcon: "",
    footer: "",
    footerIcon: "",
    timestamp: types.optional(nullableDate, null),
    gallery: types.array(types.string),
    thumbnail: "",
  })
  .views(self => ({
    get message(): MessageLike {
      return getParentOfType(self, MessageModel)
    },

    get length() {
      return (
        self.title.length +
        self.description.length +
        self.fields.reduce(
          (length, field) => length + field.name.length + field.value.length,
          0,
        ) +
        self.author.length +
        self.footer.length
      )
    },

    get size() {
      return self.gallery.length || 1
    },

    get hasTitle() {
      return self.title.trim().length > 0
    },
    get hasDescription() {
      return self.description.trim().length > 0
    },
    get hasAuthor() {
      return self.author.trim().length > 0
    },
    get hasFooter() {
      return self.footer.trim().length > 0 || isValid(self.timestamp)
    },

    get data(): readonly EmbedData[] {
      const fields: FieldData[] | undefined =
        self.fields.length > 0
          ? self.fields.map(field => ({
              name: field.name || undefined,
              value: field.value || undefined,
              inline: field.inline || undefined,
            }))
          : undefined

      const author: AuthorData | undefined = this.hasAuthor
        ? {
            name: self.author,
            url: self.authorUrl || undefined,
            icon_url: self.authorIcon || undefined,
          }
        : undefined

      const footer: FooterData | undefined =
        self.footer.trim().length > 0 ||
        (isValid(self.timestamp) && self.footerIcon)
          ? {
              text: self.footer || undefined,
              icon_url: self.footerIcon || undefined,
            }
          : undefined

      const embeds: EmbedData[] = [
        {
          title: self.title || undefined,
          description: self.description || undefined,
          url: self.url || undefined,
          color: self.color.raw,
          fields,
          author,
          footer,
          timestamp: isValid(self.timestamp)
            ? self.timestamp.toJSON()
            : undefined,
          image: self.gallery.length > 0 ? { url: self.gallery[0] } : undefined,
          thumbnail: self.thumbnail ? { url: self.thumbnail } : undefined,
        },
      ]

      for (const image of self.gallery.slice(1)) {
        embeds.push({
          url: self.url,
          image: { url: image },
        })
      }

      return embeds
    },

    get displayName() {
      /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
      return (
        self.author
          .split("\n")
          .map(line => line.trim())
          .find(Boolean) ||
        self.title
          .split("\n")
          .map(line => line.trim())
          .find(Boolean) ||
        self.description
          .split("\n")
          .map(line => line.trim())
          .find(Boolean) ||
        self.fields.map(field => field.displayName).find(Boolean) ||
        self.footer
          .split("\n")
          .map(line => line.trim())
          .find(Boolean) ||
        undefined
      )
      /* eslint-enable @typescript-eslint/prefer-nullish-coalescing */
    },
  }))
  .actions(self => ({
    set<K extends keyof typeof self>(
      key: K,
      value: SnapshotOrInstance<typeof self[K]>,
    ) {
      self[key] = value
    },
  }))

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface EmbedLike extends Instance<typeof EmbedModel> {}
