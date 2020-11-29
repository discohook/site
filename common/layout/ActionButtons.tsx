import React, { ReactElement, useRef } from "react"
import styled from "styled-components"
import { overflow } from "../../icons/overflow"
import { usePopover } from "../popover/usePopover"
import { ActionOverflowMenu } from "./ActionOverflowMenu"
import { IconButton } from "./IconButton"

const Container = styled.div`
  display: flex;
  justify-content: end;
  margin: 0 -8px;
`

export type Action = {
  icon: ReactElement
  label: string
  handler: () => void
  overflow?: boolean
}

export type ActionButtonsProps = {
  actions: Action[]
}

export function ActionButtons(props: ActionButtonsProps) {
  const { actions } = props

  const overflowActions = actions.filter(action => action.overflow)

  const moreRef = useRef<HTMLButtonElement>(null)
  const popover = usePopover({
    ref: moreRef,
    render: () => <ActionOverflowMenu actions={overflowActions} />,
    placement: "bottom-end",
  })

  return (
    <Container>
      {actions.map(
        action =>
          !action.overflow && (
            <IconButton
              key={action.label}
              icon={action.icon}
              label={action.label}
              onClick={() => action.handler()}
            />
          ),
      )}
      {overflowActions.length > 0 && (
        <IconButton
          ref={moreRef}
          icon={overflow}
          label="More actions"
          tooltip={false}
          onClick={() => popover.spawn()}
        />
      )}
    </Container>
  )
}
