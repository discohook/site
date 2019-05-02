import React from "react"
import styled from "styled-components"
import { Message } from "./Message"
import { MessagePreview } from "./MessagePreview"

interface Props {
  message: Message
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Preview = (props: Props) => (
  <Container>
    <MessagePreview message={props.message} />
  </Container>
)
