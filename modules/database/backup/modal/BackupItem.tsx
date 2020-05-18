import { useObserver } from "mobx-react-lite"
import { ellipsis } from "polished"
import React from "react"
import styled from "styled-components"
import { Button } from "../../../../common/input/Button"
import { ModalManagerContext } from "../../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import { BackupManagerContext } from "../BackupManagerContext"
import type { BackupData } from "../types/BackupData"
import { DeletionConfirmationModal } from "./DeletionConfirmationModal"

const Container = styled.li`
  height: 40px;

  display: flex;
  align-items: center;

  list-style: none;

  border: solid ${({ theme }) => theme.backgroundModifier.accent};
  border-width: 0;

  & + & {
    border-width: 1px 0 0;
  }

  & > ${Button} {
    margin: 0;
  }
`

const BackupName = styled.div`
  ${ellipsis()};

  font-weight: 500;
  color: ${({ theme }) => theme.interactive.normal};

  flex: 1;
`

export type BackupItemProps = {
  backup: BackupData
}

export function BackupItem(props: BackupItemProps) {
  const { backup } = props

  const modalManager = useRequiredContext(ModalManagerContext)
  const backupManager = useRequiredContext(BackupManagerContext)

  return useObserver(() => (
    <Container>
      <BackupName>{backup.name}</BackupName>
      <Button
        variant="borderless"
        onClick={async () => {
          await backupManager.exportBackup(backup.name)
        }}
      >
        Export
      </Button>
      <Button
        variant="borderless"
        onClick={async () => {
          await backupManager.loadBackup(backup.name)
        }}
      >
        Load
      </Button>
      <Button
        variant="borderless"
        onClick={() => {
          modalManager.spawn({
            render: () => (
              <DeletionConfirmationModal
                backupManager={backupManager}
                backup={backup}
              />
            ),
          })
        }}
      >
        Delete
      </Button>
    </Container>
  ))
}
