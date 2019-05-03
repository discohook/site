import React, { useState } from "react"
import styled from "styled-components"
import { Message } from "../message/Message"
import { InputField } from "./InputField"
import { parseMessage, stringifyMessage } from "./json/json"
import { JsonInput } from "./json/JsonInput"
import { WebhookInput } from "./WebhookInput"
import console = require("console")

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

  const handleChange = (message: Message) => {
    props.onChange(message)
    setJson(stringifyMessage(message))
  }

  return (
    <Container>
      <WebhookInput
        url={webhookUrl}
        onChange={(url) => setWebhookUrl(url)}
        disabled={!!errors.length || sending}
        onSubmit={async () => {
          setSending(true)
          const response = await fetch(webhookUrl + "?wait=true", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: json,
          })
          setSending(false)
          console.log(await response.json())
        }}
      />
      <InputField
        value={props.message.content || ""}
        onChange={(content) => handleChange({ ...props.message, content })}
        label="Message content"
        multiline
      />
      <JsonInput
        json={json}
        onChange={(json) => {
          setJson(json)

          const message = parseMessage(json)
          if (Array.isArray(message)) {
            setErrors(message)
            console.log("json errors", message)
            return
          }

          setErrors([])
          props.onChange(message)
        }}
        errors={errors}
      />
    </Container>
  )
}
