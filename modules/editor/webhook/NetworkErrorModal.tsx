import React from "react"
import styled from "styled-components"
import { Button } from "../../../common/input/Button"
import { ModalContext } from "../../../common/modal/ModalContext"
import { BaseModal } from "../../../common/modal/styles/BaseModal"
import { BaseModalBody } from "../../../common/modal/styles/BaseModalBody"
import { BaseModalFooter } from "../../../common/modal/styles/BaseModalFooter"
import { BaseModalHeader } from "../../../common/modal/styles/BaseModalHeader"
import { useRequiredContext } from "../../../common/state/useRequiredContext"

const Paragraph = styled.div`
  margin: 8px;
  line-height: 1.375;
`

export function NetworkErrorModal() {
  const modal = useRequiredContext(ModalContext)

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
        <Button size="medium" onClick={() => modal.dismiss()}>
          Close
        </Button>
      </BaseModalFooter>
    </BaseModal>
  )
}
