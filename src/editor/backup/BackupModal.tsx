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

const ModalBackground = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.85);

  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContainer = styled(Container)`
  width: 400px;
  max-width: calc(100% - 32px);

  background: ${({ theme }) => theme.background};
  border-radius: 3px;

  padding: 8px;
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
    <ModalBackground onClick={handleClose}>
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
            onChange={(name) => setNewBackupName(name || "")}
            label="Backup name"
          />
          <Button onClick={handleCreate}>Create</Button>
        </Container>
      </ModalContainer>
    </ModalBackground>
  )
}
