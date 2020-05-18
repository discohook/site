import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../../common/input/Button"
import { ModalContext } from "../../../common/modal/ModalContext"
import { BaseModal } from "../../../common/modal/styles/BaseModal"
import { BaseModalBody } from "../../../common/modal/styles/BaseModalBody"
import { BaseModalFooter } from "../../../common/modal/styles/BaseModalFooter"
import { BaseModalHeader } from "../../../common/modal/styles/BaseModalHeader"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { Message } from "../../message/Message"
import type { EditorManager } from "../EditorManager"

const Warning = styled.div`
  margin: 8px;
`

export type ClearAllConfirmationModalProps = {
  editorManager: EditorManager
}

export function ClearAllConfirmationModal(
  props: ClearAllConfirmationModalProps,
) {
  const { editorManager } = props

  const modal = useRequiredContext(ModalContext)

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
          onClick={() => modal.dismiss()}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          onClick={() => {
            editorManager.message = new Message()
            modal.dismiss()
          }}
        >
          Clear all
        </Button>
      </BaseModalFooter>
    </BaseModal>
  ))
}
