import { useObserver } from "mobx-react-lite"
import React, { useState } from "react"
import { PrimaryButton } from "../../../../common/input/button/PrimaryButton"
import { InputField } from "../../../../common/input/text/InputField"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import { BackupManagerContext } from "../BackupManagerContext"

export function BackupCreationControls() {
  const backupManager = useRequiredContext(BackupManagerContext)

  const [backupName, setBackupName] = useState("")

  return useObserver(() => (
    <InputField
      id="backup-name"
      value={backupName}
      onChange={setBackupName}
      label="Backup name"
    >
      <PrimaryButton
        disabled={backupName.length === 0}
        onClick={async () => {
          await backupManager.saveBackup(backupName.trim())
          setBackupName("")
        }}
      >
        {backupManager.backups.some(backup => backup.name === backupName.trim())
          ? "Overwrite"
          : "Save"}
      </PrimaryButton>
    </InputField>
  ))
}
