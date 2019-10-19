import styled from "@emotion/styled"
import { useTheme } from "emotion-theming"
import React, { useMemo, useState } from "react"
import BackupModal from "../backup/BackupModal"
import { Theme } from "../core/themes"
import { stringifyMessage } from "../json/convert"
import JsonInput from "../json/JsonInput"
import { FileLike } from "../message/FileLike"
import { Message } from "../message/Message"
import EmbedEditor from "./EmbedEditor"
import FileInput from "./FileInput"
import InputField from "./InputField"
import {
  Action,
  ActionsContainer,
  ActionsHeader,
  Button,
  Container,
} from "./styles"

const EditorContainer = styled.div`
  position: relative;
`

const EditorInnerContainer = styled(Container)`
  display: block;
  height: 100%;
  overflow-y: scroll;
  padding: 8px;

  & > *:not(button) {
    flex-grow: 0;
  }
`

const EditorActionsContainer = styled(ActionsContainer)`
  margin: 8px;
`

const JavaScriptWarning = styled.noscript<{}, Theme>`
  display: block;

  margin: -8px -8px 16px;
  padding: 16px;
  background: ${({ theme }) => theme.red};
  color: #ffffff;
`

type Props = {
  message: Message
  onChange: (message: Message) => void
  files: (File | FileLike)[]
  onFilesChange: (files: (File | FileLike)[]) => void
  onToggleTheme: () => void
  onToggleDisplay: () => void
}

export default function Editor(props: Props) {
  const {
    message,
    onChange: handleChange,
    files,
    onFilesChange: handleFilesChange,
    onToggleTheme: handleToggleTheme,
    onToggleDisplay: handleToggleDisplay,
  } = props

  const theme = useTheme<Theme>()

  const [webhookUrl, setWebhookUrl] = useState("")
  const [sending, setSending] = useState(false)
  const executeWebhook = async () => {
    setSending(true)

    const formData = new FormData()
    formData.append("payload_json", stringifyMessage(message))

    if (files && files.every(f => f instanceof File)) {
      for (const [index, file] of files.entries()) {
        formData.append(`file[${index}]`, file as File, file.name)
      }
    }

    const response = await fetch(`${webhookUrl}?wait=true`, {
      method: "POST",
      body: formData,
    })

    setSending(false)
    console.log("Webhook executed:", await response.json())
  }

  const clearAll = () => {
    handleChange({})
    handleFilesChange([])
  }

  const isDisabled = useMemo(() => {
    if (sending) return true
    if (webhookUrl.trim().length === 0) return true

    const { content, embeds } = message
    if (typeof content === "string") return false
    if (embeds && embeds.length !== 0) return false
    if (files && files.length !== 0) return false

    return true
  }, [files, message, sending, webhookUrl])

  const [isBackupModalShown, setIsBackupModalShown] = useState(false)

  return (
    <EditorContainer>
      <EditorInnerContainer
        style={isBackupModalShown ? { overflow: "hidden" } : undefined}
      >
        <JavaScriptWarning>
          Discohook requires JavaScript to be enabled, please turn it on in your
          browser settings to use this app.
        </JavaScriptWarning>
        <EditorActionsContainer>
          {!theme.mobile && <ActionsHeader>Message editor</ActionsHeader>}
          <Action onClick={() => setIsBackupModalShown(true)}>Backups</Action>
          <Action onClick={handleToggleTheme}>Toggle theme</Action>
          {!theme.mobile && (
            <Action onClick={handleToggleDisplay}>Toggle display</Action>
          )}
          <Action onClick={clearAll}>Clear all</Action>
        </EditorActionsContainer>
        <Container direction="row">
          <InputField
            id="webhook-url"
            value={webhookUrl}
            onChange={setWebhookUrl}
            label="Webhook URL"
            placeholder="https://discordapp.com/api/webhooks/..."
          />
          <Button disabled={isDisabled} onClick={executeWebhook}>
            Send
          </Button>
        </Container>
        <InputField
          id="message-content"
          value={message.content}
          onChange={content =>
            handleChange({
              ...message,
              content: content || undefined,
            })
          }
          label="Message content"
          multiline
          maxLength={2000}
        />
        <EmbedEditor
          embeds={message.embeds || []}
          onChange={embeds =>
            handleChange({
              ...message,
              embeds: embeds.length > 0 ? embeds : undefined,
            })
          }
        />
        <Container direction="row">
          <InputField
            id="message-username"
            value={message.username}
            onChange={username =>
              handleChange({
                ...message,
                username: username || undefined,
              })
            }
            label="Override username"
            maxLength={32}
          />
          <InputField
            id="message-avatar"
            value={message.avatarUrl}
            onChange={avatarUrl =>
              handleChange({
                ...message,
                avatarUrl: avatarUrl || undefined,
              })
            }
            label="Override avatar"
          />
        </Container>
        <FileInput files={[...files]} onChange={handleFilesChange} />
        <JsonInput message={message} onChange={handleChange} />
      </EditorInnerContainer>
      {isBackupModalShown && (
        <BackupModal
          message={message}
          files={[...files]}
          onLoad={backup => {
            handleChange(backup.message)
            handleFilesChange(backup.files)
          }}
          onClose={() => setIsBackupModalShown(false)}
        />
      )}
    </EditorContainer>
  )
}
