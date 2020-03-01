import { AppearanceStore } from "../../appearance/stores/AppearanceStore"
import { ModalStore } from "../../modal/stores/ModalStore"
import { PopoverStore } from "../../popover/stores/PopoverStore"

export type Stores = {
  appearanceStore: AppearanceStore
  modalStore: ModalStore
  popoverStore: PopoverStore
}
