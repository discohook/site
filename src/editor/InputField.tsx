import React from "react"
import styled from "styled-components"

interface Props {
  value: string
  onChange: (value: string) => void
  label?: string
  multiline?: true
  className?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputLabel = styled.span`
  display: inline-block;
  margin: 8px 8px 0;
`

const Input = styled.input`
  min-height: 80px;
  padding: 10px;
  margin: 8px;

  background: #484c52;
  border: 0;
  border-radius: 3px;

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
      className={props.className}
      as={props.multiline && ("textarea" as "textarea")}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    />
  </Container>
)
