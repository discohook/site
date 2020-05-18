import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../../common/input/Button"
import { ModalManagerContext } from "../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { DatabaseManagerContext } from "../DatabaseManagerContext"
import { PushNotificationModal } from "./PushNotificationModal"

const Warning = styled.div`
  margin: 8px;
  padding: 8px;

  border: 1px solid ${({ theme }) => theme.accent.warning};
  border-radius: 3px;
`

const Header = styled.h5`
  margin: 8px;

  color: ${({ theme }) => theme.header.primary};
  font-size: 1em;
  font-weight: 500;
  line-height: 1.375;
`

const Text = styled.p`
  margin: 8px;

  line-height: 1.375;
`

export function PersistentStorageWarning() {
  const modalManager = useRequiredContext(ModalManagerContext)
  const databaseManager = useRequiredContext(DatabaseManagerContext)

  return useObserver(() => (
    <Warning>
      <Header>Warning</Header>
      <Text>
        Data may be deleted by the browser under conditions such as low disk
        space. To ensure data will be kept, you can grant permission to
        persistent storage.
      </Text>
      <Button
        variant="outline"
        accent="warning"
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
      </Button>
      <Button
        variant="outline"
        accent="warning"
        onClick={() => {
          databaseManager.persistenceMessageDismissed = true
        }}
      >
        Dismiss
      </Button>
    </Warning>
  ))
}
