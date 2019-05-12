import React, { useState } from "react"
import { Message } from "../message/Message"
import { EmbedEditor } from "./EmbedEditor"
import { FileInput } from "./FileInput"
import { InputField } from "./InputField"
import { parseMessage, stringifyMessage } from "./json/json"
import { JsonInput } from "./json/JsonInput"
import { Action, ActionsContainer, ActionsHeader, Container } from "./styles"
import { WebhookInput } from "./WebhookInput"

interface Props {
  message: Message
  onChange: (message: Message) => void
  onToggleTheme: () => void
  onToggleDisplay: () => void
}

export function Editor(props: Props) {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [json, setJson] = useState(stringifyMessage(props.message))
  const [errors, setErrors] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const [files, setFiles] = useState<FileList | undefined>()

  const handleChange = (message: Message) => {
    props.onChange(message)
    const json = stringifyMessage(message)
    setJson(json)
    checkErrors(json)
  }

  const checkErrors = (json: string) => {
    const message = parseMessage(json)
    if (Array.isArray(message)) {
      setErrors(message)
      console.log("json errors", message)
      return
    }

    setErrors([])
    return message
  }

  const executeWebhook = async () => {
    setSending(true)

    const formData = new FormData()
    formData.append("payload_json", json)

    if (files)
      for (const [index, file] of Object.entries(files))
        formData.append(`file[${index}]`, file, file.name)

    const response = await fetch(webhookUrl + "?wait=true", {
      method: "POST",
      body: formData,
    })

    setSending(false)

    console.log("execute webhook response", await response.json())
  }

  const isDisabled = (() => {
    if (sending) return true
    if (webhookUrl.trim().length === 0) return true

    const { content, embeds } = props.message
    if ((typeof content === "string" || embeds) && errors.length > 0)
      return true

    if (files && files.length === 0) return true

    return false
  })()

  return (
    <Container>
      <ActionsContainer style={{ margin: "8px 8px 4px" }}>
        <ActionsHeader>Message editor</ActionsHeader>
        <Action onClick={() => props.onToggleTheme()}>Toggle theme</Action>
        <Action onClick={() => props.onToggleDisplay()}>Toggle display</Action>
        <Action onClick={() => handleChange({})}>Clear all</Action>
      </ActionsContainer>
      <WebhookInput
        url={webhookUrl}
        onChange={(url) => setWebhookUrl(url)}
        disabled={isDisabled}
        onSubmit={executeWebhook}
      />
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
      <FileInput onChange={setFiles} />
      <JsonInput
        json={json}
        onChange={(json) => {
          setJson(json)
          const message = checkErrors(json)
          if (message) props.onChange(message)
        }}
        errors={errors}
      />
    </Container>
  )
}
