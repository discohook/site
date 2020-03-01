import { AppearanceStore } from "../appearance/stores/AppearanceStore"
import { ModalStore } from "../modal/stores/ModalStore"
import { createStoreFactory } from "./helpers/createStoreFactory"
import { Manager } from "./types/Manager"
import { Stores } from "./types/Stores"

export const stores: {
  [K in keyof Stores]: (manager: Manager) => Stores[K]
} = {
  appearanceStore: createStoreFactory(AppearanceStore),
  modalStore: createStoreFactory(ModalStore),
}
