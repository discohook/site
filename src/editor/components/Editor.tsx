import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { spawnAppearanceModal } from "../../appearance/actions/spawnAppearanceModal"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import { useTheme } from "../../appearance/hooks/useTheme"
import { spawnBackupsModal } from "../../backup/actions/spawnBackupModal"
import { JsonInput } from "../../json/components/JsonInput"
import { Message } from "../../message/classes/Message"
import { useManager } from "../../state/hooks/useManager"
import { useStores } from "../../state/hooks/useStores"
import { Actions } from "./Actions"
import { FlexContainer } from "./Container"
import { MessageEditor } from "./MessageEditor"
import { WebhookControls } from "./WebhookControls"

const EditorContainer = styled.div`
  position: relative;
`

const EditorInnerContainer = styled(FlexContainer)`
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
  color: ${DARK_THEME.header.primary};
`

export function Editor() {
  const manager = useManager()

  const { messageStore } = useStores()

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
              name: "Backups",
              action: () => {
                spawnBackupsModal(manager)
              },
            },
            {
              name: "Appearance",
              action: () => {
                spawnAppearanceModal(manager)
              },
            },
            {
              name: "Clear all",
              action: () => {
                messageStore.message = new Message()
              },
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
