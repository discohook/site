import React from "react"
import styled from "styled-components"
import { Button } from "../../../common/input/Button"
import { ModalContext } from "../../../common/modal/ModalContext"
import { BaseModal } from "../../../common/modal/styles/BaseModal"
import { BaseModalBody } from "../../../common/modal/styles/BaseModalBody"
import { BaseModalFooter } from "../../../common/modal/styles/BaseModalFooter"
import { BaseModalHeader } from "../../../common/modal/styles/BaseModalHeader"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import type { DatabaseManager } from "../DatabaseManager"

const Text = styled.p`
  margin: 8px;

  color: ${({ theme }) => theme.interactive.active};
  line-height: 1.375;
`

export type PushNotificationModalProps = {
  databaseManager: DatabaseManager
}

export function PushNotificationModal(props: PushNotificationModalProps) {
  const { databaseManager } = props

  const modal = useRequiredContext(ModalContext)

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
          onClick={() => modal.dismiss()}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          onClick={async () => {
            modal.dismiss()
            await databaseManager.requestPersistence()
          }}
        >
          Request permission
        </Button>
      </BaseModalFooter>
    </BaseModal>
  )
}
