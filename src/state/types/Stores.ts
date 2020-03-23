import type { AppearanceStore } from "../../appearance/stores/AppearanceStore"
import type { BackupStore } from "../../backup/stores/BackupStore"
import type { DatabaseStore } from "../../database/stores/DatabaseStore"
import type { MessageStore } from "../../message/stores/MessageStore"
import type { ModalStore } from "../../modal/stores/ModalStore"
import type { PopoverStore } from "../../popover/stores/PopoverStore"
import type { SsrStore } from "../../ssr/stores/SsrStore"
import type { WebhookStore } from "../../webhook/stores/WebhookStore"

export type Stores = {
  appearanceStore: AppearanceStore
  backupStore: BackupStore
  databaseStore: DatabaseStore
  messageStore: MessageStore
  modalStore: ModalStore
  popoverStore: PopoverStore
  ssrStore: SsrStore
  webhookStore: WebhookStore
}
