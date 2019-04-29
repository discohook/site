import React, { useState } from "react"
import styled from "styled-components"
import { Message } from "../../message/Message"
import { parseMessage, stringifyMessage } from "./json"

interface Props {
  message: Message
  onChange: (message: Message) => void
}

const Input = styled.textarea`
  min-height: 240px;
  resize: vertical;
`

export const JsonInput = (props: Props) => {
  const [json, setJson] = useState(stringifyMessage(props.message))

  return (
    <Input
      value={json}
      onChange={(event) => {
        setJson(event.target.value)
        try {
          const parsed = parseMessage(event.target.value)
          props.onChange(parsed)
        } catch (e) {}
      }}
    />
  )
}
