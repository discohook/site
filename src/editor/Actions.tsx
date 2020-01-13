import React from "react"
import styled from "styled-components"

const ActionsContainer = styled.div`
  display: flex;
  margin: 8px;
`

const ActionsHeader = styled.span`
  flex: 1;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`

const Action = styled.button.attrs({ type: "button" })`
  padding: 0;

  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  * + & {
    margin-left: 16px;
  }
`

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
