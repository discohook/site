import { animated, useSpring } from "@react-spring/web"
import React, { useState } from "react"
import styled, { css } from "styled-components"
import { error } from "../../../icons/error"
import { warning } from "../../../icons/warning"
import { Icon } from "../../layout/Icon"

const InputValidationError = styled.div<{ variant: "error" | "warning" }>`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.accent.danger};
  font-size: 16px;
  font-weight: 500;

  padding-top: 8px;
  height: 24px;

  & > ${Icon} {
    margin-left: -8px;
    color: currentColor;
  }

  ${({ variant }) =>
    variant === "warning" &&
    css`
      color: ${({ theme }) => theme.accent.warning};
    `};
`

export type InputErrorProps = {
  variant?: "error" | "warning"
  error?: string
}

export function InputError(props: InputErrorProps) {
  const { variant = "error", error: errorMessage = "" } = props

  const hasError = Boolean(errorMessage)
  const [shouldRenderError, setShouldRenderError] = useState(hasError)
  const errorStyle = useSpring({
    config: { tension: 300, clamp: true },
    opacity: (Number(hasError) as unknown) as undefined,
    height: errorMessage ? 24 : 0,
    onRest: () => setShouldRenderError(hasError),
  })

  if (!shouldRenderError && !hasError) return null

  return (
    <animated.div style={errorStyle}>
      <InputValidationError variant={variant}>
        <Icon>{variant === "error" ? error : warning}</Icon>
        {errorMessage}
      </InputValidationError>
    </animated.div>
  )
}
