import styled from "@emotion/styled";
import React from "react";

const ErrorContainer = styled.div`
  margin: 8px;
  padding: 16px;
  border: 1px solid #a54043;
  border-radius: 3px;
`

const ErrorHeader = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.editor.action};
  font-weight: 500;
`

const ErrorParagraph = styled.p`
  margin: 8px 0 0;
`

export default function EditorError() {
  return (
    <ErrorContainer>
      <ErrorHeader>Oops.</ErrorHeader>
      <ErrorParagraph>It looks like an error occurred.</ErrorParagraph>
      <ErrorParagraph>
        If you manually edited the JSON data below, try double checking it.
      </ErrorParagraph>
      <ErrorParagraph>
        If that doesn't work out, reload the page.
      </ErrorParagraph>
    </ErrorContainer>
  )
}
