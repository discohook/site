import { useObserver } from "mobx-react-lite"
import React, { useState } from "react"
import styled from "styled-components"
import { FlexContainer } from "../../editor/components/Container"
import { Button } from "../../form/components/Button"
import { InputField } from "../../form/components/InputField"
import { useStores } from "../../state/hooks/useStores"

const CreateBackupButton = styled(Button)`
  width: 80px;
`

export function BackupCreationControls() {
  const { backupStore } = useStores()

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
          await backupStore.saveBackup(backupName.trim())
          setBackupName("")
        }}
      >
        {backupStore.backups.some(backup => backup.name === backupName.trim())
          ? "Update"
          : "Save"}
      </CreateBackupButton>
    </FlexContainer>
  ))
}
