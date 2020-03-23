import React from "react"
import type { Manager } from "../../state/types/Manager"
import { DeletionConfirmationModal } from "../components/DeletionConfirmationModal"
import type { BackupData } from "../types/BackupData"

export const spawnDeletionConfirmationModal = (
  manager: Manager,
  backup: BackupData,
) => {
  manager.stores.modalStore.spawn({
    name: "backup-deletion-confirmation",
    render: () => <DeletionConfirmationModal backup={backup} />,
  })
}
