import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../appearance/Theme"

const ActionsContainer = styled.div`
  display: flex;
  margin: 8px;
`

const ActionsHeader = styled.span<{}, Theme>`
  flex: 1;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`

const Action = styled.button<{}, Theme>`
  padding: 0;

  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;

  &:hover {
    text-decoration: underline;
  }

  * + & {
    margin-left: 16px;
  }
`
Action.defaultProps = { type: "button" }

type Props = {
  title?: string
  actions: {
    name: string
    action: () => void
  }[]
}

export default function Actions(props: Props) {
  const { title, actions } = props

  return (
    <ActionsContainer>
      {title && <ActionsHeader>{title}</ActionsHeader>}
      {actions.map(({ name, action: handleClick }) => (
        <Action key={name} onClick={handleClick}>
          {name}
        </Action>
      ))}
    </ActionsContainer>
  )
}
