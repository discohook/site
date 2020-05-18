import { useObserver } from "mobx-react-lite"
import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../../../../common/input/Button"
import { InputField } from "../../../../common/input/InputField"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import { FlexContainer } from "../../../editor/styles/FlexContainer"
import { BackupManagerContext } from "../BackupManagerContext"

const CreateBackupButton = styled(Button)`
  width: 80px;
`

export function BackupCreationControls() {
  const backupManager = useRequiredContext(BackupManagerContext)

  const [backupName, setBackupName] = useState("")

  return useObserver(() => (
    <FlexContainer flow="row">
      <InputField
        id="backup-name"
        value={backupName}
        onChange={setBackupName}
        label="Backup name"
      />
      <CreateBackupButton
        disabled={backupName.length === 0}
        onClick={async () => {
          await backupManager.saveBackup(backupName.trim())
          setBackupName("")
        }}
      >
        {backupManager.backups.some(backup => backup.name === backupName.trim())
          ? "Update"
          : "Save"}
      </CreateBackupButton>
    </FlexContainer>
  ))
}
