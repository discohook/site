import React from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { BaseModal } from "../../modal/components/BaseModal"
import { BaseModalBody } from "../../modal/components/BaseModalBody"
import { BaseModalFooter } from "../../modal/components/BaseModalFooter"
import { BaseModalHeader } from "../../modal/components/BaseModalHeader"
import { useStores } from "../../state/hooks/useStores"

const Paragraph = styled.div`
  margin: 8px;
  line-height: 1.375;
`

export function NetworkErrorModal() {
  const { modalStore } = useStores()

  return (
    <BaseModal>
      <BaseModalHeader>Connection error</BaseModalHeader>
      <BaseModalBody>
        <Paragraph>
          There was a network error while sending the message. Make sure you are
          connected to the internet, and no extensions in your browser are
          blocking connections to Discord.
        </Paragraph>
      </BaseModalBody>
      <BaseModalFooter>
        <Button
          size="medium"
          onClick={() => {
            modalStore.dismiss("network-error")
          }}
        >
          Close
        </Button>
      </BaseModalFooter>
    </BaseModal>
  )
}
