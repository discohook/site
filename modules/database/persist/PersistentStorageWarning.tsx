import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { SecondaryButton } from "../../../common/input/button/SecondaryButton"
import { ButtonRow } from "../../../common/layout/ButtonRow"
import { ModalManagerContext } from "../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { Markdown } from "../../markdown/Markdown"
import { DatabaseManagerContext } from "../DatabaseManagerContext"
import { PushNotificationModal } from "./PushNotificationModal"

const Container = styled.div`
  margin-top: 16px;
  padding: 16px;

  background: ${({ theme }) => theme.background.secondary};
  border-radius: 3px;
`

const Header = styled.h5`
  margin: 0 0 8px;

  color: ${({ theme }) => theme.header.primary};
  font-size: 1em;
  font-weight: 500;
  line-height: 1.375;
`

const Buttons = styled(ButtonRow)`
  margin-top: 16px;
`

export function PersistentStorageWarning() {
  const modalManager = useRequiredContext(ModalManagerContext)
  const databaseManager = useRequiredContext(DatabaseManagerContext)

  return useObserver(() => (
    <Container>
      <Header>Warning</Header>
      <Markdown
        content={
          "Your browser did not grant permission to use persistent storage" +
          " for this site. Data stored might be deleted by the browser when" +
          " this permission is not granted."
        }
      />
      <Buttons>
        <PrimaryButton
          onClick={async () => {
            if ("chrome" in window) {
              modalManager.spawn({
                render: () => (
                  <PushNotificationModal databaseManager={databaseManager} />
                ),
              })
            } else {
              await databaseManager.requestPersistence()
            }
          }}
        >
          Request permission
        </PrimaryButton>
        <SecondaryButton
          onClick={() => {
            databaseManager.persistenceMessageDismissed = true
          }}
        >
          Dismiss
        </SecondaryButton>
      </Buttons>
    </Container>
  ))
}
