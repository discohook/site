import React from "react"
import type { Manager } from "../../state/types/Manager"
import { ClearAllConfirmationModal } from "../components/ClearAllConfirmationModal"

export const spawnClearAllConfirmationModal = (manager: Manager) => {
  manager.stores.modalStore.spawn({
    name: "clear-all-confirmation",
    render: () => <ClearAllConfirmationModal />,
  })
}
