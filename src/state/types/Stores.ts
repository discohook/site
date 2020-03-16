export type Stores = {
  appearanceStore: import("../../appearance/stores/AppearanceStore").AppearanceStore
  backupStore: import("../../backup/stores/BackupStore").BackupStore
  databaseStore: import("../../database/stores/DatabaseStore").DatabaseStore
  messageStore: import("../../message/stores/MessageStore").MessageStore
  modalStore: import("../../modal/stores/ModalStore").ModalStore
  popoverStore: import("../../popover/stores/PopoverStore").PopoverStore
  ssrStore: import("../../ssr/stores/SsrStore").SsrStore
  webhookStore: import("../../webhook/stores/WebhookStore").WebhookStore
}
