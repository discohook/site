import styled from "@emotion/styled"
import React from "react"
import { getUniqueId } from "../../uid"
import { Container, InputLabel, MultilineTextInput } from "../styles"

interface Props {
  json: string
  onChange: (json: string) => void
  errors: string[]
}

const ErrorContainer = styled.div`
  margin: 8px 8px 0;
  padding: 8px 16px;

  background: #f04747;
  border-radius: 3px;

  color: #ffffff;
`

const Error = styled.div`
  padding: 4px 0;
  font-family: "Consolas", "Liberation Mono", "Menlo", "Courier", monospace;
  line-height: 16px;
`

const CodeInput = styled(MultilineTextInput)`
  min-height: 240px;
  margin: 8px;
  font-family: "Consolas", "Liberation Mono", "Menlo", "Courier", monospace;
`

export default function JsonInput(props: Props) {
  const id = getUniqueId()

  return (
    <Container>
      <InputLabel htmlFor={id}>JSON data</InputLabel>
      {props.errors.length > 0 && (
        <ErrorContainer>
          {props.errors.map(error => (
            <Error key={error}>{error}</Error>
          ))}
        </ErrorContainer>
      )}
      <CodeInput
        id={id}
        value={props.json}
        onChange={event => props.onChange(event.target.value)}
      />
    </Container>
  )
}
