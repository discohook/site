import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import type { Embed } from "../../message/classes/Embed"

export type BodyEditorProps = {
  embed: Embed
}

export function BodyEditor(props: BodyEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <>
      <InputGroup>
        <InputField
          id={`e${embed.id}.title`}
          value={embed.title}
          onChange={title => {
            embed.title = title
          }}
          label="Title"
          maxLength={256}
        />
        <InputField
          id={`e${embed.id}.url`}
          value={embed.url}
          onChange={url => {
            embed.url = url
          }}
          label="URL"
        />
      </InputGroup>
      <InputField
        id={`e${embed.id}.desc`}
        value={embed.description}
        onChange={description => {
          embed.description = description
        }}
        label="Description"
        type="multiline"
        maxLength={2048}
      />
    </>
  ))
}
