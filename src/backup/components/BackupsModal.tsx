import { useObserver } from "mobx-react-lite"
import React from "react"
import { PersistentStorageWarning } from "../../database/components/PersistentStorageWarning"
import { Button } from "../../form/components/Button"
import { BaseModal } from "../../modal/components/BaseModal"
import { BaseModalBody } from "../../modal/components/BaseModalBody"
import { BaseModalFooter } from "../../modal/components/BaseModalFooter"
import { BaseModalHeader } from "../../modal/components/BaseModalHeader"
import { useStores } from "../../state/hooks/useStores"
import { BackupCreationControls } from "./BackupCreationControls"
import { BackupList } from "./BackupList"

export function BackupsModal() {
  const { databaseStore, modalStore } = useStores()

  return useObserver(() => (
    <BaseModal>
      <BaseModalHeader>Backups</BaseModalHeader>
      {!databaseStore.persisted && (
        <BaseModalBody>
          <PersistentStorageWarning />
        </BaseModalBody>
      )}
      <BaseModalBody>
        <BackupList />
      </BaseModalBody>
      <BaseModalBody>
        <BackupCreationControls />
      </BaseModalBody>
      <BaseModalFooter>
        <Button
          size="medium"
          onClick={() => {
            modalStore.dismiss("backups")
          }}
        >
          Close
        </Button>
      </BaseModalFooter>
    </BaseModal>
  ))
}
