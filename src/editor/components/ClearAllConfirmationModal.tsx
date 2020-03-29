import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { Message } from "../../message/classes/Message"
import { BaseModal } from "../../modal/components/BaseModal"
import { BaseModalBody } from "../../modal/components/BaseModalBody"
import { BaseModalFooter } from "../../modal/components/BaseModalFooter"
import { BaseModalHeader } from "../../modal/components/BaseModalHeader"
import { useStores } from "../../state/hooks/useStores"

const Warning = styled.div`
  margin: 8px;
`

export function ClearAllConfirmationModal() {
  const { messageStore, modalStore } = useStores()

  return useObserver(() => (
    <BaseModal>
      <BaseModalHeader>Clear all</BaseModalHeader>
      <BaseModalBody>
        <Warning>
          Are you sure you want to clear all? This action cannot be undone.
        </Warning>
      </BaseModalBody>
      <BaseModalFooter>
        <Button
          variant="borderless"
          size="medium"
          onClick={() => {
            modalStore.dismiss("clear-all-confirmation")
          }}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          onClick={() => {
            messageStore.message = new Message()
            modalStore.dismiss("clear-all-confirmation")
          }}
        >
          Clear all
        </Button>
      </BaseModalFooter>
    </BaseModal>
  ))
}
