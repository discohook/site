import React from "react"
import { SecondaryButton } from "../../../common/input/button/SecondaryButton"
import { ModalAction } from "../../../common/modal/layout/ModalAction"
import { ModalBody } from "../../../common/modal/layout/ModalBody"
import { ModalContainer } from "../../../common/modal/layout/ModalContainer"
import { ModalFooter } from "../../../common/modal/layout/ModalFooter"
import { ModalHeader } from "../../../common/modal/layout/ModalHeader"
import { ModalTitle } from "../../../common/modal/layout/ModalTitle"
import { ModalContext } from "../../../common/modal/ModalContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { remove } from "../../../icons/remove"
import { Markdown } from "../../markdown/Markdown"

export function NetworkErrorModal() {
  const modal = useRequiredContext(ModalContext)

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Connection Error</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <ModalBody>
        <Markdown
          content={
            "There was a network error while sending the message. Make sure" +
            " you are connected to the internet, and no extensions in your" +
            " browser are blocking connections to Discord."
          }
        />
      </ModalBody>
      <ModalFooter>
        <SecondaryButton onClick={() => modal.dismiss()}>Close</SecondaryButton>
      </ModalFooter>
    </ModalContainer>
  )
}
