import { useObserver } from "mobx-react-lite"
import { applySnapshot } from "mobx-state-tree"
import React, { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { copyTextToClipboard } from "../../../common/dom/copyTextToClipboard"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { SecondaryButton } from "../../../common/input/button/SecondaryButton"
import { Input } from "../../../common/input/layout/Input"
import { ModalAction } from "../../../common/modal/layout/ModalAction"
import { ModalBody } from "../../../common/modal/layout/ModalBody"
import { ModalContainer } from "../../../common/modal/layout/ModalContainer"
import { ModalFooter } from "../../../common/modal/layout/ModalFooter"
import { ModalHeader } from "../../../common/modal/layout/ModalHeader"
import { ModalTitle } from "../../../common/modal/layout/ModalTitle"
import { ModalContext } from "../../../common/modal/ModalContext"
import { parseJson } from "../../../common/object/parseJson"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { remove } from "../../../icons/remove"
import { messageOf } from "../../message/helpers/messageOf"
import { stringifyMessage } from "../../message/helpers/stringifyMessage"
import type { MessageLike } from "../../message/state/models/MessageModel"
import { isMessage } from "./validation/isMessage"

const Container = styled(ModalContainer)`
  width: 1024px;
  height: 768px;

  display: flex;
  flex-flow: column;
`

const Body = styled(ModalBody)`
  flex: 1;

  display: flex;
  flex-flow: column;
`

const CodeInput = styled(Input)`
  && {
    width: 100%;
    resize: none;
  }

  flex: 1;

  font-family: ${({ theme }) => theme.font.mono};
  font-size: 14px;
  line-height: 1.375;

  overflow-y: auto;
`

const ErrorContainer = styled.div`
  margin-top: 8px;

  max-height: max(20%, 96px);
  overflow-y: auto;
`

const ErrorLine = styled.code`
  display: block;

  color: ${({ theme }) => theme.accent.danger};
  font-size: 14px;
  line-height: 1.375;

  & + & {
    margin-top: 8px;
  }
`

export type DataEditorModalProps = {
  message: MessageLike
}

export function DataEditorModal(props: DataEditorModalProps) {
  const { message } = props

  const modal = useRequiredContext(ModalContext)

  const [value, setValue] = useState(() => stringifyMessage(message.data))

  const { value: data, error } = parseJson(value)
  const errors = error ? [error] : isMessage(data, "$")

  return useObserver(() => (
    <Container>
      <ModalHeader>
        <ModalTitle>JSON Editor</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <Body>
        <CodeInput
          as="textarea"
          id="data-editor"
          value={value}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setValue(event.target.value)
          }}
        />
        {errors.length > 0 && (
          <ErrorContainer>
            {errors.map((error, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <ErrorLine key={index}>{error}</ErrorLine>
            ))}
          </ErrorContainer>
        )}
      </Body>
      <ModalFooter>
        <SecondaryButton onClick={() => copyTextToClipboard(value)}>
          Copy to Clipboard
        </SecondaryButton>
        <SecondaryButton onClick={() => modal.dismiss()}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          disabled={errors.length > 0}
          onClick={() => {
            applySnapshot(message, {
              ...messageOf(JSON.parse(value)),
              id: message.id,
            })
            modal.dismiss()
          }}
        >
          Apply Changes
        </PrimaryButton>
      </ModalFooter>
    </Container>
  ))
}
