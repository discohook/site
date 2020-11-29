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
import type { EditorManagerLike } from "../EditorManager"

export type ClearAllConfirmationModalProps = {
  editorManager: EditorManagerLike
}

export function ClearAllConfirmationModal(
  props: ClearAllConfirmationModalProps,
) {
  const { editorManager } = props

  const modal = useRequiredContext(ModalContext)

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Clear All</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <ModalBody>
        <Markdown
          content={
            "This action removes all content from the message. Are you sure" +
            " you want to continue? This action cannot be reverted."
          }
        />
      </ModalBody>
      <ModalFooter>
        <SecondaryButton onClick={() => modal.dismiss()}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={() => {
            editorManager.clear()
            modal.dismiss()
          }}
        >
          Clear all
        </PrimaryButton>
      </ModalFooter>
    </ModalContainer>
  )
}
