import { useObserver } from "mobx-react-lite"
import React from "react"
import { PrimaryButton } from "../../../../common/input/button/PrimaryButton"
import { SecondaryButton } from "../../../../common/input/button/SecondaryButton"
import { ModalAction } from "../../../../common/modal/layout/ModalAction"
import { ModalBody } from "../../../../common/modal/layout/ModalBody"
import { ModalContainer } from "../../../../common/modal/layout/ModalContainer"
import { ModalFooter } from "../../../../common/modal/layout/ModalFooter"
import { ModalHeader } from "../../../../common/modal/layout/ModalHeader"
import { ModalTitle } from "../../../../common/modal/layout/ModalTitle"
import { ModalContext } from "../../../../common/modal/ModalContext"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import { remove } from "../../../../icons/remove"
import { Markdown } from "../../../markdown/Markdown"
import type { BackupManager } from "../BackupManager"
import type { BackupData } from "../types/BackupData"

export type DeletionConfirmationModalProps = {
  backupManager: BackupManager
  backup: BackupData
}

export function DeletionConfirmationModal(
  props: DeletionConfirmationModalProps,
) {
  const { backupManager, backup } = props

  const modal = useRequiredContext(ModalContext)

  return useObserver(() => (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Delete Backup</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <ModalBody>
        <Markdown
          content={
            `Are you sure you want to delete "${backup.name}"? This action` +
            " cannot be undone."
          }
        />
      </ModalBody>
      <ModalFooter>
        <SecondaryButton onClick={() => modal.dismiss()}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={async () => {
            await backupManager.deleteBackup(backup.name)
            modal.dismiss()
          }}
        >
          Delete
        </PrimaryButton>
      </ModalFooter>
    </ModalContainer>
  ))
}
