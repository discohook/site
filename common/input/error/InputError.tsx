import { animated, useSpring } from "@react-spring/web"
import React, { useState } from "react"
import styled from "styled-components"
import { error } from "../../../icons/error"
import { Icon } from "../../layout/Icon"

const InputValidationError = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.accent.danger};
  font-size: 16px;
  font-weight: 500;

  padding-top: 8px;

  & > ${Icon} {
    margin-left: -8px;
    color: ${({ theme }) => theme.accent.danger};
  }
`

export type InputErrorProps = {
  error?: string
}

export function InputError(props: InputErrorProps) {
  const { error: errorMessage = "" } = props

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
      <InputValidationError>
        <Icon>{error}</Icon>
        {errorMessage}
      </InputValidationError>
    </animated.div>
  )
}
