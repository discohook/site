import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import { Embed } from "../../message/classes/Embed"

export type AuthorEditorProps = {
  embed: Embed
}

export function AuthorEditor(props: AuthorEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <InputGroup>
      <InputField
        id={`message-embed${embed.id}-author-name`}
        value={embed.author}
        onChange={author => {
          embed.author = author || undefined
        }}
        label="Author Name"
        maxLength={256}
      />
      <InputField
        id={`message-embed${embed.id}-author-url`}
        value={embed.authorUrl}
        onChange={authorUrl => {
          embed.authorUrl = authorUrl || undefined
        }}
        label="Author URL"
      />
      <InputField
        id={`message-embed${embed.id}-author-icon`}
        value={embed.authorIcon}
        onChange={authorIcon => {
          embed.authorIcon = authorIcon || undefined
        }}
        label="Author Icon"
      />
    </InputGroup>
  ))
}
