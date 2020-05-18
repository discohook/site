import { useObserver } from "mobx-react-lite"
import dynamic from "next/dynamic"
import React from "react"
import styled, { useTheme } from "styled-components"
import { ModalManagerContext } from "../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../common/state/useRequiredContext"
import type { AppearanceModalProps } from "../../common/style/AppearanceModal"
import { DARK_THEME } from "../../common/style/themes/darkTheme"
import type { BackupsModalProps } from "../database/backup/modal/BackupsModal"
import { Actions } from "./Actions"
import { EditorManagerContext } from "./EditorManagerContext"
import { JsonInput } from "./JsonInput"
import { ClearAllConfirmationModal } from "./message/ClearAllConfirmationModal"
import { MessageEditor } from "./message/MessageEditor"
import { FlexContainer } from "./styles/FlexContainer"
import { WebhookControls } from "./webhook/WebhookControls"

const AppearanceModal = dynamic<AppearanceModalProps>(async () =>
  import("../../common/style/AppearanceModal").then(
    module => module.AppearanceModal,
  ),
)

const BackupsModal = dynamic<BackupsModalProps>(async () =>
  import("../database/backup/modal/BackupsModal").then(
    module => module.BackupsModal,
  ),
)

const EditorContainer = styled.div`
  position: relative;
`

const EditorInnerContainer = styled(FlexContainer)`
  display: block;
  height: 100%;
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
  color: ${DARK_THEME.header.primary};
`

export function Editor() {
  const editorManager = useRequiredContext(EditorManagerContext)
  const modalManager = useRequiredContext(ModalManagerContext)

  const theme = useTheme()

  return useObserver(() => (
    <EditorContainer>
      <EditorInnerContainer>
        <JavaScriptWarning>
          Discohook requires JavaScript to be enabled, please turn it on in your
          browser settings to use this app.
        </JavaScriptWarning>
        <Actions
          title={theme.appearance.mobile ? undefined : "Message editor"}
          actions={[
            {
              name: "Support server",
              action: () => open("/discord", "_blank", "noopener"),
            },
            {
              name: "Backups",
              action: () =>
                modalManager.spawn({
                  render: () => <BackupsModal editorManager={editorManager} />,
                }),
            },
            {
              name: "Appearance",
              action: () =>
                modalManager.spawn({
                  render: () => <AppearanceModal />,
                }),
            },
            {
              name: "Clear all",
              action: () =>
                modalManager.spawn({
                  render: () => (
                    <ClearAllConfirmationModal editorManager={editorManager} />
                  ),
                }),
            },
          ]}
        />
        <WebhookControls />
        <MessageEditor />
        <JsonInput />
      </EditorInnerContainer>
    </EditorContainer>
  ))
}
