import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Z_INDEX_POPOVERS } from "../layout/constants"
import { useRequiredContext } from "../state/useRequiredContext"
import { PopoverItem } from "./PopoverItem"
import { PopoverManagerContext } from "./PopoverManagerContext"

const Container = styled.div`
  & > * {
    z-index: ${Z_INDEX_POPOVERS};
  }
`

export function PopoverOverlay() {
  const manager = useRequiredContext(PopoverManagerContext)

  return useObserver(() => (
    <Container>
      {manager.popovers.map(popover => (
        <PopoverItem key={popover.name} popover={popover} />
      ))}
    </Container>
  ))
}
