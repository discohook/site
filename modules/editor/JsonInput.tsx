import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Button } from "../../common/input/Button"
import { InputContainer } from "../../common/input/styles/InputContainer"
import { InputLabel } from "../../common/input/styles/InputLabel"
import { MultilineTextInput } from "../../common/input/styles/MultilineTextInput"
import { useAutorun } from "../../common/state/useAutorun"
import { useRequiredContext } from "../../common/state/useRequiredContext"
import { DARK_THEME } from "../../common/style/themes/darkTheme"
import { parseMessage } from "../message/helpers/parseMessage"
import { stringifyMessage } from "../message/helpers/stringifyMessage"
import { Message } from "../message/Message"
import { EditorManagerContext } from "./EditorManagerContext"

const ErrorContainer = styled.div`
  margin: 10px 0 4px;
  padding: 8px 12px;

  background: ${({ theme }) => theme.accent.danger};
  border-radius: 3px;

  color: ${DARK_THEME.header.primary};
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

export function JsonInput() {
  const editorManager = useRequiredContext(EditorManagerContext)

  const [json, setJson] = useState(() =>
    stringifyMessage(editorManager.message.getMessageData()),
  )

  const lastMessageRef = useRef(json)
  useAutorun(() => {
    const newMessage = stringifyMessage(
      editorManager.message.getMessageData(),
      false,
    )

    if (newMessage !== lastMessageRef.current) {
      setJson(stringifyMessage(editorManager.message.getMessageData()))
      lastMessageRef.current = newMessage
    }
  })

  const [errors, setErrors] = useState<string[]>([])
  useEffect(() => {
    let { errors } = parseMessage(json)

    errors = errors.filter(
      error =>
        error !== '$: Expected one of following keys: "content", "embeds"',
    )

    setErrors(errors)
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
        onClick={() => {
          editorManager.message = Message.of({
            ...parseMessage(json).message,
            files: editorManager.message.files,
          })
        }}
      >
        Apply JSON data
      </SubmitButton>
    </InputContainer>
  )
}
