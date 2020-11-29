import { useObserver } from "mobx-react-lite"
import React, { useRef } from "react"
import { PrimaryButton } from "../../../../common/input/button/PrimaryButton"
import { SecondaryButton } from "../../../../common/input/button/SecondaryButton"
import { ModalAction } from "../../../../common/modal/layout/ModalAction"
import { ModalBody } from "../../../../common/modal/layout/ModalBody"
import { ModalContainer } from "../../../../common/modal/layout/ModalContainer"
import { ModalFooter } from "../../../../common/modal/layout/ModalFooter"
import { ModalHeader } from "../../../../common/modal/layout/ModalHeader"
import { ModalTitle } from "../../../../common/modal/layout/ModalTitle"
import { ModalContext } from "../../../../common/modal/ModalContext"
import { useLazyValue } from "../../../../common/state/useLazyValue"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import { remove } from "../../../../icons/remove"
import type { EditorManagerLike } from "../../../editor/EditorManager"
import { DatabaseManager } from "../../DatabaseManager"
import { DatabaseManagerProvider } from "../../DatabaseManagerContext"
import { PersistentStorageWarning } from "../../persist/PersistentStorageWarning"
import { BackupManager } from "../BackupManager"
import { BackupManagerProvider } from "../BackupManagerContext"
import { BackupCreationControls } from "./BackupCreationControls"
import { BackupList } from "./BackupList"

export type BackupsModalProps = {
  editorManager: EditorManagerLike
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
        <ModalContainer>
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
          <ModalHeader>
            <ModalTitle>Backups</ModalTitle>
            <ModalAction
              icon={remove}
              label="Close"
              onClick={() => modal.dismiss()}
            />
          </ModalHeader>
          {databaseManager.shouldShowPersistenceWarning && (
            <ModalBody>
              <PersistentStorageWarning />
            </ModalBody>
          )}
          <ModalBody>
            <BackupList />
          </ModalBody>
          <ModalBody>
            <BackupCreationControls />
          </ModalBody>
          <ModalFooter>
            <SecondaryButton onClick={async () => backupManager.exportAll()}>
              Export All
            </SecondaryButton>
            <SecondaryButton onClick={() => fileInputRef.current?.click()}>
              Import
            </SecondaryButton>
            <PrimaryButton onClick={() => modal.dismiss()}>Close</PrimaryButton>
          </ModalFooter>
        </ModalContainer>
      </BackupManagerProvider>
    </DatabaseManagerProvider>
  ))
}
