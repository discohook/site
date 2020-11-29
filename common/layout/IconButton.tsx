import type { ReactElement, RefObject } from "react"
import React, { forwardRef } from "react"
import { Interactive } from "../input/Interactive"
import type { ReactRef } from "../state/ReactRef"
import { TooltipWrapper } from "../tooltip/TooltipWrapper"
import { Icon } from "./Icon"
import { VisuallyHidden } from "./VisuallyHidden"

export type IconButtonProps = {
  icon: ReactElement
  label: string
  className?: string
  tooltip?: boolean
  onClick?: () => void
}

function IconButtonRenderer(
  props: IconButtonProps,
  ref: ReactRef<HTMLButtonElement>,
) {
  const { icon, label, className, tooltip = true, onClick: handleClick } = props

  const render = (anchorRef?: RefObject<never>) => {
    return (
      <Interactive className={className} ref={ref} onClick={handleClick}>
        <VisuallyHidden>{label}</VisuallyHidden>
        <Icon ref={anchorRef} aria-hidden>
          {icon}
        </Icon>
      </Interactive>
    )
  }

  return tooltip ? (
    <TooltipWrapper key={label} label={label}>
      {render}
    </TooltipWrapper>
  ) : (
    render()
  )
}

export const IconButton = forwardRef(IconButtonRenderer)
