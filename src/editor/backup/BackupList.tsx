import styled from "@emotion/styled"
import React from "react"

interface Props {
  backups: string[]
  onLoad: (name: string) => void
  onDelete: (name: string) => void
}

const List = styled.ul`
  padding: 0;
`

const Item = styled.li`
  display: flex;

  margin: 0 8px;
  padding: 8px 0;

  border: solid ${({ theme }) => theme.editor.border};
  border-width: 1px 0 1px;

  & + & {
    border-width: 0 0 1px;
  }
`

const BackupName = styled.a`
  color: ${({ theme }) => theme.editor.action};
  font-weight: 500;
`

export default function BackupList(props: Props) {
  const { backups, onLoad: handleLoad, onDelete: handleDelete } = props

  return (
    <List>
      {backups.map((backup) => (
        <Item key={backup}>
          <BackupName onClick={() => handleLoad(backup)}>{backup}</BackupName>
        </Item>
      ))}
    </List>
  )
}
