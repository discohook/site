import { action, computed, observable, runInAction } from "mobx"
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_DISPLAY_NAME,
  DISCORD_AVATARS_CDN_BASE_URL,
  WEBHOOK_URL_RE,
} from "./constants"
import type { WebhookData } from "./WebhookData"

export class Webhook {
  @observable private fetchUrl = ""

  @observable id?: string
  @observable name?: string
  @observable avatar?: string | null
  @observable channelId?: string
  @observable guildId?: string
  @observable token?: string

  @computed get url() {
    return this.fetchUrl
  }
  set url(url) {
    this.fetchUrl = url
    this.fetchWebhookData().catch(() => {})
  }

  @computed get avatarUrl() {
    if (!this.avatar) return
    return `${DISCORD_AVATARS_CDN_BASE_URL}/${this.id}/${this.avatar}.png`
  }

  @computed get displayName() {
    return this.name ?? DEFAULT_DISPLAY_NAME
  }

  @computed get displayAvatarUrl() {
    return this.avatarUrl ?? DEFAULT_AVATAR_URL
  }

  @action async fetchWebhookData() {
    runInAction(() => {
      this.id = undefined
      this.name = undefined
      this.avatar = undefined
      this.channelId = undefined
      this.guildId = undefined
      this.token = undefined
    })

    if (!WEBHOOK_URL_RE.test(this.fetchUrl)) return

    const response = await fetch(this.fetchUrl)
    if (response.status !== 200) return

    const webhook = (await response.json()) as WebhookData

    runInAction(() => {
      this.id = webhook.id
      this.name = webhook.name
      this.avatar = webhook.avatar
      this.channelId = webhook.channel_id
      this.guildId = webhook.guild_id
      this.token = webhook.token
    })
  }
}
