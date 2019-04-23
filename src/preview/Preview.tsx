import React from "react"
import styled from "styled-components"
import { Message } from "../message/Message"

interface Props {
  message: Message
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Preview = (props: Props) => (
  <Container>
    Preview
    <pre>{JSON.stringify(props.message)}</pre>
  </Container>
)
