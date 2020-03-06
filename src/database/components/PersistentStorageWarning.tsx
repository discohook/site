import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { useStores } from "../../state/hooks/useStores"

const Warning = styled.div`
  margin: 8px;
  padding: 8px;

  border: 1px solid ${({ theme }) => theme.accent.warning};
  border-radius: 3px;
`

const Text = styled.p`
  margin: 8px;

  color: ${({ theme }) => theme.interactive.active};
  line-height: 1.375;
`

export function PersistentStorageWarning() {
  const { databaseStore } = useStores()

  return useObserver(() => (
    <Warning>
      <Text>
        Persistent data storage permission was not granted by the browser.
        Stored data may be cleared by the browser under storage pressure, such
        as low disk space.
      </Text>
      {"chrome" in window && (
        <Text>
          Because of a limitation in your browser, notification access is
          required to persist storage. Discohook will never send any
          notifications to you.
        </Text>
      )}
      <Button
        onClick={async () => {
          await databaseStore.requestPersistence()
        }}
      >
        Request permission
      </Button>
    </Warning>
  ))
}
