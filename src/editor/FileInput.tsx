import React from "react"
import styled from "styled-components"

interface Props {
  onChange: (files: FileList | undefined) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const InputLabel = styled.span`
  display: inline-block;
  margin: 8px 8px 0;
`

const Input = styled.input.attrs(() => ({ type: "file", multiple: true }))`
  min-height: 20px;
  padding: 10px;
  margin: 8px;

  background: #484c52;
  border: 0;
  border-radius: 3px;
  outline: none;

  color: rgba(255, 255, 255, 0.7);
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;
`

export const FileInput = (props: Props) => (
  <Container>
    <InputLabel>Files</InputLabel>
    <Input
      onChange={(event) => props.onChange(event.target.files || undefined)}
    />
  </Container>
)
