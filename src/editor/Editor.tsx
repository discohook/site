import styled from "@emotion/styled"
import React, { ComponentProps, useEffect, useRef, useState } from "react"
import ErrorBoundary from "../ErrorBoundary"
import { Message } from "../message/Message"
import EmbedEditor from "./EmbedEditor"
import FileInput from "./FileInput"
import InputField from "./InputField"
import { parseMessage, stringifyMessage } from "./json/convert"
import JsonInput from "./json/JsonInput"
import {
  Action,
  ActionsContainer,
  ActionsHeader,
  Button,
  Container,
} from "./styles"

interface Props {
  message: Message
  onChange: (message: Message) => void
  files: FileList | undefined
  onFilesChange: (files: FileList | undefined) => void
  onToggleTheme: () => void
  onToggleDisplay: () => void
}

const EditorContainer = styled(Container)`
  padding: 8px;
  overflow-y: scroll;

  > *:not(button) {
    flex-grow: 0;
  }
`

const EditorActionsWrapper = styled.div``

const EditorActionsContainer = styled(ActionsContainer)`
  margin: 8px 8px 4px;
`

const ErrorContainer = styled.div`
  margin: 8px;
  padding: 16px;
  border: 1px solid #a54043;
  border-radius: 3px;
`

const ErrorHeader = styled.p`
  margin: 0;
  color: ${(props) => props.theme.action};
  font-weight: 500;
`

const ErrorParagraph = styled.p`
  margin: 8px 0 0;
`

function EditorError() {
  return (
    <ErrorContainer>
      <ErrorHeader>Oops.</ErrorHeader>
      <ErrorParagraph>It looks like an error occurred.</ErrorParagraph>
      <ErrorParagraph>
        If you manually edited the JSON data below, try double checking it.
      </ErrorParagraph>
      <ErrorParagraph>
        If that doesn't work out, reload the page.
      </ErrorParagraph>
    </ErrorContainer>
  )
}

export default function Editor(props: Props) {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [json, setJson] = useState(stringifyMessage(props.message))
  const [errors, setErrors] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const fileInputRef: ComponentProps<typeof FileInput>["ref"] = useRef(null)

  const handleChange = (message: Message) => {
    props.onChange(message)
    const json = stringifyMessage(message)
    setJson(json)
    checkErrors(json)
  }

  const checkErrors = (json: string) => {
    let prevErrors = errors
    const { message, errors: newErrors } = parseMessage(json)

    setErrors(filterEmptyMessageError(newErrors))

    if (newErrors.length > 0 && prevErrors.join("\n") !== newErrors.join("\n"))
      console.log("JSON validation errors occurred:", newErrors, message)

    return message
  }

  // If the message is empty the JSON validator returns an error because
  // the message appears to be empty. However when there's at least one file
  // present, this error is false.
  const filterEmptyMessageError = (errors: string[]) =>
    props.files
      ? errors.filter(
          (error) =>
            error !==
            "message: Expected one of following keys: 'content', 'embeds'",
        )
      : errors

  useEffect(() => setErrors(filterEmptyMessageError), [props.files])

  const executeWebhook = async () => {
    setSending(true)

    const formData = new FormData()
    formData.append("payload_json", json)

    if (props.files)
      for (const [index, file] of Object.entries(props.files))
        formData.append(`file[${index}]`, file, file.name)

    const response = await fetch(webhookUrl + "?wait=true", {
      method: "POST",
      body: formData,
    })

    setSending(false)
    console.log("Webhook executed:", await response.json())
  }

  const clearFiles = () => {
    if (fileInputRef.current) fileInputRef.current.clearFiles()
  }

  const isDisabled = (() => {
    if (sending) return true
    if (webhookUrl.trim().length === 0) return true

    const { content, embeds } = props.message
    if ((typeof content === "string" || embeds) && errors.length > 0)
      return true

    if (props.files && props.files.length === 0) return true

    return false
  })()

  return (
    <EditorContainer>
      <EditorActionsWrapper>
        <EditorActionsContainer>
          <ActionsHeader>Message editor</ActionsHeader>
          <Action onClick={() => props.onToggleTheme()}>Toggle theme</Action>
          <Action onClick={() => props.onToggleDisplay()}>
            Toggle display
          </Action>
          <Action
            onClick={() => {
              handleChange({})
              clearFiles()
            }}
          >
            Clear all
          </Action>
        </EditorActionsContainer>
      </EditorActionsWrapper>
      <Container direction="row">
        <InputField
          value={webhookUrl}
          onChange={(url) => setWebhookUrl(url || "")}
          label="Webhook URL"
          placeholder="https://discordapp.com/api/webhooks/..."
        />
        <Button disabled={isDisabled} onClick={executeWebhook}>
          Send
        </Button>
      </Container>
      <ErrorBoundary onError={() => <EditorError />}>
        <InputField
          value={props.message.content || ""}
          onChange={(content) => handleChange({ ...props.message, content })}
          label="Message content"
          multiline
        />
        <EmbedEditor
          embeds={props.message.embeds || []}
          onChange={(embeds) => handleChange({ ...props.message, embeds })}
        />
        <Container direction="row">
          <InputField
            value={props.message.username || ""}
            onChange={(username) =>
              handleChange({ ...props.message, username })
            }
            label="Override username"
          />
          <InputField
            value={props.message.avatarUrl || ""}
            onChange={(avatarUrl) =>
              handleChange({ ...props.message, avatarUrl })
            }
            label="Override avatar"
          />
        </Container>
      </ErrorBoundary>
      <Container direction="row">
        <FileInput onChange={props.onFilesChange} ref={fileInputRef} />{" "}
        <Button onClick={clearFiles}>Remove files</Button>
      </Container>
      <JsonInput
        json={json}
        onChange={(json) => {
          setJson(json)
          const message = checkErrors(json)
          if (message) props.onChange(message)
        }}
        errors={errors}
      />
    </EditorContainer>
  )
}
