import React from "react"
import styled from "styled-components"
import ErrorBoundary from "../ErrorBoundary"
import { Message } from "./Message"
import MessagePreview from "./MessagePreview"

interface Props {
  message: Message
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

const ErrorContainer = styled.div`
  margin: 16px;
  padding: 16px;
  border: 1px solid #a54043;
  border-radius: 3px;
`

const ErrorHeader = styled.p`
  margin: 0;
  color: ${(props) => props.theme.action};
  font-weight: 500;
`

const ErrorParagraph = styled.p`
  margin: 8px 0 0;
`

function PreviewError() {
  return (
    <ErrorContainer>
      <ErrorHeader>Oops.</ErrorHeader>
      <ErrorParagraph>It looks like an error occurred.</ErrorParagraph>
      <ErrorParagraph>
        If you entered your own JSON on the left, make sure it's correct.
      </ErrorParagraph>
      <ErrorParagraph>
        If that doesn't work out, reload the page.
      </ErrorParagraph>
    </ErrorContainer>
  )
}

export default function Preview(props: Props) {
  return (
    <Container>
      <ErrorBoundary onError={PreviewError}>
        <MessagePreview message={props.message} />
      </ErrorBoundary>
    </Container>
  )
}
