import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../../common/input/InputField"
import { InputGroup } from "../../../common/input/styles/InputGroup"
import type { Embed } from "../../message/Embed"

export type BodyEditorProps = {
  embed: Embed
}

export function BodyEditor(props: BodyEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <>
      <InputGroup>
        <InputField
          id={`embed-${embed.id}-title`}
          value={embed.title}
          onChange={title => {
            embed.title = title
          }}
          label="Title"
          maxLength={256}
        />
        <InputField
          id={`embed-${embed.id}-url`}
          value={embed.url}
          onChange={url => {
            embed.url = url
          }}
          label="Title URL"
          validate={url => {
            if (!/^https?:\/\//.test(url)) return "Invalid URL"

            const embedIndex = embed.message.embeds.indexOf(embed)
            if (embedIndex <= 0) return

            const previousEmbed = embed.message.embeds[embedIndex - 1]
            if (previousEmbed.url === url) {
              return "Cannot be the same as previous embed"
            }
          }}
        />
      </InputGroup>
      <InputField
        id={`embed-${embed.id}-description`}
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
