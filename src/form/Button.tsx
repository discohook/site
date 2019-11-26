import React, { ReactNode } from "react"
import { DefaultButton } from "./styles"

type Props = {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  "data-testid"?: string
}

export default function Button(props: Props) {
  const { children, onClick: handleClick, disabled } = props

  return (
    <DefaultButton
      onClick={() => handleClick?.()}
      disabled={disabled}
      data-testid={props["data-testid"]}
    >
      {children}
    </DefaultButton>
  )
}
