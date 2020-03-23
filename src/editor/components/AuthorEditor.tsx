import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import type { Embed } from "../../message/classes/Embed"

export type AuthorEditorProps = {
  embed: Embed
}

export function AuthorEditor(props: AuthorEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <InputGroup>
      <InputField
        id={`e${embed.id}.author`}
        value={embed.author}
        onChange={author => {
          embed.author = author
        }}
        label="Author Name"
        maxLength={256}
      />
      <InputField
        id={`e${embed.id}.authorurl`}
        value={embed.authorUrl}
        onChange={authorUrl => {
          embed.authorUrl = authorUrl
        }}
        label="Author URL"
      />
      <InputField
        id={`e${embed.id}.authoricon`}
        value={embed.authorIcon}
        onChange={authorIcon => {
          embed.authorIcon = authorIcon
        }}
        label="Author Icon"
      />
    </InputGroup>
  ))
}
