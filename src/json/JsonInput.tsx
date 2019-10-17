import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { Theme } from "../core/themes"
import {
  Button,
  Container,
  InputLabel,
  MultilineTextInput,
} from "../editor/styles"
import { Message } from "../message/Message"
import { parseMessage, stringifyMessage } from "./convert"

const ErrorContainer = styled.div`
  margin: 8px 8px 0;
  padding: 8px 16px;

  background: #f04747;
  border-radius: 3px;

  color: #ffffff;
`

const Error = styled.div<{}, Theme>`
  padding: 4px 0;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  line-height: 16px;
`

const CodeInput = styled(MultilineTextInput)<{}, Theme>`
  min-height: 240px;
  margin: 8px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
`

const SubmitButton = styled(Button)<{}, Theme>`
  margin: 8px 8px 16px;
`

type Props = {
  message: Message
  onChange: (message: Message) => void
}

export default function JsonInput(props: Props) {
  const { message, onChange: handleChange } = props

  const [json, setJson] = useState(stringifyMessage(message))
  useEffect(() => {
    setJson(stringifyMessage(message))
  }, [message])

  const [errors, setErrors] = useState<string[]>([])
  useEffect(() => {
    const { message, errors: rawErrors } = parseMessage(json)

    const errors = rawErrors.filter(
      error =>
        error !== "$: Expected one of following keys: 'content', 'embeds'",
    )

    setErrors(errors)

    if (errors.length > 0) {
      console.log("JSON validation errors occurred:", errors, message)
    }
  }, [json])

  return (
    <Container>
      <InputLabel htmlFor="json">JSON data</InputLabel>
      {errors.length > 0 && (
        <ErrorContainer>
          {errors.map(error => (
            <Error key={error}>{error}</Error>
          ))}
        </ErrorContainer>
      )}
      <CodeInput
        id="json"
        value={json}
        onChange={event => setJson(event.target.value)}
      />
      <SubmitButton
        disabled={errors.length > 0}
        onClick={() => handleChange(parseMessage(json).message || {})}
      >
        Submit
      </SubmitButton>
    </Container>
  )
}
