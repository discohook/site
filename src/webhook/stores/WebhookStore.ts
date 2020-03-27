import { action, computed, observable, reaction, runInAction } from "mobx"
import { toCamelCase } from "../../json/helpers/toCamelCase"
import { InitializableStore } from "../../state/classes/InitializableStore"
import type { Stores } from "../../state/types/Stores"
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_DISPLAY_NAME,
  DISCORD_AVATARS_CDN_BASE_URL,
  WEBHOOK_URL_RE,
} from "../constants"
import type { WebhookData } from "../types/WebhookData"

export class WebhookStore extends InitializableStore<Stores> {
  @observable url = ""

  @observable id?: string
  @observable name?: string
  @observable avatar?: string | null
  @observable channelId?: string
  @observable guildId?: string
  @observable token?: string

  initialize() {
    reaction(
      () => this.url,
      () => {
        this.fetchWebhookData().catch(() => {})
      },
    )
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

    if (!WEBHOOK_URL_RE.test(this.url)) return

    const response = await fetch(this.url)
    if (response.status !== 200) return

    const webhook = toCamelCase(await response.json()) as WebhookData

    runInAction(() => {
      this.id = webhook.id
      this.name = webhook.name
      this.avatar = webhook.avatar
      this.channelId = webhook.channelId
      this.guildId = webhook.guildId
      this.token = webhook.token
    })
  }

  @computed get displayName() {
    const { messageStore } = this.manager.stores

    return messageStore.message.username || (this.name ?? DEFAULT_DISPLAY_NAME)
  }

  @computed get avatarUrl() {
    if (!this.avatar) return
    return `${DISCORD_AVATARS_CDN_BASE_URL}/${this.id}/${this.avatar}.png`
  }

  @computed get displayAvatarUrl() {
    const { messageStore } = this.manager.stores

    return messageStore.message.avatar || (this.avatarUrl ?? DEFAULT_AVATAR_URL)
  }
}
