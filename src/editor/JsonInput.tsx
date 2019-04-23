import React from "react"
import styled from "styled-components"

interface Props {
  value: string
  onChange: (value: string) => void
}

const Input = styled.textarea`
  min-height: 240px;
  resize: vertical;
`

export const JsonInput = (props: Props) => (
  <Input
    value={props.value}
    onChange={(event) => props.onChange(event.target.value)}
  />
)
