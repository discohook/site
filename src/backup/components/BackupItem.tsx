import { useObserver } from "mobx-react-lite"
import { ellipsis } from "polished"
import React from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { useManager } from "../../state/hooks/useManager"
import { useStores } from "../../state/hooks/useStores"
import { spawnDeletionConfirmationModal } from "../actions/spawnDeletionConfirmationModal"
import { BackupData } from "../types/BackupData"

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

  const manager = useManager()

  const { backupStore } = useStores()

  return useObserver(() => (
    <Container>
      <BackupName>{backup.name}</BackupName>
      <Button
        variant="borderless"
        onClick={async () => {
          await backupStore.loadBackup(backup.name)
        }}
      >
        Load
      </Button>
      <Button
        variant="borderless"
        onClick={() => {
          spawnDeletionConfirmationModal(manager, backup)
        }}
      >
        Delete
      </Button>
    </Container>
  ))
}
