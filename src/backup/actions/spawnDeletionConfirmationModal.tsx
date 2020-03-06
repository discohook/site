import React from "react"
import { Manager } from "../../state/types/Manager"
import { DeletionConfirmationModal } from "../components/DeletionConfirmationModal"
import { BackupData } from "../types/BackupData"

export const spawnDeletionConfirmationModal = (
  manager: Manager,
  backup: BackupData,
) => {
  manager.stores.modalStore.spawn({
    name: "backup-deletion-confirmation",
    render: () => <DeletionConfirmationModal backup={backup} />,
  })
}
