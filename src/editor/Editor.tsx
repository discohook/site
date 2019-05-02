import React, { useState } from "react"
import styled from "styled-components"
import { Message } from "../message/Message"
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
      Editor
      <textarea
        value={props.message.content || ""}
        onChange={(event) =>
          handleChange({ ...props.message, content: event.target.value })
        }
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
