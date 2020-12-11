import { useObserver } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { transparentize } from "polished"
import React, { useEffect } from "react"
import styled from "styled-components"
import { useWindowEvent } from "../../common/dom/useWindowEvent"
import { SecondaryButton } from "../../common/input/button/SecondaryButton"
import { Separator } from "../../common/layout/Separator"
import { Stack } from "../../common/layout/Stack"
import { ModalManagerContext } from "../../common/modal/ModalManagerContext"
import { Footer } from "../../common/page/Footer"
import { usePreference } from "../../common/settings/usePreference"
import { useLazyValue } from "../../common/state/useLazyValue"
import { useRequiredContext } from "../../common/state/useRequiredContext"
import type { BackupsModalProps } from "../database/backup/modal/BackupsModal"
import { Markdown } from "../markdown/Markdown"
import { createEditorForm } from "../message/state/editorForm"
import { EditorManagerContext } from "./EditorManagerContext"
import { ClearAllConfirmationModal } from "./message/ClearAllConfirmationModal"
import { MessageEditor } from "./message/MessageEditor"
import { ShareModal } from "./share/ShareModal"
import { WebhookControls } from "./webhook/WebhookControls"

const BackupsModal = dynamic<BackupsModalProps>(async () =>
  import("../database/backup/modal/BackupsModal").then(
    module => module.BackupsModal,
  ),
)

const EditorContainer = styled(Stack)`
  padding: 16px;
`

const Actions = styled.div`
  display: flex;
  flex-flow: wrap;

  margin-bottom: -8px;

  & > * {
    margin-right: 12px;
    margin-bottom: 8px;
  }
`

const JavaScriptWarning = styled.noscript`
  display: block;

  margin-bottom: 16px;
  padding: 16px;
  border-radius: 4px;

  border: 2px solid ${({ theme }) => theme.accent.danger};
  background: ${({ theme }) => transparentize(0.75, theme.accent.danger)};

  color: ${({ theme }) => theme.header.primary};
  font-weight: 500;
  line-height: 1.375;
`

export function Editor() {
  const editorManager = useRequiredContext(EditorManagerContext)

  const form = useLazyValue(() => createEditorForm(editorManager))
  useEffect(() => () => form.dispose(), [form])

  const modalManager = useRequiredContext(ModalManagerContext)

  const spawnBackupsModal = () =>
    modalManager.spawn({
      render: () => <BackupsModal editorManager={editorManager} />,
    })

  const spawnClearAllModal = () =>
    modalManager.spawn({
      render: () => <ClearAllConfirmationModal editorManager={editorManager} />,
    })

  const spawnShareModal = () =>
    modalManager.spawn({
      render: () => <ShareModal editorManager={editorManager} />,
    })

  const confirmExit = usePreference("confirmExit")
  useWindowEvent("beforeunload", event => {
    if (!confirmExit) return

    event.preventDefault()
    event.returnValue = ""
    return ""
  })

  return useObserver(() => (
    <EditorContainer gap={16}>
      <JavaScriptWarning>
        <Markdown
          content={
            "It appears your web browser has prevented this page from " +
            "executing JavaScript.\nTo use Discohook, please allow this page " +
            "to run JavaScript from your browser's settings."
          }
        />
      </JavaScriptWarning>
      <Actions>
        <SecondaryButton onClick={() => spawnBackupsModal()}>
          Backups
        </SecondaryButton>
        <SecondaryButton onClick={() => spawnClearAllModal()}>
          Clear All
        </SecondaryButton>
        <SecondaryButton onClick={() => spawnShareModal()}>
          Share Message
        </SecondaryButton>
      </Actions>
      <WebhookControls form={form} />
      <Separator />
      {editorManager.messages.map((message, index) => (
        <MessageEditor
          key={message.id}
          message={message}
          form={form.repeatingForm("messages").index(index)}
        />
      ))}
      <Footer />
    </EditorContainer>
  ))
}
