import React, { ChangeEvent } from "react"
import styled from "../../styled"
import { MultilineTextInput } from "../styles"

interface Props {
  json: string
  onChange: (json: string) => void
  errors: string[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const InputLabel = styled.span`
  display: inline-block;
  margin: 8px 8px 0;
`

const ErrorContainer = styled.div`
  margin: 8px;
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
  return (
    <Container>
      <InputLabel>JSON data</InputLabel>
      {props.errors.length > 0 && (
        <ErrorContainer>
          {props.errors.map((error, index) => (
            <Error key={index}>{error}</Error>
          ))}
        </ErrorContainer>
      )}
      <CodeInput
        value={props.json}
        onChange={(
          event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => props.onChange(event.target.value)}
      />
    </Container>
  )
}
