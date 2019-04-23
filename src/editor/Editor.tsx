import React from "react"
import styled from "styled-components"
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
  return (
    <Container>
      Editor
      <JsonInput message={props.message} onChange={props.onChange} />
    </Container>
  )
}
