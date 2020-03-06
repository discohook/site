import React from "react"
import { Manager } from "../../state/types/Manager"
import { BackupsModal } from "../components/BackupsModal"

export const spawnBackupsModal = (manager: Manager) => {
  manager.stores.modalStore.spawn({
    name: "backups",
    render: () => <BackupsModal />,
  })
}
