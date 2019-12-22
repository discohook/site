import React, { ReactNode } from "react"
import { FilledButton, OutlineButton } from "./styles"

type Props = {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  filled?: boolean
  "data-testid"?: string
}

export default function Button(props: Props) {
  const { children, onClick: handleClick, disabled, filled = true } = props

  const Component = filled ? FilledButton : OutlineButton

  return (
    <Component
      onClick={() => handleClick?.()}
      disabled={disabled}
      data-testid={props["data-testid"]}
    >
      {children}
    </Component>
  )
}
