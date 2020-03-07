import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { useManager } from "../../state/hooks/useManager"
import { useStores } from "../../state/hooks/useStores"
import { spawnPushNotificationModal } from "../actions/spawnPushNotificationModal"

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
  const manager = useManager()

  const { databaseStore } = useStores()

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
            spawnPushNotificationModal(manager)
          } else {
            await databaseStore.requestPersistence()
          }
        }}
      >
        Request permission
      </Button>
      <Button
        variant="outline"
        accent="warning"
        onClick={() => {
          databaseStore.persistenceMessageDismissed = true
        }}
      >
        Dismiss
      </Button>
    </Warning>
  ))
}
