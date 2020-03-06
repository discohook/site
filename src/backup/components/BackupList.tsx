import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { useStores } from "../../state/hooks/useStores"
import { BackupItem } from "./BackupItem"

const Container = styled.ul`
  padding: 0;
  margin: 0 8px;

  border: solid ${({ theme }) => theme.backgroundModifier.accent};
  border-width: 1px 0;

  max-height: 420px;
  overflow-y: auto;
`

const NoBackupsNotice = styled.div`
  margin: 8px;
  font-style: italic;
`

export function BackupList() {
  const { backupStore } = useStores()

  return useObserver(() =>
    backupStore.backupList.length > 0 ? (
      <Container>
        {backupStore.backupList.map(backup => (
          <BackupItem key={backup.name} backup={backup} />
        ))}
      </Container>
    ) : (
      <NoBackupsNotice>
        No backups were found. Make the first one!
      </NoBackupsNotice>
    ),
  )
}
