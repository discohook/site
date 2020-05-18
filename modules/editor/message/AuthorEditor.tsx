import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../../common/input/InputField"
import { InputGroup } from "../../../common/input/styles/InputGroup"
import type { Embed } from "../../message/Embed"

export type AuthorEditorProps = {
  embed: Embed
}

export function AuthorEditor(props: AuthorEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <InputGroup>
      <InputField
        id={`embed-${embed.id}-author`}
        value={embed.author}
        onChange={author => {
          embed.author = author
        }}
        label="Author Name"
        maxLength={256}
      />
      <InputField
        id={`embed-${embed.id}-authorurl`}
        value={embed.authorUrl}
        onChange={authorUrl => {
          embed.authorUrl = authorUrl
        }}
        label="Author URL"
        validate={url => (/^https?:\/\//.test(url) ? undefined : "Invalid URL")}
      />
      <InputField
        id={`embed-${embed.id}-authoricon`}
        value={embed.authorIcon}
        onChange={authorIcon => {
          embed.authorIcon = authorIcon
        }}
        label="Author Icon"
        validate={url => (/^https?:\/\//.test(url) ? undefined : "Invalid URL")}
      />
    </InputGroup>
  ))
}
