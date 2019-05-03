import React from "react"
import styled from "styled-components"

interface Props {
  value: string
  onChange: (value: string | undefined) => void
  label?: string
  multiline?: true
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const InputLabel = styled.span`
  display: inline-block;
  margin: 8px 8px 0;
`

const Input = styled.input<{ as?: string }>`
  min-height: ${(props) => (props.as === "textarea" ? "80px" : "20px")};
  padding: 10px;
  margin: 8px;

  background: #484c52;
  border: 0;
  border-radius: 3px;
  outline: none;

  resize: vertical;

  color: rgba(255, 255, 255, 0.7);
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;
`

export const InputField = (props: Props) => (
  <Container>
    {props.label && <InputLabel>{props.label}</InputLabel>}
    <Input
      as={props.multiline && "textarea"}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value || undefined)}
    />
  </Container>
)
