/* eslint-disable import/no-cycle */

import { Instance, SnapshotOrInstance, types } from "mobx-state-tree"
import { nullableDate } from "../../../../common/state/nullableDate"
import { getUniqueId } from "../../../../common/state/uid"
import { stringifyMessage } from "../../helpers/stringifyMessage"
import type { MessageData } from "../data/MessageData"
import { EmbedModel } from "./EmbedModel"

export const MessageModel = types
  .model("MessageModel", {
    id: types.optional(types.identifierNumber, getUniqueId),
    content: "",
    username: "",
    avatar: "",
    embeds: types.array(types.late(() => EmbedModel)),
    thread_name: types.optional(types.string, ""),
    reference: "",
    timestamp: types.optional(nullableDate, null),
    badge: types.optional(types.maybeNull(types.string), "Bot"),
    flags_suppress_embeds: types.optional(types.boolean, false),
    flags_suppress_notifications: types.optional(types.boolean, false), // silent
  })
  .volatile(() => ({
    files: [] as readonly File[],
  }))
  .views(self => ({
    get hasContent() {
      return self.content.trim().length > 0
    },
    get hasExtras() {
      return self.embeds.length > 0 || self.files.length > 0
    },

    get embedLength() {
      return self.embeds.reduce((size, embed) => size + embed.length, 0)
    },

    get size() {
      return self.embeds.reduce((size, embed) => size + embed.size, 0)
    },

    get data(): MessageData {
      const embeds = self.embeds.flatMap(embed => embed.data)

      let flags = 0
      if (self.flags_suppress_embeds) {
        flags |= 1 << 2
      }
      if (self.flags_suppress_notifications) {
        flags |= 1 << 12
      }

      return {
        content: self.content || null,
        embeds: embeds.length > 0 ? embeds : null,
        username: self.username || undefined,
        avatar_url: self.avatar || undefined,
        files: self.files.length > 0 ? Array.from(self.files) : undefined,
        attachments: self.files.length === 0 ? [] : undefined,
        thread_name: self.thread_name || undefined,
        flags: flags === 0 ? undefined : flags,
      }
    },

    get body() {
      const json = stringifyMessage(this.data, false)

      if (self.files.length > 0) {
        const formData = new FormData()

        if (json !== "{}") formData.append("payload_json", json)

        for (const [index, file] of self.files.entries()) {
          formData.append(`file[${index}]`, file, file.name)
        }

        return formData
      }

      return json
    },
  }))
  .actions(self => ({
    set<K extends keyof typeof self>(
      key: K,
      value: SnapshotOrInstance<typeof self[K]>,
    ): void {
      self[key] = value
    },
  }))

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface MessageLike extends Instance<typeof MessageModel> {}
