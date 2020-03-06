import { useObserver } from "mobx-react-lite"
import React, { useState } from "react"
import { FlexContainer } from "../../editor/components/Container"
import { Button } from "../../form/components/Button"
import { InputField } from "../../form/components/InputField"
import { useStores } from "../../state/hooks/useStores"

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
      <Button
        style={{ width: "80px" }}
        onClick={() => {
          backupStore.saveBackup(backupName).catch(error => {
            console.error("Failed saving backup:", error)
          })
        }}
      >
        {backupStore.backupList.some(backup => backup.name === backupName)
          ? "Update"
          : "Save"}
      </Button>
    </FlexContainer>
  ))
}
