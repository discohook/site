import { useObserver } from "mobx-react-lite"
import React, { useRef } from "react"
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
  const { backupStore, databaseStore, modalStore } = useStores()

  const fileInputRef = useRef<HTMLInputElement>(null)

  return useObserver(() => (
    <BaseModal>
      <BaseModalHeader>Backups</BaseModalHeader>
      {databaseStore.shouldShowPersistenceWarning && (
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
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={async event => {
            const file = event.target.files?.item(0)?.slice()
            event.target.files = null
            if (file) {
              await backupStore.importBackups(file)
            }
          }}
        />
        <Button
          variant="borderless"
          size="medium"
          onClick={() => {
            fileInputRef.current?.click()
          }}
        >
          Import
        </Button>
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
