import React from "react"
import styled from "styled-components"
import { InputField } from "../InputField"

interface Props {
  json: string
  onChange: (json: string) => void
}

const Input = styled(InputField)`
  min-height: 240px;
  font-family: "Consolas", "Liberation Mono", "Menlo", "Courier", monospace;
`

export const JsonInput = (props: Props) => (
  <Input
    value={props.json}
    onChange={(json) => props.onChange(json)}
    label="JSON data"
    multiline
  />
)
