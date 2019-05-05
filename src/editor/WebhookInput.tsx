import React from "react"
import styled from "styled-components"

interface Props {
  url: string
  onChange: (url: string) => void
  disabled: boolean
  onSubmit: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const InputLabel = styled.span`
  display: inline-block;
  margin: 8px 8px 0;
`

const InnerContainer = styled.div`
  display: flex;
`

const Input = styled.input`
  min-height: 20px;
  padding: 10px;
  margin: 8px;
  flex: 1;

  background: #484c52;
  border: 0;
  border-radius: 3px;
  outline: none;

  resize: vertical;

  color: rgba(255, 255, 255, 0.7);
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;
`

const SendButton = styled.button`
  margin: 8px;
  padding: 0 16px;

  background: #7289da;
  border: 0;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: #ffffff;
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  transition: 300ms;

  :hover:not(:disabled) {
    opacity: 0.8;
  }

  :disabled {
    color: rgba(255, 255, 255, 0.6);
    cursor: not-allowed;
  }
`

export const WebhookInput = (props: Props) => (
  <Container>
    <InputLabel>Webhook URL</InputLabel>
    <InnerContainer>
      <Input
        value={props.url}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder="https://discordapp.com/api/webhooks/..."
      />
      <SendButton disabled={props.disabled} onClick={() => props.onSubmit()}>
        Send
      </SendButton>
    </InnerContainer>
  </Container>
)
