import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { Message } from "../../message/Message"
import InputField from "../InputField"
import {
  Action,
  ActionsContainer,
  ActionsHeader,
  Button,
  Container,
} from "../styles"
import BackupList from "./BackupList"
import {
  Backup,
  deleteBackup,
  getBackup,
  getBackups,
  setBackup,
} from "./backupStorage"

interface Props {
  message: Message
  files: FileList | undefined
  onLoad: (backup: Backup) => void
  onClose: () => void
}

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.background};
  border-radius: 3px;
  padding: 8px;
  box-sizing: border-box;
  overflow-y: scroll;
`

const ModalActionsContainer = styled(ActionsContainer)`
  margin: 8px;
`

export default function BackupModal(props: Props) {
  const { message, files, onLoad: handleLoad, onClose: handleClose } = props

  const [backups, setBackups] = useState<string[]>([])
  const getAllBackups = async () => setBackups(await getBackups())
  useEffect(() => {
    getAllBackups()
  }, [])

  const loadBackup = async (name: string) => {
    const backup = await getBackup(name)
    if (backup) handleLoad(backup)
  }

  const handleDelete = (backup: string) => {
    deleteBackup(backup)
    getAllBackups()
  }

  const [newBackupName, setNewBackupName] = useState("")

  const handleCreate = () => {
    setBackup(newBackupName.trim().replace(/\s+/, " "), {
      message,
      files: Array.from(files || []).map((file) => file.name),
    }).then(getAllBackups)
  }

  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalActionsContainer>
        <ActionsHeader>Backups</ActionsHeader>
        <Action onClick={handleClose}>Close</Action>
      </ModalActionsContainer>
      <BackupList
        backups={backups}
        onLoad={loadBackup}
        onDelete={handleDelete}
      />
      <Container direction="row">
        <InputField
          value={newBackupName}
          onChange={setNewBackupName}
          label="Backup name"
        />
        <Button onClick={handleCreate}>Create</Button>
      </Container>
    </ModalContainer>
  )
}
