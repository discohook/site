import React, { useState } from "react"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { SecondaryButton } from "../../../common/input/button/SecondaryButton"
import { InputError } from "../../../common/input/error/InputError"
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
import { messageOf } from "../../message/helpers/messageOf"
import type { MessageLike } from "../../message/state/models/MessageModel"
import type { EditorManagerLike } from "../EditorManager"

export type LoadClearMessageConfirmationModalProps = {
  editorManager: EditorManagerLike
  message: MessageLike
}

export function LoadClearMessageConfirmationModal(
  props: LoadClearMessageConfirmationModalProps,
) {
  const { editorManager, message } = props

  const modal = useRequiredContext(ModalContext)

  const [error, setError] = useState<string | undefined>()

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Clear & Load Message</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <ModalBody>
        <Markdown
          content={
            "Loading a message link will remove all content from the current editor, if any." +
            " Are you sure you want to continue? This action cannot be reverted."
          }
        />
        <InputError error={error} />
      </ModalBody>
      <ModalFooter>
        <SecondaryButton onClick={() => modal.dismiss()}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={async () => {
            let data
            try {
              data = await editorManager.getMessage(message.reference)
            } catch {
              // Handle later
            }
            if (!data) {
              setError(
                "The message link could not be loaded. Make sure a correct webhook URL is provided.",
              )
              return
            }

            const newMessage = messageOf(data)
            newMessage.reference = message.reference

            const index = editorManager.messages.indexOf(message)
            const messages = [...editorManager.messages]
            messages.splice(index, 1, newMessage as MessageLike)
            editorManager.set("messages", messages)

            modal.dismiss()
          }}
        >
          Load
        </PrimaryButton>
      </ModalFooter>
    </ModalContainer>
  )
}
