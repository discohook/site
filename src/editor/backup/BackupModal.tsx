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
import { Backup, FakeFile } from "./Backup"
import { deleteBackup, getBackup, getBackups, setBackup } from "./backupStorage"
import { shareBackup } from "./sharing"

interface Props {
  message: Message
  files: FileList | FakeFile[]
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

const List = styled.ul`
  margin: 0 0 8px;
  padding: 0;
`

const Item = styled.li`
  display: flex;
  align-items: center;

  margin: 0 8px;
  padding: 6px 0;

  border: solid ${({ theme }) => theme.editor.border};
  border-width: 1px 0 1px;

  & + & {
    border-width: 0 0 1px;
  }
`

const BackupName = styled.a`
  margin: 0 auto 0 0;

  color: ${({ theme }) => theme.important};
  font-size: 15px;
  font-weight: 500;

  cursor: pointer;
`

const BackupAction = styled.a<{ dangerous?: boolean }>`
  margin: 0 0 0 8px;
  color: ${({ theme, dangerous }) => (dangerous ? theme.red : theme.important)};
  cursor: pointer;
`

export default function BackupModal(props: Props) {
  const { message, files, onLoad, onClose: handleClose } = props

  const [backups, setBackups] = useState<string[]>([])
  const getAllBackups = async () => setBackups(await getBackups())
  useEffect(() => {
    getAllBackups()
  }, [])

  const handleLoad = async (name: string) => {
    const backup = await getBackup(name)
    if (backup) onLoad(backup)
  }

  const handleShare = (name: string) => shareBackup(name)

  const handleDelete = (backup: string) => {
    deleteBackup(backup)
    getAllBackups()
  }

  const [newBackupName, setNewBackupName] = useState("")

  const handleCreate = () => {
    setBackup(newBackupName.trim().replace(/\s+/, " "), {
      message,
      files: Array.from(files || []).map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),
    }).then(getAllBackups)
  }

  return (
    <ModalContainer onClick={e => e.stopPropagation()}>
      <ModalActionsContainer>
        <ActionsHeader>Backups</ActionsHeader>
        <Action onClick={handleClose}>Close</Action>
      </ModalActionsContainer>
      <List>
        {backups.map(backup => (
          <Item key={backup}>
            <BackupName onClick={() => handleLoad(backup)}>{backup}</BackupName>
            <BackupAction onClick={() => handleShare(backup)}>
              Share
            </BackupAction>
            <BackupAction onClick={() => handleDelete(backup)} dangerous>
              Delete
            </BackupAction>
          </Item>
        ))}
      </List>
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
