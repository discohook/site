import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { Message } from "../../message/Message"
import { Action, ActionsContainer, ActionsHeader, Container } from "../styles"
import BackupList from "./BackupList"
import { Backup, getBackup, getBackups } from "./backupStorage"

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
  margin: 8px 8px 4px;
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

    if (!backup) return
    handleLoad(backup)
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
          onDelete={getAllBackups}
        />
      </ModalContainer>
    </ModalBackground>
  )
}
