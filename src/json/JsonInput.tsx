import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { Theme } from "../appearance/Theme"
import {
  FilledButton,
  InputContainer,
  InputLabel,
  MultilineTextInput,
} from "../form/styles"
import { Message } from "../message/Message"
import { parseMessage, stringifyMessage } from "./convert"

const ErrorContainer = styled.div`
  margin: 10px 0 4px;
  padding: 8px 12px;

  background: #f04747;
  border-radius: 3px;

  color: #ffffff;
`

const Error = styled.div<{}, Theme>`
  padding: 4px 0;

  font-size: 14px;
  font-family: ${({ theme }) => theme.font.mono};
  line-height: 16px;
`

const CodeInput = styled(MultilineTextInput)<{}, Theme>`
  min-height: 240px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.font.mono};
`

const SubmitButton = styled(FilledButton)<{}, Theme>`
  margin: 8px 0 16px;
  align-self: flex-end;
`

type Props = {
  message: Message
  onChange: (message: Message) => void
}

export default function JsonInput(props: Props) {
  const { message, onChange: handleChange } = props

  const [json, setJson] = useState(() => stringifyMessage(message))
  useEffect(() => {
    setJson(stringifyMessage(message))
  }, [message])

  const [errors, setErrors] = useState<string[]>([])
  useEffect(() => {
    const { message, errors: rawErrors } = parseMessage(json)

    const errors = rawErrors.filter(
      error =>
        error !== '$: Expected one of following keys: "content", "embeds"',
    )

    setErrors(errors)

    if (errors.length > 0) {
      console.log("JSON validation errors occurred:", errors, message)
    }
  }, [json])

  return (
    <InputContainer>
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
        onClick={() => handleChange(parseMessage(json).message ?? {})}
      >
        Submit
      </SubmitButton>
    </InputContainer>
  )
}
