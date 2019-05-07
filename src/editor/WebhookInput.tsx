import React from "react"
import { Button, Container, InputLabel, TextInput } from "./styles"

interface Props {
  url: string
  onChange: (url: string) => void
  disabled: boolean
  onSubmit: () => void
}

export const WebhookInput = (props: Props) => (
  <Container direction="row">
    <InputLabel>
      Webhook URL
      <TextInput
        value={props.url}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder="https://discordapp.com/api/webhooks/..."
      />
    </InputLabel>
    <Button disabled={props.disabled} onClick={props.onSubmit}>
      Send
    </Button>
  </Container>
)
