import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Actions } from "../../editor/components/Actions"
import { FlexContainer } from "../../editor/components/Container"
import { Button } from "../../form/components/Button"
import { InputField } from "../../form/components/InputField"
import { Message } from "../../message/classes/Message"
import { deleteBackup } from "../helpers/deleteBackup"
import { getBackup } from "../helpers/getBackup"
import { listBackups } from "../helpers/listBackups"
import { setBackup } from "../helpers/setBackup"

const ModalContainer = styled.div`
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

const ShareTip = styled.div`
  margin: 16px 8px 8px;
  padding: 12px;

  border: 1px solid ${({ theme }) => theme.accent.primary};
  border-radius: 3px;
`

const ShareTipParagraph = styled.p`
  color: ${({ theme }) => theme.header.primary};

  margin: 0;

  & + & {
    margin: 8px 0 0;
  }
`

const List = styled.ul`
  margin: 8px;
  padding: 0;

  &:not(:empty) {
    margin-top: 16px;
  }
`

const Item = styled.li`
  display: flex;
  align-items: center;

  padding: 8px 0;

  border: solid ${({ theme }) => theme.backgroundModifier.accent};
  border-width: 1px 0;

  & + & {
    border-width: 0 0 1px;
  }
`

const BackupName = styled.a`
  margin: 0 auto 0 0;

  color: ${({ theme }) => theme.header.primary};
  font-size: 15px;
  font-weight: 500;

  cursor: pointer;
`

const DeleteAction = styled.a`
  margin: 0 0 0 8px;
  color: ${({ theme }) => theme.accent.danger};
  cursor: pointer;
`

export type BackupModalProps = {
  message: Message
  onClose: () => void
}

export function BackupModal(props: BackupModalProps) {
  const { message, onClose: handleClose } = props

  const [backups, setBackups] = useState<string[]>([])
  const getAllBackups = async () => setBackups(await listBackups())
  useEffect(() => {
    getAllBackups().catch(error => {
      console.error("Error getting backups:", error)
    })
  }, [])

  const handleLoad = async (name: string) => {
    const backup = await getBackup(name)
    if (backup) message.apply(backup)
  }

  const handleDelete = async (backup: string) => {
    await deleteBackup(backup)
    await getAllBackups()
  }

  const [newBackupName, setNewBackupName] = useState("")

  const handleCreate = () => {
    setBackup(newBackupName.trim().replace(/\s+/gu, " "), message.toJS())
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
      <Actions
        title="Backups"
        actions={[{ name: "Close", action: handleClose }]}
      />
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
      <FlexContainer flow="row">
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
      </FlexContainer>
    </ModalContainer>
  )
}
