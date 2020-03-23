import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { BaseModal } from "../../modal/components/BaseModal"
import { BaseModalBody } from "../../modal/components/BaseModalBody"
import { BaseModalFooter } from "../../modal/components/BaseModalFooter"
import { BaseModalHeader } from "../../modal/components/BaseModalHeader"
import { useStores } from "../../state/hooks/useStores"
import type { BackupData } from "../types/BackupData"

const Warning = styled.div`
  margin: 8px;
`

export type DeletionConfirmationModalProps = {
  backup: BackupData
}

export function DeletionConfirmationModal(
  props: DeletionConfirmationModalProps,
) {
  const { backup } = props

  const { backupStore, modalStore } = useStores()

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
          onClick={() => {
            modalStore.dismiss("backup-deletion-confirmation")
          }}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          onClick={async () => {
            await backupStore.deleteBackup(backup.name)
            modalStore.dismiss("backup-deletion-confirmation")
          }}
        >
          Delete
        </Button>
      </BaseModalFooter>
    </BaseModal>
  ))
}
