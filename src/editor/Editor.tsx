import React, { useState } from "react"
import styled from "styled-components"
import { Message } from "../message/Message"
import { EmbedEditor } from "./EmbedEditor"
import { FileInput } from "./FileInput"
import { InputField } from "./InputField"
import { parseMessage, stringifyMessage } from "./json/json"
import { JsonInput } from "./json/JsonInput"
import { WebhookInput } from "./WebhookInput"

interface Props {
  message: Message
  onChange: (message: Message) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Editor = (props: Props) => {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [json, setJson] = useState(stringifyMessage(props.message))
  const [errors, setErrors] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const [file, setFile] = useState<File | undefined>()

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
    if (file) formData.append("file", file, file.name)

    const response = await fetch(webhookUrl + "?wait=true", {
      method: "POST",
      body: formData,
    })

    setSending(false)

    console.log("execute webhook response", await response.json())
  }

  return (
    <Container>
      <WebhookInput
        url={webhookUrl}
        onChange={(url) => setWebhookUrl(url)}
        disabled={!webhookUrl || !!errors.length || sending}
        onSubmit={executeWebhook}
      />
      <InputField
        value={props.message.content || ""}
        onChange={(content) => handleChange({ ...props.message, content })}
        label="Message content"
        multiline
      />
      {(props.message.embeds || []).map((embed, index) => (
        <EmbedEditor
          key={index}
          embed={embed}
          onChange={(embed) => {
            const embeds = Array.from(props.message.embeds || [])
            embeds[index] = embed
            handleChange({ ...props.message, embeds })
          }}
        />
      ))}
      <FileInput onChange={setFile} />
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
