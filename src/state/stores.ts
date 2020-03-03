import { AppearanceStore } from "../appearance/stores/AppearanceStore"
import { MessageStore } from "../message/stores/MessageStore"
import { ModalStore } from "../modal/stores/ModalStore"
import { PopoverStore } from "../popover/stores/PopoverStore"
import { SsrStore } from "../ssr/stores/SsrStore"
import { WebhookStore } from "../webhook/stores/WebhookStore"
import { createStoreFactory } from "./helpers/createStoreFactory"
import { Manager } from "./types/Manager"
import { Stores } from "./types/Stores"

export const stores: {
  [K in keyof Stores]: (manager: Manager) => Stores[K]
} = {
  appearanceStore: createStoreFactory(AppearanceStore),
  messageStore: createStoreFactory(MessageStore),
  modalStore: createStoreFactory(ModalStore),
  popoverStore: createStoreFactory(PopoverStore),
  ssrStore: createStoreFactory(SsrStore),
  webhookStore: createStoreFactory(WebhookStore),
}
