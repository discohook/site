import React, { useState } from "react"
import styled from "styled-components"
import AppearanceModal from "../appearance/AppearanceModal"
import { Appearance } from "../appearance/Theme"
import { darkTheme } from "../appearance/themes"
import { useTheme } from "../appearance/useTheme"
import BackupModal from "../backup/BackupModal"
import Button from "../form/Button"
import FileInput from "../form/FileInput"
import InputField from "../form/InputField"
import JsonInput from "../json/JsonInput"
import { FileLike } from "../message/FileLike"
import { Embed, Message } from "../message/Message"
import { getUniqueId, id } from "../message/uid"
import { executeWebhook } from "../webhook/executeWebhook"
import { getAvatarUrl } from "../webhook/getAvatarUrl"
import { Webhook } from "../webhook/Webhook"
import { webhookUrlRegex } from "../webhook/webhookUrlRegex"
import Actions from "./Actions"
import EmbedEditor from "./EmbedEditor"
import MultiEditor from "./MultiEditor"
import { Container } from "./styles"

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

const JavaScriptWarning = styled.noscript`
  display: block;

  margin: -8px -8px 16px;
  padding: 16px;
  background: ${({ theme }) => theme.accent.danger};
  color: ${darkTheme.header.primary};
`

type Props = {
  message: Message
  onChange: (message: Message) => void
  files: readonly (File | FileLike)[]
  onFilesChange: (files: readonly (File | FileLike)[]) => void
  onAppearanceChange: (appearance: Appearance) => void
  webhookUrl: string
  onWebhookUrlChange: (webhookUrl: string) => void
  webhook?: Webhook
}

export default function Editor(props: Props) {
  const {
    message,
    onChange: handleChange,
    files,
    onFilesChange: handleFilesChange,
    onAppearanceChange: handleAppearanceChange,
    webhookUrl,
    onWebhookUrlChange: handleWebhookUrlChange,
    webhook,
  } = props

  const theme = useTheme()

  const [sending, setSending] = useState(false)
  const sendMessage = async () => {
    if (sending) return
    setSending(true)

    try {
      await executeWebhook(webhookUrl, message, files)
    } catch (error) {
      console.error("Error executing webhook:", error)
    }

    setSending(false)
  }

  const clearAll = () => {
    handleChange({})
    handleFilesChange([])
  }

  let isDisabled: boolean
  if (sending) isDisabled = true
  else if (!webhookUrlRegex.test(webhookUrl)) isDisabled = true
  else if (typeof message.content === "string") isDisabled = false
  else if (message.embeds && message.embeds.length > 0) isDisabled = false
  else if (files.length > 0) isDisabled = false
  else isDisabled = true

  const [isBackupModalShown, setIsBackupModalShown] = useState(false)
  const [isAppearanceModalShown, setIsAppearanceModalShown] = useState(false)

  return (
    <EditorContainer>
      <EditorInnerContainer
        style={isBackupModalShown ? { overflow: "hidden" } : undefined}
      >
        <JavaScriptWarning>
          Discohook requires JavaScript to be enabled, please turn it on in your
          browser settings to use this app.
        </JavaScriptWarning>
        <Actions
          title={theme.appearance.mobile ? undefined : "Message editor"}
          actions={[
            {
              name: "Backups",
              action: () => setIsBackupModalShown(true),
            },
            {
              name: "Appearance",
              action: () => setIsAppearanceModalShown(true),
            },
            {
              name: "Clear all",
              action: clearAll,
            },
          ]}
        />
        <Container flow="row">
          <InputField
            id="webhook-url"
            value={webhookUrl}
            onChange={handleWebhookUrlChange}
            label="Webhook URL"
            placeholder="https://discordapp.com/api/webhooks/..."
          />
          <Button disabled={isDisabled} onClick={sendMessage}>
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
          type="multiline"
          maxLength={2000}
        />
        <MultiEditor<Embed>
          items={message.embeds ?? []}
          onChange={embeds =>
            handleChange({
              ...message,
              embeds: embeds.length > 0 ? embeds : undefined,
            })
          }
          name="Embed"
          limit={10}
          factory={() => ({ [id]: getUniqueId() })}
          keyMapper={embed => embed[id]}
        >
          {(embed, onChange) => (
            <EmbedEditor embed={embed} onChange={onChange} />
          )}
        </MultiEditor>
        <Container flow="row">
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
            placeholder={webhook?.name}
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
            placeholder={webhook && getAvatarUrl(webhook)}
          />
        </Container>
        <FileInput files={files} onChange={handleFilesChange} />
        <JsonInput message={message} onChange={handleChange} />
      </EditorInnerContainer>
      {isBackupModalShown && (
        <BackupModal
          message={message}
          files={files}
          onLoad={backup => {
            handleChange(backup.message)
            handleFilesChange(backup.files)
          }}
          onClose={() => setIsBackupModalShown(false)}
        />
      )}
      {isAppearanceModalShown && (
        <AppearanceModal
          onAppearanceChange={handleAppearanceChange}
          onClose={() => setIsAppearanceModalShown(false)}
        />
      )}
    </EditorContainer>
  )
}
