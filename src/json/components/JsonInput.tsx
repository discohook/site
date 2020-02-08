import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { darkTheme } from "../../appearance/themes/darkTheme"
import { Button } from "../../form/components/Button"
import { InputContainer } from "../../form/components/InputContainer"
import { InputLabel } from "../../form/components/InputLabel"
import { MultilineTextInput } from "../../form/components/MultilineTextInput"
import { Message } from "../../message/types/Message"
import { parseMessage } from "../helpers/parseMessage"
import { stringifyMessage } from "../helpers/stringifyMessage"

const ErrorContainer = styled.div`
  margin: 10px 0 4px;
  padding: 8px 12px;

  background: ${({ theme }) => theme.accent.danger};
  border-radius: 3px;

  color: ${darkTheme.header.primary};
`

const Error = styled.div`
  padding: 4px 0;

  font-size: 14px;
  font-family: ${({ theme }) => theme.font.mono};
  line-height: 16px;
`

const CodeInput = styled(MultilineTextInput)`
  min-height: 240px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.font.mono};
`

const SubmitButton = styled(Button)`
  margin: 8px 0 16px;
  align-self: flex-end;
`

export type JsonInputProps = {
  message: Message
  onChange: (message: Message) => void
}

export function JsonInput(props: JsonInputProps) {
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
