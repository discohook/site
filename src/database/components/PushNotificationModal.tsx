import React from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { BaseModal } from "../../modal/components/BaseModal"
import { BaseModalBody } from "../../modal/components/BaseModalBody"
import { BaseModalFooter } from "../../modal/components/BaseModalFooter"
import { BaseModalHeader } from "../../modal/components/BaseModalHeader"
import { useStores } from "../../state/hooks/useStores"

const Text = styled.p`
  margin: 8px;

  color: ${({ theme }) => theme.interactive.active};
  line-height: 1.375;
`

export function PushNotificationModal() {
  const { databaseStore, modalStore } = useStores()

  return (
    <BaseModal>
      <BaseModalHeader>Notice</BaseModalHeader>
      <BaseModalBody>
        <Text>
          Because of a restriction in your browser, push notifications need to
          be enabled for persistent storage to be enabled.
        </Text>
        <Text>Discohook will never send any notifications to you.</Text>
      </BaseModalBody>
      <BaseModalFooter>
        <Button
          variant="borderless"
          size="medium"
          onClick={() => {
            modalStore.dismiss("persistent-storage-push-notifications")
          }}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          onClick={async () => {
            modalStore.dismiss("persistent-storage-push-notifications")
            await databaseStore.requestPersistence()
          }}
        >
          Request permission
        </Button>
      </BaseModalFooter>
    </BaseModal>
  )
}
