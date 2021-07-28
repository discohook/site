/* eslint-disable import/no-cycle */

import { Instance, SnapshotOrInstance, types } from "mobx-state-tree"
import { nullableDate } from "../../../../common/state/nullableDate"
import { getUniqueId } from "../../../../common/state/uid"
import { stringifyMessage } from "../../helpers/stringifyMessage"
import type { MessageData } from "../data/MessageData"
import { AttachmentModel, isLocal, isNotLocal } from "./AttachmentModel"
import { EmbedModel } from "./EmbedModel"

export const MessageModel = types
  .model("MessageModel", {
    id: types.optional(types.identifierNumber, getUniqueId),
    content: "",
    username: "",
    avatar: "",
    embeds: types.array(types.late(() => EmbedModel)),
    reference: "",
    timestamp: types.optional(nullableDate, null),
    badge: types.optional(types.maybeNull(types.string), "Bot"),
    attachments: types.array(types.late(() => AttachmentModel)),
  })
  .volatile(() => ({
  }))
  .views(self => ({
    get filesSize() {
      return self.attachments.filter(isLocal).reduce((acc, attachment) => acc + attachment.size, 0)
    },

    get hasContent() {
      return self.content.trim().length > 0
    },
    get hasExtras() {
      return self.embeds.length > 0 || self.attachments.length > 0
    },

    get embedLength() {
      return self.embeds.reduce((size, embed) => size + embed.length, 0)
    },

    get size() {
      return self.embeds.reduce((size, embed) => size + embed.size, 0)
    },

    get data(): MessageData {
      const embeds = self.embeds.flatMap(embed => embed.data)
      const attachments = self.attachments.filter(isNotLocal)

      return {
        content: self.content || null,
        embeds: embeds.length > 0 ? embeds : null,
        username: self.username || undefined,
        avatar_url: self.avatar || undefined,
        attachments: attachments.length > 0 ? attachments : [],
      }
    },

    get body() {
      const json = stringifyMessage(this.data, false)
      const localFiles = self.attachments.filter(isLocal)

      if (localFiles.length > 0) {
        const formData = new FormData()

        if (json !== "{}") formData.append("payload_json", json)

        for (const [index, attachment] of localFiles.entries()) {
          formData.append(`file[${index}]`, attachment.file, attachment.filename)
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
    setFiles(files: readonly File[]) {
      const attachments = self.attachments.filter(isNotLocal)
      const localFiles = files.map(file => {
        const attachment = AttachmentModel.create({
          contentType: file.type,
          filename: file.name,
          local: true,
          size: file.size,
          url: URL.createObjectURL(file)
        })
        attachment.set("file", file)

        return attachment
      })
      self.attachments.replace([...attachments, ...localFiles])
    }
  }))

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface MessageLike extends Instance<typeof MessageModel> { }
