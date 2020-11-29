import { useObserver } from "mobx-react-lite"
import { ellipsis } from "polished"
import React from "react"
import styled from "styled-components"
import { Button } from "../../../../common/input/button/Button"
import { ActionButtons } from "../../../../common/layout/ActionButtons"
import { ModalManagerContext } from "../../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import { copy } from "../../../../icons/copy"
import { save } from "../../../../icons/save"
import { trash } from "../../../../icons/trash"
import { upload } from "../../../../icons/upload"
import { BackupManagerContext } from "../BackupManagerContext"
import type { BackupData } from "../types/BackupData"
import { DeletionConfirmationModal } from "./DeletionConfirmationModal"

const Container = styled.li`
  height: 48px;

  display: flex;
  align-items: center;

  list-style: none;

  border: 0 solid ${({ theme }) => theme.backgroundModifier.accent};

  & + & {
    border-top-width: 1px;
  }

  & > ${Button} {
    margin: 0;
  }
`

const BackupName = styled.div`
  ${ellipsis()};

  flex: 1;
  font-weight: 500;
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
      <ActionButtons
        actions={[
          {
            icon: upload,
            label: "Load",
            handler: async () => backupManager.loadBackup(backup.name),
          },
          {
            icon: save,
            label: "Export",
            handler: async () => backupManager.exportBackup(backup.name),
            overflow: true,
          },
          {
            icon: copy,
            label: "Overwrite",
            handler: async () => backupManager.saveBackup(backup.name),
            overflow: true,
          },
          {
            icon: trash,
            label: "Delete",
            handler: () =>
              modalManager.spawn({
                render: () => (
                  <DeletionConfirmationModal
                    backupManager={backupManager}
                    backup={backup}
                  />
                ),
              }),
            overflow: true,
          },
        ]}
      />
    </Container>
  ))
}
