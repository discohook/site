/* eslint-disable import/no-cycle */

import { flow, Instance, SnapshotOrInstance, types } from "mobx-state-tree"
import {
  BRANDED_DEFAULT_AVATAR_URL,
  DEFAULT_AVATAR_URL,
  DEFAULT_DISPLAY_NAME,
  DISCORD_API_BASE_URL,
  DISCORD_AVATARS_CDN_BASE_URL,
  MESSAGE_REF_RE,
} from "./constants"
import type { WebhookData } from "./WebhookData"

export const WebhookModel = types
  .model("WebhookModel", {
    url: "",
  })
  .volatile(() => ({
    exists: undefined as boolean | undefined,
    id: undefined as string | undefined,
    name: undefined as string | undefined,
    avatar: undefined as string | null | undefined,
    channelId: undefined as string | undefined,
    guildId: undefined as string | undefined,
    token: undefined as string | undefined,
  }))
  .views(self => ({
    get avatarUrl() {
      if (!self.avatar) return self.avatar
      return `${DISCORD_AVATARS_CDN_BASE_URL}/${self.id}/${self.avatar}.png`
    },

    get displayName() {
      return self.name ?? DEFAULT_DISPLAY_NAME
    },

    get displayAvatarUrl() {
      return (
        this.avatarUrl ??
        (self.avatar === null ? DEFAULT_AVATAR_URL : BRANDED_DEFAULT_AVATAR_URL)
      )
    },

    getRoute(reference?: string) {
      const match = reference && MESSAGE_REF_RE.exec(reference)
      if (match) {
        const [, messageId] = match

        return [
          "PATCH",
          `${DISCORD_API_BASE_URL}/webhooks/${self.id}/${self.token}/messages/${messageId}`,
        ]
      }

      return [
        "POST",
        `${DISCORD_API_BASE_URL}/webhooks/${self.id}/${self.token}?wait=true`,
      ]
    },
  }))
  .actions(self => ({
    set<K extends keyof typeof self>(
      key: K,
      value: SnapshotOrInstance<typeof self[K]>,
    ) {
      self[key] = value
    },

    fetch: flow(function* () {
      self.exists = undefined
      self.id = undefined
      self.name = undefined
      self.avatar = undefined
      self.channelId = undefined
      self.guildId = undefined
      self.token = undefined

      try {
        const response: Response = yield fetch(self.url)

        /* eslint-disable require-atomic-updates */

        if (!response.ok) {
          self.exists = false
          return
        }

        const webhook: WebhookData = yield response.json()

        self.exists = true
        self.id = webhook.id
        self.name = webhook.name
        self.avatar = webhook.avatar
        self.channelId = webhook.channel_id
        self.guildId = webhook.guild_id
        self.token = webhook.token

        /* eslint-enable require-atomic-updates */
      } catch {
        // do nothing
      }
    }),
  }))

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface WebhookLike extends Instance<typeof WebhookModel> {}
