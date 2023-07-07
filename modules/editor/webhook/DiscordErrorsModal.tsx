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
import type { CodedError, DiscordError } from "../../../types/DiscordError"
import { Markdown } from "../../markdown/Markdown"

export type DiscordErrorsModalProps = {
  errors: DiscordError[]
}

export function DiscordErrorsModal(props: DiscordErrorsModalProps) {
  const { errors } = props

  const modal = useRequiredContext(ModalContext)

  const flattened = errors.map(discordError => {
    const flattenErrorObject = (d: DiscordError["errors"], key?: string) => {
      const items: string[][] = []
      for (const [k, v] of Object.entries(d!)) {
        const newKey = key ? `${key}.${k}` : k

        if (typeof v === "object" && !Array.isArray(v) && v != null) {
          // eslint-disable-next-line no-underscore-dangle
          const codedErrors = (v as { _errors?: CodedError[] })._errors
          if (!codedErrors) {
            items.push(
              ...flattenErrorObject(v as DiscordError["errors"], newKey),
            )
          } else {
            items.push([newKey, codedErrors.map(e => e.message).join(", ")])
          }
        } else {
          items.push([newKey, String(v)])
        }
      }

      return items
    }
    if (discordError.errors) {
      const items = flattenErrorObject(discordError.errors)
      return items.map(([k, v]) => `In \`${k}\`: ${v}`)
    }
    return [discordError.message]
  })[0]

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Discord Error</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <ModalBody>
        <Markdown
          content={`Your message could not be submitted because it contains the following errors:\n\n${flattened.join(
            "\n",
          )}`}
        />
      </ModalBody>
      <ModalFooter>
        <SecondaryButton onClick={() => modal.dismiss()}>Close</SecondaryButton>
      </ModalFooter>
    </ModalContainer>
  )
}
