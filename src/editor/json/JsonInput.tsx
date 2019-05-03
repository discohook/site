import React from "react"
import styled from "styled-components"

interface Props {
  json: string
  onChange: (json: string) => void
  errors: string[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputLabel = styled.span`
  display: inline-block;
  margin: 8px 8px 0;
`

const ErrorContainer = styled.div`
  margin: 8px;
  padding: 8px 16px;

  background: #f04747;
  border-radius: 3px;
`

const Error = styled.div`
  padding: 4px 0;
  font-family: "Consolas", "Liberation Mono", "Menlo", "Courier", monospace;
  line-height: 16px;
`

const Input = styled.textarea`
  min-height: 240px;
  padding: 10px;
  margin: 8px;

  background: #484c52;
  border: 0;
  border-radius: 3px;
  outline: none;

  resize: vertical;

  color: rgba(255, 255, 255, 0.7);
  font-family: "Consolas", "Liberation Mono", "Menlo", "Courier", monospace;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;
`

export const JsonInput = (props: Props) => (
  <Container>
    <InputLabel>JSON data</InputLabel>
    {props.errors.length > 0 && (
      <ErrorContainer>
        {props.errors.map((error, index) => (
          <Error key={index}>{error}</Error>
        ))}
      </ErrorContainer>
    )}
    <Input
      value={props.json}
      onChange={(event) => props.onChange(event.target.value)}
    />
  </Container>
)
