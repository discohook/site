import React from "react"
import styled from "styled-components"
import { PopoverContainer } from "../../popover/components/PopoverContainer"

const Container = styled.div`
  display: flex;
  margin: 0 8px 8px;

  flex-wrap: wrap;
  justify-content: flex-end;

  ${PopoverContainer} & {
    margin: 0 0 4px;
  }
`

const Header = styled.span`
  margin-top: 8px;

  flex: 1;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;

  white-space: nowrap;

  ${PopoverContainer} & {
    margin: 0 0 8px;
  }
`

const ActionsContainer = styled.div`
  margin-top: 4px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  ${PopoverContainer} & {
    margin: 0 4px 4px;
  }
`

const Action = styled.button.attrs({ type: "button" })`
  padding: 0;
  margin: 4px 0 0 16px;

  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;

  white-space: nowrap;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  ${PopoverContainer} & {
    margin: 0 0 4px 16px;
  }
`

export type ActionsProps = {
  title?: string
  actions: {
    name: string
    action: () => void
  }[]
}

export function Actions(props: ActionsProps) {
  const { title, actions } = props

  return (
    <Container>
      {title && <Header>{title}</Header>}
      <ActionsContainer>
        {actions.map(({ name, action: handleClick }) => (
          <Action key={name} onClick={handleClick}>
            {name}
          </Action>
        ))}
      </ActionsContainer>
    </Container>
  )
}
