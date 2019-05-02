import React from "react"
import styled from "styled-components"

interface Props {
  json: string
  onChange: (json: string) => void
}

const Input = styled.textarea`
  min-height: 240px;
  resize: vertical;
`

export const JsonInput = (props: Props) => (
  <Input
    value={props.json}
    onChange={(event) => props.onChange(event.target.value)}
  />
)
