import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Z_INDEX_TOOLTIPS } from "../layout/constants"
import { useRequiredContext } from "../state/useRequiredContext"
import { TooltipItem } from "./TooltipItem"
import { TooltipManagerContext } from "./TooltipManagerContext"

const Wrapper = styled.div`
  & > * {
    z-index: ${Z_INDEX_TOOLTIPS};
  }
`

export function TooltipOverlay() {
  const manager = useRequiredContext(TooltipManagerContext)

  return useObserver(() => (
    <Wrapper>
      {manager.tooltips.map(tooltip => (
        <TooltipItem key={tooltip.id} tooltip={tooltip} />
      ))}
    </Wrapper>
  ))
}
