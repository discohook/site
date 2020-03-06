import { AppearanceStore } from "../../appearance/stores/AppearanceStore"
import { BackupStore } from "../../backup/stores/BackupStore"
import { DatabaseStore } from "../../database/stores/DatabaseStore"
import { MessageStore } from "../../message/stores/MessageStore"
import { ModalStore } from "../../modal/stores/ModalStore"
import { PopoverStore } from "../../popover/stores/PopoverStore"
import { SsrStore } from "../../ssr/stores/SsrStore"
import { WebhookStore } from "../../webhook/stores/WebhookStore"

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
