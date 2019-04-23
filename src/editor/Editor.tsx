import React, { useState } from "react"
import styled from "styled-components"
import { parseMessage, stringifyMessage } from "../helpers/json"
import { Message } from "../message/Message"
import { JsonInput } from "./JsonInput"

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

  return (
    <Container>
      Editor
      <JsonInput
        value={json}
        onChange={(json) => {
          setJson(json)
          try {
            const parsed = parseMessage(json)
            props.onChange(parsed)
          } catch (e) {}
        }}
      />
    </Container>
  )
}
