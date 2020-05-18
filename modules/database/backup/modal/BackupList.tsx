import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import { BackupManagerContext } from "../BackupManagerContext"
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

  line-height: 1.375;
  font-style: italic;
`

export function BackupList() {
  const backupManager = useRequiredContext(BackupManagerContext)

  return useObserver(() =>
    backupManager.backups.length > 0 ? (
      <Container>
        {backupManager.backups.map(backup => (
          <BackupItem key={backup.id} backup={backup} />
        ))}
      </Container>
    ) : (
      <NoBackupsNotice>
        You haven&apos;t made any backups yet. Enter a name below and click on
        the Save button to make the first!
      </NoBackupsNotice>
    ),
  )
}
