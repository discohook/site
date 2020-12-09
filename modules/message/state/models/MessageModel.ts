/* eslint-disable import/no-cycle */

import { Instance, SnapshotOrInstance, types } from "mobx-state-tree"
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

      return {
        content: self.content || null,
        embeds: embeds.length > 0 ? embeds : null,
        username: self.username || undefined,
        avatar_url: self.avatar || undefined,
        files: self.files.length > 0 ? Array.from(self.files) : undefined,
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
