import React, { useState } from "react"
import styled from "styled-components"
import { Message } from "../message/Message"
import { InputField } from "./InputField"
import { parseMessage, stringifyMessage } from "./json/json"
import { JsonInput } from "./json/JsonInput"

interface Props {
  message: Message
  onChange: (message: Message) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Editor = (props: Props) => {
  const [json, setJson] = useState(stringifyMessage(props.message))

  const handleChange = (message: Message) => {
    props.onChange(message)
    setJson(stringifyMessage(message))
  }

  return (
    <Container>
      <InputField
        value={props.message.content || ""}
        onChange={(content) => handleChange({ ...props.message, content })}
        label="Message content"
        multiline
      />
      <JsonInput
        json={json}
        onChange={(json) => {
          setJson(json)
          try {
            const parsedMessage = parseMessage(json)
            props.onChange(parsedMessage)
          } catch (e) {}
        }}
      />
    </Container>
  )
}
