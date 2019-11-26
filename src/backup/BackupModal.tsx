import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { Theme } from "../core/themes"
import {
  Action,
  ActionsContainer,
  ActionsHeader,
  Container,
} from "../editor/styles"
import InputField from "../form/InputField"
import { Button } from "../form/styles"
import { FileLike } from "../message/FileLike"
import { Message } from "../message/Message"
import { Backup } from "./Backup"
import { deleteBackup, getBackup, getBackups, setBackup } from "./backupStorage"

const ModalContainer = styled.div<{}, Theme>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.background.primary};
  border-radius: 3px;
  padding: 8px;
  overflow-y: scroll;
`

const ModalActionsContainer = styled(ActionsContainer)`
  margin: 8px;
`

const ShareTip = styled.div<{}, Theme>`
  margin: 8px;
  padding: 12px;

  border: 1px solid ${({ theme }) => theme.accents.primary};
  border-radius: 3px;
`

const ShareTipParagraph = styled.p<{}, Theme>`
  color: ${({ theme }) => theme.header.primary};

  margin: 0;

  & + & {
    margin: 8px 0 0;
  }
`

const List = styled.ul`
  margin: 0 0 8px;
  padding: 0;
`

const Item = styled.li<{}, Theme>`
  display: flex;
  align-items: center;

  margin: 0 8px;
  padding: 6px 0;

  border: solid ${({ theme }) => theme.backgroundModifier.accent};
  border-width: 1px 0 1px;

  & + & {
    border-width: 0 0 1px;
  }
`

const BackupName = styled.a<{}, Theme>`
  margin: 0 auto 0 0;

  color: ${({ theme }) => theme.header.primary};
  font-size: 15px;
  font-weight: 500;

  cursor: pointer;
`

const DeleteAction = styled.a<{}, Theme>`
  margin: 0 0 0 8px;
  color: ${({ theme }) => theme.accents.danger};
  cursor: pointer;
`

type Props = {
  message: Message
  files: readonly FileLike[]
  onLoad: (backup: Backup) => void
  onClose: () => void
}

export default function BackupModal(props: Props) {
  const { message, files, onLoad, onClose: handleClose } = props

  const [backups, setBackups] = useState<string[]>([])
  const getAllBackups = async () => setBackups(await getBackups())
  useEffect(() => {
    getAllBackups().catch(error => {
      console.error("Error getting backups:", error)
    })
  }, [])

  const handleLoad = async (name: string) => {
    const backup = await getBackup(name)
    if (backup) onLoad(backup)
  }

  const handleDelete = async (backup: string) => {
    await deleteBackup(backup)
    await getAllBackups()
  }

  const [newBackupName, setNewBackupName] = useState("")

  const handleCreate = () => {
    setBackup(newBackupName.trim().replace(/\s+/gu, " "), {
      message,
      files: files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),
    })
      .then(async () => {
        await getAllBackups()
        setNewBackupName("")
      })
      .catch(error => {
        console.error("Error creating backup:", error)
      })
  }

  return (
    <ModalContainer onClick={event => event.stopPropagation()}>
      <ModalActionsContainer>
        <ActionsHeader>Backups</ActionsHeader>
        <Action onClick={handleClose}>Close</Action>
      </ModalActionsContainer>
      <ShareTip>
        <ShareTipParagraph>
          Want to share a backup with someone else?
        </ShareTipParagraph>
        <ShareTipParagraph>
          Load the backup by clicking on it, then share the URL in the address
          bar.
        </ShareTipParagraph>
      </ShareTip>
      <List>
        {backups.map(backup => (
          <Item key={backup}>
            <BackupName onClick={async () => handleLoad(backup)}>
              {backup}
            </BackupName>
            <DeleteAction onClick={async () => handleDelete(backup)}>
              Delete
            </DeleteAction>
          </Item>
        ))}
      </List>
      <Container flow="row">
        <InputField
          id="backup-name"
          value={newBackupName}
          onChange={setNewBackupName}
          label="Backup name"
        />
        <Button onClick={handleCreate}>
          {backups.includes(newBackupName.trim().replace(/\s+/gu, " "))
            ? "Update"
            : "Create"}
        </Button>
      </Container>
    </ModalContainer>
  )
}
