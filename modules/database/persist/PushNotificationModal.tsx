import React from "react"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
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
import type { DatabaseManager } from "../DatabaseManager"

export type PushNotificationModalProps = {
  databaseManager: DatabaseManager
}

export function PushNotificationModal(props: PushNotificationModalProps) {
  const { databaseManager } = props

  const modal = useRequiredContext(ModalContext)

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Notice</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <ModalBody>
        <Markdown
          content={
            "Chrome based browsers do not allow manual control of persistent" +
            " storage. As a workaround, you can grant this site permission to" +
            " send notifications to allow the site to use persistent storage."
          }
        />
      </ModalBody>
      <ModalFooter>
        <SecondaryButton onClick={() => modal.dismiss()}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={async () => {
            modal.dismiss()
            await databaseManager.requestPersistence()
          }}
        >
          Request permission
        </PrimaryButton>
      </ModalFooter>
    </ModalContainer>
  )
}
