import { useObserver } from "mobx-react-lite"
import React, { useState } from "react"
import styled from "styled-components"
import { InputField } from "../../../../common/input/text/InputField"
import { useRequiredContext } from "../../../../common/state/useRequiredContext"
import { Markdown } from "../../../markdown/Markdown"
import { BackupManagerContext } from "../BackupManagerContext"
import { BackupItem } from "./BackupItem"

const Container = styled.ul`
  padding: 0;
  margin: 0;

  max-height: 420px;
  overflow-x: hidden;
`

export function BackupList() {
  const backupManager = useRequiredContext(BackupManagerContext)

  const [search, setSearch] = useState("")

  return useObserver(() =>
    backupManager.backups.length > 0 ? (
      <>
        <InputField
          id="backups-search"
          label="Search Backups"
          value={search}
          onChange={setSearch}
        />
        <Container>
          {backupManager.backups
            .filter(backup =>
              backup.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()),
            )
            .map(backup => (
              <BackupItem key={backup.id} backup={backup} />
            ))}
        </Container>
      </>
    ) : (
      <Markdown
        content={
          "You haven't made any backups yet." +
          " Enter a name below and click on the Save button to make one."
        }
      />
    ),
  )
}
