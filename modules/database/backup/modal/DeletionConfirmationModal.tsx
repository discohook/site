import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../../../common/input/Button"
import { ModalContext } from "../../../../common/modal/ModalContext"
import { BaseModal } from "../../../../common/modal/styles/BaseModal"
import { BaseModalBody } from "../../../../common/modal/styles/BaseModalBody"
import { BaseModalFooter } from "../../../../common/modal/styles/BaseModalFooter"
import { BaseModalHeader } from "../../../../common/modal/styles/BaseModalHeader"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import type { BackupManager } from "../BackupManager"
import type { BackupData } from "../types/BackupData"

const Warning = styled.div`
  margin: 8px;
`

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
    <BaseModal>
      <BaseModalHeader>Delete backup</BaseModalHeader>
      <BaseModalBody>
        <Warning>
          Are you sure you want to delete &quot;{backup.name}&quot;? This action
          cannot be undone.
        </Warning>
      </BaseModalBody>
      <BaseModalFooter>
        <Button
          variant="borderless"
          size="medium"
          onClick={() => modal.dismiss()}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          onClick={async () => {
            await backupManager.deleteBackup(backup.name)
            modal.dismiss()
          }}
        >
          Delete
        </Button>
      </BaseModalFooter>
    </BaseModal>
  ))
}
