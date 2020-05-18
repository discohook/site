import { useObserver } from "mobx-react-lite"
import React, { useRef } from "react"
import { Button } from "../../../../common/input/Button"
import { ModalContext } from "../../../../common/modal/ModalContext"
import { BaseModal } from "../../../../common/modal/styles/BaseModal"
import { BaseModalBody } from "../../../../common/modal/styles/BaseModalBody"
import { BaseModalFooter } from "../../../../common/modal/styles/BaseModalFooter"
import { BaseModalHeader } from "../../../../common/modal/styles/BaseModalHeader"
import { useLazyValue } from "../../../../common/state/useLazyValue"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import type { EditorManager } from "../../../editor/EditorManager"
import { DatabaseManager } from "../../DatabaseManager"
import { DatabaseManagerProvider } from "../../DatabaseManagerContext"
import { PersistentStorageWarning } from "../../persist/PersistentStorageWarning"
import { BackupManager } from "../BackupManager"
import { BackupManagerProvider } from "../BackupManagerContext"
import { BackupCreationControls } from "./BackupCreationControls"
import { BackupList } from "./BackupList"

export type BackupsModalProps = {
  editorManager: EditorManager
}

export function BackupsModal(props: BackupsModalProps) {
  const { editorManager } = props

  const databaseManager = useLazyValue(() => new DatabaseManager())
  const backupManager = useLazyValue(
    () => new BackupManager(databaseManager, editorManager),
  )

  const modal = useRequiredContext(ModalContext)

  const fileInputRef = useRef<HTMLInputElement>(null)

  return useObserver(() => (
    <DatabaseManagerProvider value={databaseManager}>
      <BackupManagerProvider value={backupManager}>
        <BaseModal>
          <BaseModalHeader>Backups</BaseModalHeader>
          {databaseManager.shouldShowPersistenceWarning && (
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
              variant="borderless"
              size="medium"
              onClick={async () => {
                await backupManager.exportAll()
              }}
            >
              Export all
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={async event => {
                const file = event.target.files?.item(0)?.slice()
                event.target.files = null
                if (file) {
                  await backupManager.importBackups(file)
                }
              }}
            />
            <Button
              variant="borderless"
              size="medium"
              onClick={() => fileInputRef.current?.click()}
            >
              Import
            </Button>
            <Button size="medium" onClick={() => modal.dismiss()}>
              Close
            </Button>
          </BaseModalFooter>
        </BaseModal>
      </BackupManagerProvider>
    </DatabaseManagerProvider>
  ))
}
