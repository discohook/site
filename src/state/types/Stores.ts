import { AppearanceStore } from "../../appearance/stores/AppearanceStore"
import { MessageStore } from "../../message/stores/MessageStore"
import { ModalStore } from "../../modal/stores/ModalStore"
import { PopoverStore } from "../../popover/stores/PopoverStore"
import { SsrStore } from "../../ssr/stores/SsrStore"
import { WebhookStore } from "../../webhook/stores/WebhookStore"

export type Stores = {
  appearanceStore: AppearanceStore
  messageStore: MessageStore
  modalStore: ModalStore
  popoverStore: PopoverStore
  ssrStore: SsrStore
  webhookStore: WebhookStore
}
