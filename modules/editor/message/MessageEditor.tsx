import { useObserver } from "mobx-react-lite"
import { applyPatch } from "mobx-state-tree"
import dynamic from "next/dynamic"
import React from "react"
import styled from "styled-components"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { SecondaryButton } from "../../../common/input/button/SecondaryButton"
import { InputError } from "../../../common/input/error/InputError"
import { InputField } from "../../../common/input/text/InputField"
import { ButtonList } from "../../../common/layout/ButtonList"
import { Stack } from "../../../common/layout/Stack"
import { ModalManagerContext } from "../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { Markdown } from "../../markdown/Markdown"
import type { MessageItemFormState } from "../../message/state/editorForm"
import type { EmbedLike } from "../../message/state/models/EmbedModel"
import type { MessageLike } from "../../message/state/models/MessageModel"
import type { DataEditorModalProps } from "../data/DataEditorModal"
import { EditorManagerContext } from "../EditorManagerContext"
import { EmbedEditor } from "./EmbedEditor"
import { PrimaryContentEditor } from "./PrimaryContentEditor"

const DataEditorModal = dynamic<DataEditorModalProps>(async () =>
  import("../data/DataEditorModal").then(module => module.DataEditorModal),
)

const Message = styled(Markdown)`
  margin-top: -8px;
  font-size: 15px;
`

const EmbedValidationErrorContainer = styled.div`
  margin-bottom: 8px;

  &:empty {
    margin: 0;
  }
`

export type MessageEditorProps = {
  message: MessageLike
  form: MessageItemFormState
}

export function MessageEditor(props: MessageEditorProps) {
  const { message, form } = props

  const modalManager = useRequiredContext(ModalManagerContext)
  const editorManager = useRequiredContext(EditorManagerContext)

  const spawnDataEditorModal = () =>
    modalManager.spawn({
      render: () => <DataEditorModal message={message} />,
    })

  return useObserver(() => (
    <Stack gap={16}>
      <PrimaryContentEditor message={message} form={form} />
      {message.embeds.length > 0 && (
        <div>
          <EmbedValidationErrorContainer>
            <InputError
              error={
                message.embedLength > 6000
                  ? "Embeds exceed 6000 character limit"
                  : undefined
              }
            />
          </EmbedValidationErrorContainer>
          <Stack gap={16}>
            {message.embeds.map((embed, index) => (
              <EmbedEditor
                key={embed.id}
                embed={embed}
                form={form.repeatingForm("embeds").index(index)}
              />
            ))}
          </Stack>
        </div>
      )}
      <div>
        <PrimaryButton
          disabled={message.size >= 10}
          onClick={() => {
            form.repeatingForm("embeds").push({} as EmbedLike, ["timestamp"])
          }}
        >
          Add Embed
        </PrimaryButton>
      </div>
      <InputField
        id={`_${message.id}_reference`}
        label="Message Link"
        placeholder="https://discord.com/channels/..."
        error={form.field("reference").error}
        {...form.field("reference").inputProps}
      />
      <Message
        content={
          "*When a message link is set, pressing submit or edit will edit the" +
          " message sent inside of Discord. To load a message sent in Discord, use" +
          " the bot's 'restore' command.*"
        }
      />
      <ButtonList>
        {editorManager.messages.length > 1 && (
          <SecondaryButton
            onClick={() => {
              applyPatch(form.state.value, [
                {
                  op: "remove",
                  path: form.path,
                },
              ])
            }}
          >
            Remove Message
          </SecondaryButton>
        )}
        <SecondaryButton onClick={() => spawnDataEditorModal()}>
          JSON Data Editor
        </SecondaryButton>
      </ButtonList>
    </Stack>
  ))
}
